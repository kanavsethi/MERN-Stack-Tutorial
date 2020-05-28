const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../../models/User');
const { secretKey } = require('../../config/keys');
const ValidateRegisterInput = require('../../validations/users/register');
const ValidateLoginInput = require('../../validations/users/login');

const router = express.Router();

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.send('The user page is working'));

// @route   POST api/users/register
// @desc    Register users
// @access  Public
router.post('/register', (req, res) => {

    const { errors, isValid } = ValidateRegisterInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    if (req.body.password != req.body.password2) {
        errors.password2 = 'Confirm Password should be same as Password'
        return res.status(400).json(errors);
    }


    User.findOne({ email: req.body.email })
        .then(user => {
            errors.email = 'Email already exists'
            if (user) return res.status(400).json(errors);

            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                });
            });
        });
});



// @route   POST api/users/login
// @desc    Logs in user -> JWT Token
// @access  Public
router.post('/login', (req, res) => {

    const { errors, isValid } = ValidateLoginInput(req.body);

    if (!isValid) return res.status(400).json(errors);


    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                errors.email = 'Email not found'
                return res.status(404).json(errors);
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(isMatched => {
                        if (isMatched) {
                            payload = { id: user.id, name: user.name, avatar: user.avatar }
                            jwt.sign(
                                payload,
                                secretKey,
                                {
                                    expiresIn: 3600,
                                }, (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        success: true,
                                        token: 'Bearer ' + token,
                                    });
                                }
                            );
                        }
                        else {
                            errors.password = 'Password Incorrect'
                            res.status(400).json(errors);
                        }
                    });
            }
        });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        });
    }
);

module.exports = router