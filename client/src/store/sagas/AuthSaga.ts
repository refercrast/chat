import { call, put } from 'redux-saga/effects';
import { auth } from "../../services/auth";

import { authActions } from "../actions";

export function* authSaga(action: any) {
    const { email, password, path } = action.payload;
    try {
        const response = yield call(auth, { email, password, path });
        yield put(authActions.authSuccess(response.data));
    } catch (e) {
        yield put(authActions.authFailure(e.response.data.errorMessage));
    }
}