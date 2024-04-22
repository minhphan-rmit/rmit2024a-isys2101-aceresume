import React, { ChangeEvent, FormEvent, MouseEventHandler, useRef, useState} from 'react';
import axios from 'axios';
import useGoogleAuth from './useGoogleAuth';
import {Link} from 'react-router-dom';
import getLPTheme from "../../../styles/getLPTheme";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  clearErrorStyles,
  displayErrorMessage,
  validateEmail,
  validatePassword
} from './validationTool';

interface FormData {

  user_name: string;
  password: string;
  repassword?: string;
  email: string;
}

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    user_name: '',
    password: '',
    email: '',
  });

  // Refs for form inputs to display error styles and messages
  const inputRefs = {

    user_name: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    repassword: useRef<HTMLInputElement>(null),

    email: useRef<HTMLInputElement>(null),
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const register = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    clearErrorStyles(inputRefs);
    const errors: string[] = [];



    if (!validateEmail(formData.email)) {

      errors.push("Invalid Email");
      displayErrorMessage(inputRefs, "email", "Enter a valid email");
    }

    if (!validatePassword(formData.password)) {
      errors.push("Password too short");
      displayErrorMessage(inputRefs, "password", "Password must be at least 8 characters long");
    }

    if (formData.password !== formData.repassword) {
      errors.push("Passwords do not match");
      displayErrorMessage(inputRefs, "repassword", "Password does not match");
    }

    if (errors.length > 0) {
      return;
    }

    // Placeholder for actual API call
    console.log("Form data is valid and can be submitted:", formData);
    // Here you would make your API call to register the user

    submitFormData(formData);

  };

  const submitFormData = async (formData: FormData) => {
    try {
      const { repassword, ...submissionData } = formData;
      console.log('Submission data:', submissionData);
      const response = await axios.post('http://localhost:8000/api/aceresume/register', submissionData, {
        headers: {
            'Content-Type': 'application/json'  // Explicitly stating the content type
        }
    });
      console.log('Verify your email to complete registration:', response.data);
      alert('Verify your email to complete registration');
    } catch (error) {
      console.error('Registration failed:', error.response.data.message);
      alert(`Registration failed: ${error.response.data.message || error.message}`);
    }
  };
  const {signUpWithGoogle, user, error} = useGoogleAuth();


  const LPtheme = createTheme(getLPTheme());
  const logoStyle = {
    width: "auto",
    height: "32px",
    cursor: "pointer",
  };


  return (
<>
    <ThemeProvider theme={LPtheme}>
    <div className="lg:flex w-full">
    <div className="lg:w-1/2 xl:max-w-screen-sm">
      <div
        className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12"
      >
        <div className="cursor-pointer flex items-center">
          <div>
          <img
              src={"./static/aceresume_logo.svg"}
              style={logoStyle}
              alt="Logo"
            />
          </div>
          <div className="text-2xl text-black tracking-wide ml-2 font-semibold">
            ace<span className="text-indigo-900">resume</span>
          </div>
        </div>
      </div>
      <div
        className=" px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-6 xl:px-24 xl:max-w-2xl"
      >
        <h2
          className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl xl:text-bold"
        >
          Register to be a member
        </h2>
        <div className="mt-12">
          <form id="form"  onSubmit={register}>
            <div className="flex justify-between items-center gap-4">
              <div className="w-1/2">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Email
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="email"
                  placeholder="mike@gmail.com"
                  value={formData.email} onChange={handleChange}
                  name='email'
                />
              </div>
              <div className="w-1/2">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Username
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.user_name} onChange={handleChange}
                  name='user_name'
                />
              </div>
            </div>

            <div className="mt-8">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Password
                </div>
                <div></div>
              </div>
              <input
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="password"
                placeholder="Enter your password"
                value={formData.password} onChange={handleChange}
                name='password'
              />
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  RePassword
                </div>
                <div></div>
              </div>
              <input
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="password"
                placeholder="Re-enter your password"
                value={formData.repassword} onChange={handleChange}
                name='repassword'
              />

            </div>
            <div className="mt-10">
              <button
              type="submit"

                className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg"
              >
                Sign Up
              </button>
            </div>
            <div className="mt-5">
              <button
             onClick={signUpWithGoogle}
                className="flex justify-between outline outline-gray-300 text-black p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-gray-200 shadow-lg"
              >
               <svg
                    width="20px"
                    height="20px"
                    viewBox="-0.5 0 48 48"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"

                    fill="#000000"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <title>Google-color</title>
                      <desc>Created with Sketch.</desc>
                      <defs></defs>
                      <g
                        id="Icons"
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g
                          id="Color-"
                          transform="translate(-401.000000, -860.000000)"
                        >
                          <g
                            id="Google"
                            transform="translate(401.000000, 860.000000)"
                          >
                            <path
                              d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                              id="Fill-1"
                              fill="#FBBC05"
                            ></path>
                            <path
                              d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                              id="Fill-2"
                              fill="#EB4335"
                            ></path>
                            <path
                              d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                              id="Fill-3"
                              fill="#34A853"
                            ></path>
                            <path
                              d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                              id="Fill-4"
                              fill="#4285F4"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                Sign Up with Google
                <span></span>
              </button>
            </div>
          </form>
          <div className="mt-5 text-sm font-display font-semibold text-gray-700 text-center">
  Already have an account ?{' '}
  <Link to="/sign-in" className="cursor-pointer text-indigo-600 hover:text-indigo-800">
    Sign In
  </Link>
</div>

        </div>
      </div>
    </div>
    <div
     style={{
      backgroundImage: 'url(../../static/landing-bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: '10% center'
    }}
      className="hidden lg:flex items-center justify-center flex-1 h-screen"
    ></div>
  </div>
</ThemeProvider></>
  )
}

export default SignupForm