import React, { useEffect, useState } from "react";
import { TEInput, TERipple } from "tw-elements-react";
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUser, getUser, removeUser } from "./store/productSlice";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "./SignUp";
const SignIn = () => {
  const [emailInput, SetEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const catchUser = useSelector(getUser);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  //
  const auth = getAuth();
  //
  const handleSignInWithPassword = (email, password) => {
    // Check email format
    let em = validateEmail(email);
    if (!em) {
      alert("Please enter a valid email address");
      return;
    }

    // Check if email is registered (optional)
    // You can add your own logic here to check if the email is registered in your system before attempting to sign in.

    // If everything is valid, attempt to sign in
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (!user) {
          alert("User not found. Please check your email and password.");
          return;
        }
        dispatch(addUser({ email }));

        console.log(user);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        // Check Firebase error codes for password-related issues
        if (errorCode === "auth/wrong-password") {
          alert("Incorrect password. Please try again.");
        } else {
          alert("password or email not correct");
        }

        console.error(error);
      });
  };

  //
  useEffect(() => {
    if (catchUser) {
      navigation("/");
    }
  }, [catchUser]);

  // https://dolaapp-85893.firebaseapp.com/__/auth/handler

  const handleGoogle = (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const { email } = user;

        dispatch(addUser({ email }));

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
        // ...
      });
  };
  //
  const handleSignOut = (e) => {
    e.preventDefault();

    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(removeUser());
        console.log("sign  out");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <section className="h-full relative top-20 bg-neutral-200 dark:bg-neutral-700">
      <div className=" h-full p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* <!-- Left column container--> */}
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    {/* <!--Logo--> */}
                    <div className="text-center">
                      {/* <img src={profilePicture} /> */}
                      <img
                        className="mx-auto w-48"
                        src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        alt="logo"
                      />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                        We are The Lotus Team
                      </h4>
                    </div>

                    <form>
                      <p className="mb-4">Please login to your account</p>
                      {/* <!--Username input--> */}
                      <div className="relative mb-4" data-te-input-wrapper-init>
                        <input
                          type="text"
                          className="peer block min-h-[auto] w-full rounded border-1  border-blue-700 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                          onChange={(e) => SetEmailInput(e.target.value)}
                        />
                        {emailInput ? (
                          ""
                        ) : (
                          <label
                            htmlFor="email"
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:bg-white peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                          >
                            Email address
                          </label>
                        )}
                      </div>

                      <div className="relative mb-4" data-te-input-wrapper-init>
                        <input
                          type="password"
                          id="password" // Use a unique "id" for the input and match it with the "htmlFor" attribute in the label
                          className="peer block min-h-[auto] w-full rounded border-1 border-blue-700 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                          onChange={(e) => setPasswordInput(e.target.value)}
                        />
                        {passwordInput ? (
                          ""
                        ) : (
                          <label
                            htmlFor="password"
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:bg-white peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                          >
                            Password
                          </label>
                        )}
                      </div>

                      {/* <!--Submit button--> */}
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <TERipple rippleColor="light" className="w-full">
                          <button
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="button"
                            onClick={() => {
                              handleSignInWithPassword(
                                emailInput,
                                passwordInput
                              );
                            }}
                            style={{
                              background:
                                "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                            }}
                          >
                            Log in
                          </button>
                        </TERipple>

                        {/* <!--Forgot password link--> */}
                        <a href="#!">Forgot password?</a>
                      </div>

                      {/* <!--Register button--> */}
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2"> Dont have an account?</p>
                        <TERipple rippleColor="light">
                          <button
                            type="button"
                            className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                            onClick={() => {
                              navigation("/sign-up");
                            }}
                          >
                            Register
                          </button>
                        </TERipple>
                      </div>

                      <TERipple rippleColor="light" className="w-full">
                        <a
                          className="mb-3 flex w-full items-center justify-center rounded bg-info px-7 pb-2.5 pt-3 text-center text-sm font-semibold uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-gray-500 hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
                          style={{ backgroundColor: "#fafafc" }}
                          href="#!"
                          role="button"
                          onClick={handleGoogle}
                        >
                          {/* <!-- Twitter --> */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2 h-3.5 w-3.5"
                            preserveAspectRatio="xMidYMid"
                            viewBox="0 0 256 262"
                            id="google"
                          >
                            <path
                              fill="#4285F4"
                              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                            ></path>
                            <path
                              fill="#34A853"
                              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                            ></path>
                            <path
                              fill="#FBBC05"
                              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                            ></path>
                            <path
                              fill="#EB4335"
                              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                            ></path>
                          </svg>
                          Continue with google
                        </a>
                      </TERipple>
                    </form>
                  </div>
                </div>

                {/* <!-- Right column container with background and description--> */}
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background:
                      "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      We are more than just a company
                    </h4>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
