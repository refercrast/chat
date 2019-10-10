import { all, takeLatest } from 'redux-saga/effects';

import { AuthActionTypes } from "../actions/actionTypes";
import { authSaga } from "./AuthSaga";

export default function* rootSaga() {
    return yield all([
       takeLatest(AuthActionTypes.AUTH_REQUEST, authSaga)
    ]);
}