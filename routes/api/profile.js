const express = require('express');
const router = express.Router();
const passport = require('passport');


const Profile = require('../../models/Profile');

const isEmpty = require('../../utils/isEmpty')

const ValidateProfileInput = require('../../validations/profile/profile')
const ValidateExperienceInput = require('../../validations/profile/experience')
const ValidateEducationInput = require('../../validations/profile/education')


// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.send('The profile page is working'));

// @route   GET api/profile
// @desc    Get current logged in users Profile
// @access  Private
router.get('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {

        let errors = {}

        Profile.findOne({ user: req.user.id })
            .populate('user', ['name', 'avatar'])
            .then(profile => {
                if (!profile) {
                    errors.noprofile = 'No Profile Found for current user';
                    res.status(404).json(errors)
                }
                else { res.json(profile); }

            })
            .catch(err => res.status(404).json(err));
    });



// @route   GET api/profile/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/:handle',
    (req, res) => {

        let errors = {}

        Profile.findOne({ handle: req.params.handle })
            .populate('user', ['name', 'avatar'])
            .then(profile => {
                if (!profile) {
                    errors.noprofile = 'No User found for this handle';
                    res.status(404).json(errors)
                }
                else { res.json(profile); }

            })
            .catch(err => res.status(404).json(err));
    });

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user_id
// @access  Public
router.get('/user/:user_id',
    (req, res) => {


        let errors = {}

        Profile.findOne({ user: req.params.user_id })
            .populate('user', ['name', 'avatar'])
            .then(profile => {
                if (!profile) {
                    errors.noprofile = 'No User found for this user_id';
                    res.status(404).json(errors)
                }
                else { res.json(profile); }

            })
            .catch(err => res.status(404).json(err));
    });


// @route   GET api/profile/all/all
// @desc    Get All profiles
// @access  Public
router.get('/all/all',
    (req, res) => {


        let errors = {}

        Profile.find()
            .populate('user', ['name', 'avatar'])
            .then(profiles => {
                if (!profiles || isEmpty(profiles)) {
                    errors.noprofile = 'There are no profiles';
                    res.status(404).json(errors)
                }
                else { res.json(profiles); }

            })
            .catch(err => res.status(404).json(err));
    });



// @route   POST api/profile
// @desc    Create or Update Current user's Profile
// @access  Private
router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {

        const { errors, isValid } = ValidateProfileInput(req.body);

        if (!isValid) return res.status(400).json(errors);

        let profileFields = (({ handle, company, website, location, status, bio, githubusername }) => ({ handle, company, website, location, status, bio, githubusername }))(req.body);
        profileFields.social = (({ youtube, twitter, facebook, linkedin, instagram }) => ({ youtube, twitter, facebook, linkedin, instagram }))((req.body));
        profileFields.user = req.user.id;

        Object.keys(profileFields).forEach(key => (isEmpty(profileFields[key]) && delete profileFields[key]));
        Object.keys(profileFields.social).forEach(key => (isEmpty(profileFields.social[key]) && delete profileFields.social[key]));

        if (!isEmpty(req.body.skills)) {
            profileFields.skills = req.body.skills.split(',');
        }




        Profile.findOne({ user: profileFields.user })
            .then(profile => {
                if (profile) {
                    Profile.findOneAndUpdate({ user: profileFields.user }, { $set: profileFields }, { new: true })
                        .then(updatedProfile => res.json(updatedProfile))
                }
                else {
                    Profile.findOne({ handle: profileFields.handle })
                        .then(profile => {
                            if (profile) {
                                errors.handle = 'Handle already exists'
                                res.status(400).json(errors);
                            }

                            new Profile(profileFields).save()
                                .then(createdProfile => res.json(createdProfile))
                                .catch(err => res.status(400).json({ location: 'Save Profile', err }));
                        })
                        .catch(err => res.status(400).json(err));
                }
            }).catch(err => res.status(400).json({ location: 'Find user', err }));

    });



// @route   POST api/profile/experience
// @desc    Add experience for a user
// @access  Private
router.post('/experience',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        {
            const { errors, isValid } = ValidateExperienceInput(req.body);

            if (!isValid) return res.status(400).json(errors);

            Profile.findOne({ user: req.user.id })
                .populate('user', ['name', 'avatar'])
                .then(profile => {
                    let newExperience = (({ title, company, location, from, to, current, description }) => ({ title, company, location, from, to, current, description }))(req.body);

                    Object.keys(newExperience).forEach(key => (isEmpty(newExperience[key]) && delete newExperience[key]));

                    profile.experience.unshift(newExperience);

                    profile.save().then(profile => res.json(profile));

                })
                .catch(err => res.status(400).json(err));
        }
    });

// @route   POST api/profile/education
// @desc    Add education for a user
// @access  Private
router.post('/education',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        {
            const { errors, isValid } = ValidateEducationInput(req.body);

            if (!isValid) return res.status(400).json(errors);

            Profile.findOne({ user: req.user.id })
                .populate('user', ['name', 'avatar'])
                .then(profile => {
                    let newEducation = (({ school, degree, fieldofstudy, from, to, current, description }) => ({ school, degree, fieldofstudy, from, to, current, description }))(req.body);


                    Object.keys(newEducation).forEach(key => (isEmpty(newEducation[key]) && delete newEducation[key]));

                    profile.education.unshift(newEducation);

                    profile.save().then(profile => res.json(profile));

                })
        }
    });



// @route   DELETE api/profile/experience/:EXPid
// @desc    Delete experience for a user
// @access  Private
router.delete('/experience/:EXPid',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        {
            let experienceId = req.params.EXPid

            Profile.findOne({ user: req.user.id })
                .populate('user', ['name', 'avatar'])
                .then(profile => {

                    const removeIndex = profile.experience
                        .map(item => item._id)
                        .indexOf(experienceId);

                    if (removeIndex > -1) {
                        profile.experience.splice(removeIndex, 1);
                        profile.save().then(profile => res.json(profile)).catch(err => {
                            res.status(404).json({ noexperience: 'No experience with given ID found' })
                        });
                    }
                    else {
                        res.status(404).json({ noexperience: 'No experience with given ID found' })
                    }

                })
                .catch(err => {
                    res.status(404).json({ noexperience: 'No experience with given ID found' })
                }
                );
        }
    });

// @route   POST api/profile/education/:EDUid
// @desc    Delete education for a user
// @access  Private
router.delete('/education/:EDUid',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        {
            let educationId = req.params.EDUid;

            Profile.findOne({ user: req.user.id })
                .populate('user', ['name', 'avatar'])
                .then(profile => {

                    const removeIndex = profile.education
                        .map(item => item._id)
                        .indexOf(educationId);


                    if (removeIndex > -1) {
                        profile.education.splice(removeIndex, 1);
                        profile.save().then(profile => res.json(profile)).catch(err => {
                            res.status(404).json({ noeducation: 'No education with given ID found' })
                        });
                    }
                    else {
                        res.status(404).json({ noeducation: 'No education with given ID found' })
                    }


                })
                .catch(err => {
                    res.status(404).json({ noeducation: 'No education with given ID found' })
                })
        }
    });


// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOneAndRemove({ user: req.user.id }).then(() => {
            User.findOneAndRemove({ _id: req.user.id }).then(() =>
                res.json({ success: true })
            );
        });
    }
);

module.exports = router

