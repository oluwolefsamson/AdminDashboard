// src/redux/dashboard/dashboardSaga.js
import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
} from "./dashboardSlice";

function* handleFetchData() {
  try {
    const response = yield call(axios.get, "/api/dashboard/data");
    yield put(fetchDataSuccess(response.data));
  } catch (error) {
    yield put(fetchDataFailure(error.message));
  }
}

export default function* dashboardSaga() {
  yield takeLatest(fetchDataRequest.type, handleFetchData);
}
