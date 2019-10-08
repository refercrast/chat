import { call, put } from 'redux-saga/effects';
import api from "../../services/api";

import { authSuccess, authFailure } from "../actions";

export function* authSaga(action: any) {
    const { path,  data } = action.payload.data;
    try {
        // path one of [register, login]
        const response = yield call(api.call,`post`,`user/${path}`, data);
        yield put(authSuccess(response.data));
    } catch (e) {
        yield put(authFailure(e));
    }
}