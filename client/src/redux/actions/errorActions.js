import { GET_ERRORS } from './types';

export const setErrors = err => {
    return {
        type: GET_ERRORS,
        payload: err.response.data
    };
};

export const clearErrors = () => {
    return {
        type: GET_ERRORS,
        payload: {}
    }
};
