import { call, put } from 'redux-saga/effects';
import { login } from "../../services/auth";

import { loginActions } from "../actions";


export function* loginSaga(action: any) {
    const { username, password } = action.payload.data;
    const { response, error } = yield call(login, { username, password });
    if (response) {
        yield put(loginActions.loginSuccess(response));
    } else {
        yield put(loginActions.loginFailure(error));
    }
}