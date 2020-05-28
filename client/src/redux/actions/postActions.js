import axios from 'axios';

import {
    ADD_POST,
    GET_POSTS,
    GET_POST,
    POST_LOADING,
    DELETE_POST
} from './types';

import { setErrors, clearErrors } from './errorActions';

// Add Post
export const addPost = postData => dispatch => {

    axios
        .post('/api/posts', postData)
        .then(res => {
            dispatch({
                type: ADD_POST,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(setErrors(err))
        });
};

// Get Posts
export const getPosts = () => dispatch => {
    dispatch(setPostLoading());
    axios
        .get('/api/posts')
        .then(res =>
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_POSTS,
                payload: {}
            })
        );
};

// Get Post
export const getPost = id => dispatch => {
    dispatch(setPostLoading());
    axios
        .get(`/api/posts/${id}`)
        .then(res =>
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_POST,
                payload: null
            })
        );
};

// Delete Post
export const deletePost = id => dispatch => {
    axios
        .delete(`/api/posts/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_POST,
                payload: id
            })
        )
        .catch(err => {
            dispatch(setErrors(err))
        }
        );
};

// Add Like
export const addLike = id => dispatch => {
    axios
        .post(`/api/posts/like/${id}`)
        .then(res => dispatch(getPosts()))
        .catch(err =>
            dispatch(setErrors(err))
        );
};

// Remove Like
export const removeLike = id => dispatch => {
    axios
        .post(`/api/posts/unlike/${id}`)
        .then(res => dispatch(getPosts()))
        .catch(err =>
            dispatch(setErrors(err))
        );
};

// Add Comment
export const addComment = (postId, commentData) => dispatch => {
    dispatch(clearErrors());
    axios
        .post(`/api/posts/comment/${postId}`, commentData)
        .then(res =>
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(setErrors(err))
        );
};

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
    axios
        .delete(`/api/posts/comment/${postId}/${commentId}`)
        .then(res =>
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(setErrors(err))
        );
};

// Set loading state
export const setPostLoading = () => {
    return {
        type: POST_LOADING
    };
};
