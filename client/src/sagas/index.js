import { fork } from 'redux-saga/effects';
import * as authSaga from './authSagas';
import * as userSaga from './userSagas';

export default function* rootSaga() {
  yield fork(authSaga.watchLogin);
  yield fork(authSaga.watchSignUp);
  yield fork(authSaga.watchRecieveUser);
  yield fork(authSaga.watchLogout);
  yield fork(userSaga.watchEditUser);
}
