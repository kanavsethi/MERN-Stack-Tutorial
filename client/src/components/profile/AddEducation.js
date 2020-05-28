import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


import { addEducation } from '../../redux/actions/profileActions';
import TextInputFieldGroup from '../Input/TextInputFieldGroup';
import TextAreaInputFieldGroup from '../Input/TextAreaInputFieldGroup';



class AddEducation extends Component {
    constructor() {
        super();
        this.state = {
            school: '',
            degree: '',
            fieldofstudy: '',
            from: '',
            to: '',
            current: false,
            description: '',
            disabled: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCheck = this.onCheck.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        const newEducation = {
            school: this.state.school,
            degree: this.state.degree,
            fieldofstudy: this.state.fieldofstudy,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        };

        this.props.addEducation(newEducation, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onCheck(e) {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        });
    }

    render() {
        return (
            <div className="add-education">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">Go Back</Link>
                            <h1 className="display-4 text-center">Add Your Education</h1>
                            <p className="lead text-center">Add any school, bootcamp, etc that you have attended</p>
                            <small className="d-block pb-3">* = required field</small>
                            <form noValidate onSubmit={this.onSubmit}>

                                <TextInputFieldGroup
                                    type="text"
                                    placeholder="* School Or Bootcamp"
                                    name="school"
                                    required
                                    onChange={this.onChange}
                                    value={this.state.school}
                                    error={this.props.errors.school}
                                />


                                <TextInputFieldGroup
                                    type="text"
                                    placeholder="* Degree Or Certificate"
                                    name="degree"
                                    required
                                    onChange={this.onChange}
                                    value={this.state.degree}
                                    error={this.props.errors.degree}
                                />

                                <TextInputFieldGroup
                                    type="text"
                                    placeholder="Field Of Study"
                                    name="fieldofstudy"
                                    onChange={this.onChange}
                                    value={this.state.fieldofstudy}
                                    error={this.props.errors.fieldofstudy}
                                />

                                <h6>From Date</h6>
                                <TextInputFieldGroup
                                    type="date"
                                    name="from"
                                    onChange={this.onChange}
                                    value={this.state.from}
                                    error={this.props.errors.from}
                                />

                                <h6>To Date</h6>
                                <TextInputFieldGroup
                                    type="date"
                                    name="to"
                                    onChange={this.onChange}
                                    value={this.state.to}
                                    disabled={this.state.disabled ? 'disabled' : ''}
                                    error={this.props.errors.to}
                                />


                                <div className="form-check mb-4">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="current"
                                        value={this.state.current}
                                        checked={this.state.current}
                                        onChange={this.onCheck}
                                        id="current"
                                        error={this.props.errors.current}
                                    />
                                    <label htmlFor="current" className="form-check-label">Current School</label>
                                </div>

                                <TextAreaInputFieldGroup
                                    placeholder="Program Description" name="description"
                                    info="Tell us about your experience and what you learned"
                                    onChange={this.onChange}
                                    value={this.state.description}
                                    error={this.props.errors.description}
                                />
                                <input type="submit" className="btn btn-info btn-block mt-4" onSubmit={this.onSubmit} />
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}


let mapStatetoProps = (state) => ({
    errors: state.errors
});

export default connect(mapStatetoProps, { addEducation })(withRouter(AddEducation));