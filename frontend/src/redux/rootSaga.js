// src/redux/rootSaga.js
import { all } from "redux-saga/effects"; // Ensure 'all' is imported
import authSaga from "./auth/authSaga";
import dashboardSaga from "./dashboard/dashboardSaga"; // Assuming you have a dashboard saga

export default function* rootSaga() {
  yield all([
    authSaga(), // Watch for auth actions
    dashboardSaga(), // Watch for dashboard actions (if any)
  ]);
}
