import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../Img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../actions/AuthAction.js";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  const error = useSelector((state) => state.authReducer.error);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpass: "",
  });

  const [confirmPass, setConfirmPass] = useState(true);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // const handlSubmit = async (e) => {
  //     e.preventDefault();
  //     console.log("Form submitted with data:", data); // Debug log

  //     if (isSignUp) {
  //         data.password === data.confirmpass ? dispatch(signUp(data)) : setConfirmPass(false)
  //     } else {
  //         dispatch(logIn(data))
  //     }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", data); // Debug log

    if (isSignUp) {
      // Validate all required fields
      if (!data.firstname || !data.lastname || !data.email || !data.password) {
        alert("Please fill all fields");
        return;
      }
      // Check password match
      if (data.password !== data.confirmpass) {
        setConfirmPass(false);
        return;
      }
      console.log("Dispatching signup with data:", data);

      dispatch(signUp(data));
    } else {
      dispatch(logIn(data));
    }
  };

  const resetForm = () => {
    setConfirmPass(true);

    setData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpass: "",
    });
  };

  return (
    //    Left Side
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h2>Welcome !</h2>
          <h5>
            Explore the ideas throughout <br /> the world.
          </h5>
        </div>
      </div>

      {/* Right Side */}

      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>

          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}

          <div>
            <input
              type="text"
              placeholder="Email"
              className="infoInput"
              name="email"
              onChange={handleChange}
              value={data.email}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="infoInput"
              name="password"
              onChange={handleChange}
              value={data.password}
            />
            {isSignUp && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="infoInput"
                name="confirmpass"
                onChange={handleChange}
                value={data.confirmpass}
              />
            )}
          </div>

          <span
            style={{
              display: confirmPass ? "none" : "block",
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
            }}
          >
            * Confirm Password is not same
          </span>

          {error && (
            <span
              style={{
                color: "red",
                fontSize: "12px",
                alignSelf: "flex-end",
                marginRight: "5px",
              }}
            >
              Signup/Login failed. Please check your details or try a different
              email.
            </span>
          )}
          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => {
                setIsSignUp((prev) => !prev);
                resetForm();
              }}
            >
              {isSignUp
                ? "Already have an account? Login here"
                : "Don't have an account? SignUp here"}
            </span>
          </div>

          <button
            className="button infoButton"
            type="submit"
            disabled={loading}
          >
            {loading ? "loading..." : isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
