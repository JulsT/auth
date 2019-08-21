import {
  takeEvery, put, call, apply,
} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import * as authAction from '../actions';
import callApi from '../utils/call-api';
import config from '../config';

export function* handleLogin(action) {
  try {
    const resp = yield call(
      callApi,
      `${config.API_URL}/users/login`,
      undefined,
      'POST',
      action.payload.data,
    );
    console.log('login', resp);
    const { data } = resp;
    yield put(authAction.loginSuccess(data));
    yield apply(localStorage, localStorage.setItem, ['token', data.token]);
    yield put(authAction.recieveUser(data.token));
    yield apply(action.payload.history, action.payload.history.push, ['/']);
  } catch (error) {
    yield put(authAction.loginFailure(error.response.data.error));
  }
}

export function* handleSignUp(action) {
  try {
    const { data } = yield call(
      callApi,
      `${config.API_URL}/users`,
      undefined,
      'POST',
      action.payload.data,
    );
    yield put(authAction.signupSuccess(data));
    yield apply(localStorage, localStorage.setItem, ['token', data.token]);
    yield put(authAction.recieveUser(data.token));
    yield apply(action.payload.history, action.payload.history.push, ['/']);
  } catch (error) {
    yield put(authAction.signupFailure(error.response.data.error));
  }
}

export function* handleRecieveUser(action) {
  try {
    const token = action.payload;
    const { data } = yield call(callApi, `${config.API_URL}/users/me`, token);
    yield put(authAction.recieveUserSuccess(data));
  } catch (error) {
    console.warn(error);
  }
}

export function* handleLogout() {
  try {
    yield call(callApi, `${config.API_URL}/users/logout`);
    yield apply(localStorage, localStorage.removeItem, ['token']);
  } catch (error) {
    console.warn(error);
  }
}

export function* watchLogin() {
  yield takeEvery(actionTypes.LOGIN_REQUEST, handleLogin);
}

export function* watchSignUp() {
  yield takeEvery(actionTypes.SIGNUP_REQUEST, handleSignUp);
}

export function* watchRecieveUser() {
  yield takeEvery(actionTypes.FETCH_USER_DATA, handleRecieveUser);
}

export function* watchLogout() {
  yield takeEvery(actionTypes.LOGOUT, handleLogout);
}
