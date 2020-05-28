const validator = require('validator');
const isEmpty = require('../../utils/isEmpty')

function ValidateRegisterInput(data) {
    data.name = isEmpty(data.name) ? '' : data.name;
    data.email = isEmpty(data.email) ? '' : data.email;
    data.password = isEmpty(data.password) ? '' : data.password;
    data.password2 = isEmpty(data.password2) ? '' : data.password2;

    let errors = {}


    if (!validator.isLength(data.name, { min: 3, max: 30 })) {
        errors.name = 'Name Field should be between 3 and 30 charecters';
    }

    if (validator.isEmpty(data.name)) {
        errors.name = 'Name Field is required';
    }



    if (!validator.isEmail(data.email)) {
        errors.email = 'Email Invalid';
    }

    if (validator.isEmpty(data.email)) {
        errors.email = 'Email Field is required';
    }

    if (!validator.isLength(data.password, { min: 3, max: 30 })) {
        errors.password = 'Password Field should be between 3 and 30 charecters';
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'Password Field is required';
    }



    if (validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm Password Field is required';

    }



    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = ValidateRegisterInput;
