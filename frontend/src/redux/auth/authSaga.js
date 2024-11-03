import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
} from "./authSlice";

function* handleLogin(action) {
  try {
    const response = yield call(
      axios.post,
      "http://localhost:8000/api/auth/login",
      action.payload
    );
    console.log("Logged in user:", response.data); // Log the user object
    yield put(loginSuccess(response.data)); // This should dispatch the correct user object
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

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(registerRequest.type, handleRegister);
}
