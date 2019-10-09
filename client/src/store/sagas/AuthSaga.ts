import { call, put } from 'redux-saga/effects';
import { login } from "../../services/auth";

import { loginActions } from "../actions";


export function* loginSaga(action: any) {
    console.log(action)
    const { path, data } = action.payload.data;
    const { response, error } = yield call(login, data);
    if (response) {
        yield put(loginActions.loginSuccess(response.token));
    } else {
        yield put(loginActions.loginFailure(error));
    }
}