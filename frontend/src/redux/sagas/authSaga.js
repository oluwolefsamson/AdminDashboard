// src/redux/sagas/authSaga.js

import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../slices/authSlice";

function* registerSaga(action) {
  try {
    const response = yield call(
      axios.post,
      `https://admindashboard-xtoc.onrender.com/api/auth/register`,
      action.payload
    );

    // Dispatch success action
    yield put(registerSuccess(response.data));

    // Alert user about successful registration
    alert("Registration successful! Please log in.");
  } catch (error) {
    console.error("Registration error:", error);
    if (error.response) {
      yield put(
        registerFailure(error.response.data.error || "Registration failed")
      );
    } else if (error.request) {
      yield put(registerFailure("No response from server"));
    } else {
      yield put(registerFailure(error.message || "An unknown error occurred"));
    }
  }
}

function* loginSaga(action) {
  try {
    const response = yield call(
      axios.post,
      `https://admindashboard-xtoc.onrender.com/api/auth/login`,
      action.payload
    );

    // Log user data and token to the console
    console.log("Login response:", response.data);

    const user = response.data.user; // Extract user data
    const token = response.data.token; // Extract token

    // Log user ID and token
    console.log("User ID:", user._id); // Log user ID
    console.log("Token:", token); // Log token

    // Dispatch success action with user and token
    yield put(
      loginSuccess({
        user, // Pass the user object directly
        token, // Pass the token directly
      })
    );
  } catch (error) {
    let errorMessage;

    if (error.response) {
      switch (error.response.status) {
        case 401:
          errorMessage = "Invalid email or password. Please try again.";
          break;
        case 404:
          errorMessage = "The server could not be found.";
          break;
        case 500:
          errorMessage = "Server error. Please try again later.";
          break;
        default:
          errorMessage =
            error.response.data.error || "Login failed. Please try again.";
      }
    } else if (error.request) {
      errorMessage = "No response from server. Please check your connection.";
    } else {
      errorMessage =
        error.message || "An unknown error occurred. Please try again.";
    }

    // Dispatch failure action with the error message
    yield put(loginFailure(errorMessage));
  }
}

export default function* authSaga() {
  yield takeLatest(registerRequest.type, registerSaga);
  yield takeLatest(loginRequest.type, loginSaga);
}
