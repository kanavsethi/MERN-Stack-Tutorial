const validator = require('validator');
const isEmpty = require('../../utils/isEmpty')

function ValidatePostInput(data) {

    data.text = isEmpty(data.text) ? '' : data.text;

    let errors = {}

    if (!validator.isLength(data.text, { min: 2, max: 120 })) {
        errors.text = 'Text length should be between 2 and 120 charecters';
    }

    if (validator.isEmpty(data.text)) {
        errors.text = 'Text Field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


module.exports = ValidatePostInput;