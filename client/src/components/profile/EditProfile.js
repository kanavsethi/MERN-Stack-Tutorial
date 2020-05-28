import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter, Link } from "react-router-dom";


import { faFacebook, faTwitter, faLinkedin, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons'

import TextInputFieldGroup from '../Input/TextInputFieldGroup';
import SelectionInputFieldGroup from '../Input/SelectionInputFieldGroup';
import TextAreaInputFieldGroup from '../Input/TextAreaInputFieldGroup';
import IconTextInputFieldGroup from '../Input/IconTextInputFieldGroup';
import { createProfile, getCurrentProfile } from '../../redux/actions/profileActions';

import isEmpty from '../../utils/isEmpty';

class EditProfile extends Component {

    constructor() {
        super();
        this.state = {
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            bio: '',
            githubusername: '',
            youtube: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            instagram: '',
            displySocialLinks: false,
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.socialLinksDisplay = this.socialLinksDisplay.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentProfile();

        if (this.props.profile.profile) {
            let profileFields = (({ handle, company, website, location, status, bio, githubusername }) => ({ handle, company, website, location, status, bio, githubusername }))(this.props.profile.profile);

            profileFields = {
                ...profileFields,
                ...this.props.profile.profile.social
            }

            Object.keys(profileFields).forEach(key => (isEmpty(profileFields[key]) && delete profileFields[key]));


            if (!isEmpty(this.props.profile.profile.skills)) {
                profileFields.skills = this.props.profile.profile.skills.join(',');
            }

            this.setState(prevState => ({
                ...prevState,
                ...profileFields
            }));
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        let newProfile = (({ handle, company, website, location, status, skills, bio, githubusername, youtube, twitter, facebook, linkedin, instagram }) => ({ handle, company, website, location, skills, status, bio, githubusername, youtube, twitter, facebook, linkedin, instagram }))(this.state);


        this.props.createProfile(newProfile, this.props.history);
    }

    socialLinksDisplay() {
        this.setState(prevState => ({
            displySocialLinks: !prevState.displySocialLinks
        }))
    }




    render() {


        let socialLinks = (
            <div>
                <IconTextInputFieldGroup
                    type="text"
                    icon={faTwitter}
                    placeholder="Twitter Profile URL"
                    name="twitter"
                    onChange={this.onChange}
                    value={this.state.twitter}
                    error={this.props.errors.twitter} />

                <IconTextInputFieldGroup
                    type="text"
                    icon={faFacebook}
                    placeholder="Facebook Page URL"
                    name="facebook"
                    onChange={this.onChange}
                    value={this.state.facebook}
                    error={this.props.errors.facebook} />

                <IconTextInputFieldGroup
                    type="text"
                    icon={faLinkedin}
                    placeholder="Linkedin Profile URL"
                    name="linkedin"
                    onChange={this.onChange}
                    value={this.state.linkedin}
                    error={this.props.errors.linkedin} />

                <IconTextInputFieldGroup
                    type="text"
                    icon={faYoutube}
                    placeholder="YouTube Channel URL"
                    name="youtube"
                    onChange={this.onChange}
                    value={this.state.youtube}
                    error={this.props.errors.youtube} />

                <IconTextInputFieldGroup
                    type="text"
                    icon={faInstagram}
                    placeholder="Instagram Page URL"
                    name="instagram"
                    onChange={this.onChange}
                    value={this.state.instagram}
                    error={this.props.errors.instagram} />
            </div>)



        return (
            <div className="create-profile" >
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">Go Back</Link>
                            <h1 className="display-4 text-center">Create Your Profile</h1>
                            <p className="lead text-center">Let's get some information to make your profile stand out</p>
                            <small className="d-block pb-3">* = required field</small>
                            <form noValidate onSubmit={this.onSubmit}>
                                <TextInputFieldGroup
                                    type="text"
                                    placeholder="* Profile handle"
                                    name="handle"
                                    required
                                    info="A unique handle for your profile URL. Your full name, company name, nickname, etc"
                                    onChange={this.onChange}
                                    value={this.state.handle}
                                    error={this.props.errors.handle}
                                />

                                <SelectionInputFieldGroup
                                    name="status"
                                    info="Give us an idea of where you are at in your career"
                                    onChange={this.onChange}
                                    value={this.state.status}
                                    options={[{
                                        label: "* Select Professional Status",
                                        value: "0"
                                    }, {
                                        label: "Developer",
                                        value: "developer"
                                    }, {
                                        label: "Junior Developer",
                                        value: "junior_developer"
                                    }, {
                                        label: " Senior Developer",
                                        value: "senior_developer"
                                    }, {
                                        label: "Manager",
                                        value: "Manager"
                                    }, {
                                        label: "Student or Learning",
                                        value: "Student or Learning"
                                    }, {
                                        label: "Instructor",
                                        value: "Instructor"
                                    }, {
                                        label: "Intern",
                                        value: "Intern"
                                    }, {
                                        label: "Other",
                                        value: "Other"
                                    }]}
                                    error={this.props.errors.status}
                                />

                                <TextInputFieldGroup
                                    type="text"
                                    placeholder="Company"
                                    name="company"
                                    onChange={this.onChange}
                                    value={this.state.company}
                                    info="Could be your own company or one you work for"
                                    error={this.props.errors.company} />

                                <TextInputFieldGroup
                                    type="text"
                                    placeholder="Website"
                                    name="website"
                                    onChange={this.onChange}
                                    value={this.state.website}
                                    info="Could be your own or a company website"
                                    error={this.props.errors.website} />

                                <TextInputFieldGroup
                                    type="text"
                                    placeholder="Location"
                                    name="location"
                                    onChange={this.onChange}
                                    value={this.state.location}
                                    info="City & state suggested (eg. Boston, MA)"
                                    error={this.props.errors.location} />

                                <TextInputFieldGroup
                                    type="text"
                                    placeholder="Skills"
                                    name="skills"
                                    onChange={this.onChange}
                                    value={this.state.skills}
                                    info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                                    error={this.props.errors.skills} />

                                <TextInputFieldGroup
                                    type="text"
                                    placeholder="Github Username"
                                    name="githubusername"
                                    onChange={this.onChange}
                                    value={this.state.githubusername}
                                    info="If you want your latest repos and a Github link, include your username"
                                    error={this.props.errors.githubusername} />

                                <TextAreaInputFieldGroup
                                    placeholder="A short bio of yourself"
                                    name="bio"
                                    onChange={this.onChange}
                                    value={this.state.bio}
                                    info="Tell us a little about yourself"
                                    error={this.props.errors.bio} />


                                <div className="mb-3">
                                    <button type="button" className="btn btn-light" onClick={this.socialLinksDisplay}>Add Social Network Links</button>
                                    <span className="text-muted">Optional</span>
                                </div>

                                {this.state.displySocialLinks ? socialLinks : null}

                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}


let mapStatetoProps = (state) => ({
    profile: state.profile,
    errors: state.errors
});


export default connect(mapStatetoProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));
