import {
  takeEvery, put, call, select,
} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import * as authAction from '../actions';
import callApi from '../utils/call-api';
import config from '../config';
import { getId } from './selectors';

export function* handleEditUser(action) {
  try {
    const id = yield select(getId);
    const updatedUser = { data: action.payload, _id: id };
    const { data } = yield call(
      callApi,
      `${config.API_URL}/users/me`,
      undefined,
      'PUT',
      updatedUser,
    );
    yield put(authAction.editUserSuccess(data));
  } catch (error) {
    yield put(authAction.editUserFailure(error.response.data.error));
  }
}

export function* watchEditUser() {
  yield takeEvery(actionTypes.UPDATE_USER_DATA_REQUEST, handleEditUser);
}
