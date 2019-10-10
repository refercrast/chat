import { all, takeLatest, takeEvery } from 'redux-saga/effects';

import { LoginActionTypes } from "../actions/actionTypes";
import { loginSaga } from "./AuthSaga";

export default function* rootSaga() {
    return yield all([
       takeLatest(LoginActionTypes.LOGIN_REQUEST, loginSaga)
    ]);
}