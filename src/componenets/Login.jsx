import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
const MailIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

const LockIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

const HeartIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
);


const Login = () => {

    const [isLoginForm, setIsLoginForm] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);

    const handleLogin = async (e) => {
        if (user) {
            navigate('/feed')
        }
        e.preventDefault();
        try {
            const response = await axios.post(BASE_URL + "auth/login", { email: email, password: password }, {
                withCredentials: true
            })

            if (response.status == 200) {
                dispatch(addUser(response.data.data))
                navigate('/feed')
            }
        }
        catch (err) {
            setError(err?.response?.data?.message || "Something went wrong. Try again later.")
        }
    }

    const handleSignup = async (e) => {
        if (user) {
            navigate('/feed')
        }
        e.preventDefault();
        try {
            const response = await axios.post(BASE_URL + "auth/signup", { email: email, password: password, firstName: firstName, lastName: lastName }, {
                withCredentials: true
            })
            if (response.status == 201) {
                dispatch(addUser(response.data.data))
                navigate('/profile')
            }
        }
        catch (err) {
            setError(err?.response?.data?.message || "Something went wrong. Try again later.")
        }
    }

    return (

        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-sky-100 via-rose-100 to-amber-100 p-4">

            <div className="relative w-full max-w-md rounded-2xl bg-white/40 backdrop-blur-lg shadow-2xl shadow-rose-200/50 overflow-hidden border border-white/60">
                <div className="p-8 text-center">
                    <div className="inline-block bg-rose-500 p-4 rounded-full mb-4 shadow-lg">
                        <HeartIcon className="text-white h-8 w-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800">Welcome</h1>
                    <p className="text-gray-600 mt-2">Find your perfect pair-programming partner.</p>
                </div>


                <div className="px-8 pb-8">
                    <form className="space-y-6" name='login' onSubmit={isLoginForm ? handleLogin : handleSignup}>

                        {
                            !isLoginForm && <>  <div className="relative">
                                <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    type="firstName"
                                    placeholder="First Name"
                                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50/80 border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                                />
                            </div>

                                <div className="relative">
                                    <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        type="lastName"
                                        placeholder="Last Name"
                                        className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50/80 border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                                    />
                                </div></>
                        }


                        <div className="relative">
                            <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Email Address"
                                className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50/80 border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                            />
                        </div>


                        <div className="relative">
                            <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Password"
                                className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50/80 border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                            />
                        </div>

                        <p className='text-red-600'>{error}</p>
                        <button className="w-full py-3.5 rounded-lg x  font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform transition-all duration-300 ease-in-out bg-base-100">
                            {isLoginForm ? "Login" : "Sign Up"} & Find Your Match
                        </button>
                    </form>


                    <div className="text-center text-sm text-gray-600 mt-6">
                        <a href="#" className="font-medium text-rose-600 hover:text-rose-700">
                            Forgot Password?
                        </a>
                        <p className="mt-2">
                            {isLoginForm ? "Don't have an account? " : "Already have an account? "}
                            <button onClick={() => setIsLoginForm(val => !val)} className="font-medium text-rose-600 hover:text-rose-700">
                                {isLoginForm ? "Sign Up" : "Login"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;