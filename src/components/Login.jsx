import React, { useRef, useState } from "react";
import "./login.css";
import {
  APP_LOGO_IMG,
  DEFUALT_USER_PHOTO_URL,
  LOGIN_BG_IMG,
} from "../constants/constants";
import { isEmailValid, isNameValid } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";
import Header from "./Header";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [nameValidate, setNameValidate] = useState(false);
  const [emailValidate, setEmailValidate] = useState(false);
  const [passvalidate, setPassValidate] = useState({
    hasNumber: false,
    hasSpecial: false,
    hasUpper: false,
    hasLower: false,
    hasMinLength: false,
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const user = useSelector((state) => state.userConfig.user);
  const navigate = useNavigate();

  const resetData = () => {
    emailRef.current.value = null;
    nameRef.current.value = null;
    passwordRef.current.value = null;
    setPassValidate({
      hasNumber: false,
      hasSpecial: false,
      hasUpper: false,
      hasLower: false,
      hasMinLength: false,
    });
    setNameValidate(false);
    setEmailValidate(false);
    setErrorMessage(null);
  };

  const handleSignUpIn = () => {
    const name = nameRef.current?.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (isSignup) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          // Signed up
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: DEFUALT_USER_PHOTO_URL,
          }).then((res) => {
            resetData();
            setIsSignup(false);
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const { displayName, photoURL } = userCredential.user;
          dispatch(addUser({ displayName, photoURL }));
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    }
  };

  const handleNameChange = () => {
    const name = nameRef.current.value;
    setNameValidate(isNameValid(name));
  };
  const handleEmailChange = () => {
    const email = emailRef.current.value;
    setEmailValidate(!isEmailValid(email));
  };
  const handlePasswordChange = () => {
    const password = passwordRef.current.value;
    setPassValidate({
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>_\-\[\]\\;'/+=~`]/.test(password),
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasMinLength: password.length >= 8,
    });
  };
  const checkDisabled = () => {
    if (isSignup) {
      const passwordvalid = Object.values(passvalidate).every((item) => item);
      if (nameValidate || emailValidate || !passwordvalid) {
        return true;
      }
      return false;
    }
    return false;
  };
  if (user) {
    return <Navigate to="/browse" />;
  }
  return (
    <div>
      <Header />
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.527),rgba(0,0,0,0.5)), url(${LOGIN_BG_IMG})`,
        }}
        className="h-screen bg-cover bg-no-repeat bg-center flex items-center justify-center text-white"
      >
        <div className="bg-[rgba(0,0,0,0.7)] px-10 pt-10 pb-20 rounded-3xl">
          <h3 className="text-3xl mb-6">{isSignup ? "Sign Up" : "Sign In"}</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            {isSignup && (
              <div
                className={`flex justify-between items-center gap-4 relative ${
                  nameValidate ? "mb-10" : "mb-4"
                }`}
              >
                <label>Name </label>
                <div>
                  <input
                    className="rounded-lg p-1 bg-transparent border border-gray-500"
                    type="text"
                    ref={nameRef}
                    onChange={handleNameChange}
                  />
                  {nameValidate && (
                    <p className="text-xs text-red-500 absolute p-1">
                      Name Should Contain atleast 3 characters
                    </p>
                  )}
                </div>
              </div>
            )}
            <div
              className={`flex justify-between items-center gap-4 relative ${
                emailValidate ? "mb-8" : "mb-4"
              }`}
            >
              <label>Email </label>
              <div>
                <input
                  className="rounded-lg p-1 bg-transparent border border-gray-500"
                  type="text"
                  ref={emailRef}
                  onChange={handleEmailChange}
                />
                {emailValidate && (
                  <p className="text-xs text-red-500 absolute p-1">
                    Please enter valid email
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center mb-4 gap-4">
              <label>Password </label>
              <input
                className="rounded-lg p-1 bg-transparent border border-gray-500"
                type="password"
                ref={passwordRef}
                onChange={handlePasswordChange}
              />
            </div>
            {isSignup && (
              <div className="mb-4">
                <p
                  className={`passValid ${
                    passvalidate.hasNumber ? "valid" : ""
                  }`}
                >
                  Contain atleast 1 number
                </p>
                <p
                  className={`passValid ${
                    passvalidate.hasSpecial ? "valid" : ""
                  }`}
                >
                  Contain atleast 1 special character
                </p>
                <p
                  className={`passValid ${
                    passvalidate.hasUpper ? "valid" : ""
                  }`}
                >
                  Contain atleast 1 uppercase
                </p>
                <p
                  className={`passValid ${
                    passvalidate.hasLower ? "valid" : ""
                  }`}
                >
                  Contain atleast 1 lowercase
                </p>
                <p
                  className={`passValid ${
                    passvalidate.hasMinLength ? "valid" : ""
                  }`}
                >
                  Contain atleast 8 letters
                </p>
              </div>
            )}
            <button
              className={`bg-red-700 font-bold py-2 rounded-lg w-full mb-4 ${
                checkDisabled() ? "opacity-50" : ""
              }`}
              onClick={handleSignUpIn}
              disabled={checkDisabled()}
            >
              {isSignup ? "Sign up" : "Sign in"}
            </button>
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
            <p className="">
              {isSignup ? "Already User ? " : "New to Movieflix ? "}
              <span
                className="text-blue-700 cursor-pointer"
                onClick={(e) => setIsSignup(!isSignup)}
              >
                {isSignup ? "Sign In" : "Sign up"}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
