import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logoutRequest,
  logoutSuccess,
} from "./authSlice";

function* handleLogin(action) {
  try {
    const response = yield call(
      axios.post,
      "http://localhost:8000/api/auth/login",
      action.payload
    );
    console.log("Logged in user:", response.data);
    yield put(loginSuccess(response.data));
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    yield put(loginFailure(errorMsg));
  }
}

function* handleRegister(action) {
  try {
    const response = yield call(
      axios.post,
      "http://localhost:8000/api/auth/register",
      action.payload
    );
    yield put(registerSuccess(response.data));
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    yield put(registerFailure(errorMsg));
  }
}

function* handleLogout() {
  try {
    // Clear the authentication token from local storage
    localStorage.removeItem("token");

    yield put(logoutSuccess());
  } catch (error) {
    console.error("Logout error:", error);
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(registerRequest.type, handleRegister);
  yield takeLatest(logoutRequest.type, handleLogout);
}
