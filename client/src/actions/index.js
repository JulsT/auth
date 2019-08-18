import axios from 'axios';
import * as actionTypes from './actionTypes';
import config from '../config';

export const recieveUser = (token) => (dispatch) => axios
  .get(`${config.API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((res) => {
    dispatch({ type: actionTypes.FETCH_USER_DATA, payload: res.data });
  })
  .catch((err) => console.log(err));

export const signup = (data, history) => (dispatch) => {
  dispatch({ type: actionTypes.SIGNUP_REQUEST });
  axios
    .post(`${config.API_URL}/users`, data)
    .then((res) => {
      localStorage.setItem('token', res.data.token);
      dispatch({ type: actionTypes.SIGNUP_SUCCESS, payload: res.data });
      dispatch(recieveUser(res.data.token));
      history.push('/');
    })
    .catch((err) => {
      dispatch({ type: actionTypes.SIGNUP_FAILURE, payload: err.response.data.error });
    });
};

export const login = (data, history) => (dispatch) => {
  dispatch({ type: actionTypes.LOGIN_REQUEST });
  axios
    .post(`${config.API_URL}/users/login`, data)
    .then((res) => {
      localStorage.setItem('token', res.data.token);
      dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: res.data });
      dispatch(recieveUser(res.data.token));
      history.push('/');
    })
    .catch((err) => {
      dispatch({ type: actionTypes.LOGIN_FAILURE, payload: err.response.data.error });
    });
};

export const logout = () => (dispatch) => {
  axios.get(`${config.API_URL}/users/logout`).then(() => {
    localStorage.removeItem('token');
    dispatch({ type: actionTypes.LOGOUT });
  });
};

export const editUser = (data) => (dispatch, getState) => {
  const updatedUser = { data, _id: getState().userId };
  axios
    .put(`${config.API_URL}/users/me`, updatedUser, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      dispatch({ type: actionTypes.UPDATE_USER_DATA, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: actionTypes.UPDATE_USER_DATA_FAILURE, payload: err.response.data.error });
    });
};
