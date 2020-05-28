const validator = require('validator');
const isEmpty = require('../../utils/isEmpty')

function ValidateLoginInput(data) {
    data.email = isEmpty(data.email) ? '' : data.email;
    data.password = isEmpty(data.password) ? '' : data.password;

    let errors = {}

    if (!validator.isEmail(data.email)) {
        errors.email = 'Email Invalid';
    }

    if (validator.isEmpty(data.email)) {
        errors.email = 'Email Field is required';
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'Password Field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = ValidateLoginInput;
