import { call, put } from 'redux-saga/effects';
import api from "../../services/api";

import { authSuccess, authFailure } from "../actions";


export function* authSaga(action: any) {
    const { path,  data } = action.payload.data;
    const { response, error } = yield call(api.call,`post`,`user/${path}`, data);
    if (response) {
        yield put(authSuccess(response.token));
    } else {
        yield put(authFailure(error));
    }
}