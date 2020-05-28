const validator = require('validator');
const isEmpty = require('../../utils/isEmpty')

function ValidateExperienceInput(data) {

    data.company = isEmpty(data.company) ? '' : data.company;
    data.from = isEmpty(data.from) ? '' : data.from;
    data.to = isEmpty(data.to) ? '' : data.to;
    data.title = isEmpty(data.title) ? '' : data.title;


    let errors = {}

    if (!validator.isLength(data.company, { min: 4, max: 40 })) {
        errors.company = 'Company length should be between 4 and 40 charecters';
    }

    if (validator.isEmpty(data.company)) {
        errors.company = 'Company Field is required';
    }

    if (!validator.isLength(data.title, { min: 4, max: 40 })) {
        errors.title = 'Title length should be between 4 and 40 charecters';
    }

    if (validator.isEmpty(data.title)) {
        errors.title = 'Title Field is required';
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


module.exports = ValidateExperienceInput;