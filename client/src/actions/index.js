import * as actionTypes from './actionTypes';

export const editUserRequest = (data) => ({
  type: actionTypes.UPDATE_USER_DATA_REQUEST,
  payload: data,
});

export const editUserSuccess = (data) => ({
  type: actionTypes.UPDATE_USER_DATA,
  payload: data,
});

export const editUserFailure = (error) => ({
  type: actionTypes.UPDATE_USER_DATA_FAILURE,
  payload: error,
});

export const recieveUser = (token) => ({
  type: actionTypes.FETCH_USER_DATA,
  payload: token,
});

export const recieveUserSuccess = (data) => ({
  type: actionTypes.FETCH_USER_DATA_SUCCESS,
  payload: data,
});

export const loginRequest = (data, history) => ({
  type: actionTypes.LOGIN_REQUEST,
  payload: {
    data,
    history,
  },
});

export const loginSuccess = (data) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: data,
});

export const loginFailure = (error) => ({
  type: actionTypes.LOGIN_FAILURE,
  payload: error,
});

export const signupRequest = (data, history) => ({
  type: actionTypes.SIGNUP_REQUEST,
  payload: {
    data,
    history,
  },
});

export const signupSuccess = (data) => ({
  type: actionTypes.SIGNUP_SUCCESS,
  payload: data,
});

export const signupFailure = (error) => ({
  type: actionTypes.SIGNUP_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: actionTypes.LOGOUT,
});
