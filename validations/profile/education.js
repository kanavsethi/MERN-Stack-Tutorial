const validator = require('validator');
const isEmpty = require('../../utils/isEmpty')


function ValidateEducationInput(data) {

    data.school = isEmpty(data.school) ? '' : data.school;
    data.degree = isEmpty(data.degree) ? '' : data.degree;
    data.fieldofstudy = isEmpty(data.fieldofstudy) ? '' : data.fieldofstudy;
    data.from = isEmpty(data.from) ? '' : data.from;
    data.to = isEmpty(data.to) ? '' : data.to;



    let errors = {}

    if (!validator.isLength(data.school, { min: 2, max: 40 })) {
        errors.school = 'School length should be between 2 and 40 charecters';
    }

    if (validator.isEmpty(data.school)) {
        errors.school = 'School Field is required';
    }

    if (validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = 'Field of study Field is required';
    }

    if (!validator.isLength(data.degree, { min: 4, max: 40 })) {
        errors.degree = 'Degree length should be between 4 and 40 charecters';
    }

    if (validator.isEmpty(data.degree)) {
        errors.degree = 'Degree Field is required';
    }

    if (validator.isEmpty(data.from)) {
        errors.from = 'From Field is required';
    }

    if (!data.current) {
        if (validator.isEmpty(data.to)) {
            errors.to = 'To Field is required';
        }
    }


    if (!isEmpty(data.description)) {
        if (!validator.isLength(data.description, { min: 4, max: 80 })) {
            errors.description = 'Description length should be between 4 and 80 charecters';
        }
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = ValidateEducationInput;