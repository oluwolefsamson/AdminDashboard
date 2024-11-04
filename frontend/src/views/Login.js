import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest, resetError } from "../redux/auth/authSlice"; // Action to request login

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access loading and error state from Redux
  const { loading, error, user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the login request action with email and password
    dispatch(loginRequest({ email, password }));
  };

  useEffect(() => {
    if (user) {
      alert("Login Successful");

      // Redirect to dashboard page if user is logged in
      navigate(`/user/${user._id}`); // Navigate using the correct ID
    }

    // Show alert for error message
    if (error) {
      alert("Invalid Credentials");
      dispatch(resetError());
    }
  }, [user, error, navigate, dispatch]);

  return (
    <div className="container mx-auto px-4 mt-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-4/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3">
                <h6 className="text-blueGray-500 text-sm font-bold">
                  Sign in with
                </h6>
              </div>
              <div className="btn-wrapper text-center">
                <button className="bg-white text-blueGray-700 font-bold px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center text-xs">
                  <img
                    alt="..."
                    className="w-5 mr-1"
                    src={require("assets/img/github.svg").default}
                  />
                  Github
                </button>
                <button className="bg-white text-blueGray-700 font-bold px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center text-xs">
                  <img
                    alt="..."
                    className="w-5 mr-1"
                    src={require("assets/img/google.svg").default}
                  />
                  Google
                </button>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div className="text-blueGray-400 text-center mb-3 font-bold">
                <small>Or sign in with credentials</small>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                    placeholder="Email"
                    required
                  />
                </div>

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                    placeholder="Password"
                    required
                  />
                </div>

                <div className="text-center mt-6">
                  <button
                    className="bg-blueGray-800 text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg w-full"
                    type="submit"
                    disabled={loading} // Disable button while loading
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </button>
                </div>

                {error && (
                  <p className="text-red-500 text-xs italic mt-2">{error}</p>
                )}
              </form>
              <div className="flex flex-wrap mt-6">
                <div className="w-1/2">
                  <a
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    className="text-blue-900"
                  >
                    <small>Forgot password?</small>
                  </a>
                </div>
                <div className="w-1/2 text-right">
                  <Link to="/register" className="text-blue-900">
                    <small>Create new account</small>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
