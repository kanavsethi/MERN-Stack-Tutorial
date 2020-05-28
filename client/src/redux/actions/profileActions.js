import axios from 'axios';
import { logOutUser } from './authActions';
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_PROFILES } from './types';
import { setErrors, clearErrors } from './errorActions';

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());

    axios.get('/api/profile')
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        );
};


export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}

export const createProfile = (profileData, history) => dispatch => {

    axios.post('/api/profile', profileData)
        .then(res => {
            dispatch(clearErrors());
            history.push('/dashboard');
        })
        .catch(err =>
            dispatch(setErrors(err))
        );
};

export const deleteCurrentAccount = () => dispatch => {
    if (window.confirm("Are you sure? This can NOT be undone!")) {
        axios.delete('/api/profile')
            .then(res => {
                console.log('Logging Out');
                dispatch(logOutUser());
                dispatch(clearErrors());
            })
            .catch(err =>
                dispatch(setErrors(err))
            );
    }
}

export const addEducation = (educationData, history) => dispatch => {

    axios.post('/api/profile/education', educationData)
        .then(res => {
            dispatch(clearErrors());
            history.push('/dashboard');
        })
        .catch(err =>
            dispatch(setErrors(err))
        );
}


export const addExperience = (experienceData, history) => dispatch => {

    axios.post('/api/profile/experience', experienceData)
        .then(res => {
            dispatch(clearErrors());
            history.push('/dashboard');
        })
        .catch(err =>
            dispatch(setErrors(err))
        );
}


export const deleteEducation = (educationID) => dispatch => {
    axios.delete(`/api/profile/education/${educationID}`)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch(setErrors(err))
        );
}


export const deleteExperience = (experienceID) => dispatch => {

    axios.delete(`/api/profile/experience/${experienceID}`)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(setErrors(err));
        });
}


export const getProfiles = () => dispatch => {
    axios.get('/api/profile/all/all')
        .then(res => {
            dispatch(setProfileLoading());
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })

        })
        .catch(err => {
            dispatch({
                type: GET_PROFILES,
                payload: null
            })
        });
}



export const getProfileByHandle = (handle) => dispatch => {
    axios.get(`/api/profile/${handle}`)
        .then(res => {
            dispatch(setProfileLoading());
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch(setErrors(err));
        });
}