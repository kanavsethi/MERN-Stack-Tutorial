import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { SET_CURRENT_USER } from './types';
import { setErrors, clearErrors } from './errorActions';

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios
        .post('/api/users/register', userData)
        .then(res => {
            dispatch(clearErrors());
            history.push('/login');
        })
        .catch(err =>
            dispatch(setErrors(err))
        );
};


export const loginUser = userData => dispatch => {
    axios
        .post('/api/users/login', userData)
        .then(res => {

            const { token } = res.data;

            localStorage.setItem('jwtToken', token);

            setAuthToken(token);

            const decoded = jwt_decode(token);
            dispatch(clearErrors());
            return dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch(setErrors(err))
        );
};


export const setCurrentUser = decoded => {

    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const logOutUser = () => dispatch => {

    localStorage.removeItem('jwtToken');

    setAuthToken(false);

    return dispatch(setCurrentUser({}));

};

