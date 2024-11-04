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
  getAllUsersRequest,
  getAllUsersSuccess,
  getAllUsersFailure,
  logout,
} from "../slices/authSlice";

function* registerSaga(action) {
  try {
    const response = yield call(
      axios.post,
      `https://admindashboard-rbch.onrender.com/api/auth/register`,
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
      `https://admindashboard-rbch.onrender.com/api/auth/login`,
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

function* getAllUsersSaga() {
  try {
    const response = yield call(
      axios.get,
      `https://admindashboard-rbch.onrender.com/api/users`
    );

    // Dispatch success action with users data
    yield put(getAllUsersSuccess(response.data));
  } catch (error) {
    let errorMessage;
    if (error.response) {
      errorMessage = error.response.data.error || "Failed to fetch users";
    } else if (error.request) {
      errorMessage = "No response from server. Please check your connection.";
    } else {
      errorMessage = error.message || "An unknown error occurred.";
    }

    // Dispatch failure action with error message
    yield put(getAllUsersFailure(errorMessage));
  }
}

// Logout saga to handle any side effects
function* logoutSaga() {
  try {
    // Show a confirmation alert before logging out
    const confirmed = window.confirm("Are you sure you want to log out?");

    if (!confirmed) {
      // If user selects "Cancel", exit the saga without logging out
      return;
    }

    // Clear any stored tokens or data from localStorage
    yield call([localStorage, "removeItem"], "authToken");

    // Optionally redirect or perform other cleanup
    // For example, redirect the user to the login page
    window.location.href = "/login"; // Optional
  } catch (error) {
    console.error("Logout failed:", error);
  }
}

export default function* authSaga() {
  yield takeLatest(registerRequest.type, registerSaga);
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(getAllUsersRequest.type, getAllUsersSaga); // Add this line
  yield takeLatest(logout.type, logoutSaga); // Watch for logout action
}
