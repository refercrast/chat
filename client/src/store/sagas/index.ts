import { all, takeLatest } from 'redux-saga/effects';

import { AuthTypes } from "../types";
import { authSaga } from "./AuthSaga";

export default function* rootSaga() {
    return yield all([
       takeLatest(AuthTypes.AUTH_REQUEST, authSaga)
    ]);
}