import { call, put } from 'redux-saga/effects';
import { auth } from "../../services/auth";

import { authActions } from "../actions";

export function* authSaga(action: any) {
    const { username, password, path } = action.payload.data;
    const { response, error } = yield call(auth, { username, password, path });
    if (response) {
        yield put(authActions.authSuccess(response));
    } else {
        yield put(authActions.authFailure(error));
    }
}