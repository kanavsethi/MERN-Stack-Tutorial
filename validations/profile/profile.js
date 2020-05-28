const validator = require('validator');
const isEmpty = require('../../utils/isEmpty')

function ValidateProfileInput(data) {

    data.handle = isEmpty(data.handle) ? '' : data.handle;
    data.status = isEmpty(data.status) ? '' : data.status;
    data.skills = isEmpty(data.skills) ? '' : data.skills;


    let errors = {}

    if (!validator.isLength(data.handle, { min: 4, max: 40 })) {
        errors.handle = 'Handle length should be between 4 and 40 charecters';
    }

    if (validator.isEmpty(data.handle)) {
        errors.handle = 'Handle Field is required';
    }

    if (validator.isEmpty(data.status)) {
        errors.status = 'Status Field is required';
    }

    if (validator.isEmpty(data.skills)) {
        errors.skills = 'Skills Field is required';
    }


    if (!isEmpty(data.website)) {
        if (!validator.isURL(data.website)) {
            errors.website = 'Not a valid URL';
        }
    }

    if (!isEmpty(data.youtube)) {
        if (!validator.isURL(data.youtube)) {
            errors.youtube = 'Not a valid URL';
        }
    }

    if (!isEmpty(data.instagram)) {
        if (!validator.isURL(data.instagram)) {
            errors.instagram = 'Not a valid URL';
        }
    }

    if (!isEmpty(data.linkedin)) {
        if (!validator.isURL(data.linkedin)) {
            errors.linkedin = 'Not a valid URL';
        }
    }

    if (!isEmpty(data.twitter)) {
        if (!validator.isURL(data.twitter)) {
            errors.twitter = 'Not a valid URL';
        }
    }

    if (!isEmpty(data.facebook)) {
        if (!validator.isURL(data.facebook)) {
            errors.facebook = 'Not a valid URL';
        }
    }

    if (!isEmpty(data.githubusername)) {
        if (!validator.isLength(data.githubusername, { min: 3, max: 40 })) {
            errors.githubusername = 'Github Username length should be between 3 and 40 charecters';
        }
    }
    if (!isEmpty(data.company)) {
        if (!validator.isLength(data.company, { min: 4, max: 80 })) {
            errors.company = 'Company length should be between 4 and 80 charecters';
        }
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}


module.exports = ValidateProfileInput;