"use client";

import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { createNewStats } from '../utils/REST';

interface EmailFormProps {
    isChecked: boolean;
}
const EmailForm = ({ isChecked }: EmailFormProps) => {
    // Firebase method
    const auth = getAuth();

    // Form data
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Toggle from login to signup
    const [toggleLoginSignup, setToggleLoginSignup] = useState(true);
    const showLoginSignup = () => {
        setToggleLoginSignup(!toggleLoginSignup)
    }

    // Show email Forms boolean
    const [showEmail, setShowEmail] = useState(true);
    const showEmailForms = () => {
        setShowEmail(!showEmail)
    }

    // Gather input data onChange
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    // Signup with email get form data
    const handleSignUpBtn = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Form data submitted');
        // Send data to firebase
        EmailSignUp(formData);
    };

    // Firebase method
    const EmailSignUp = (data: { email: string; password: string; }) => {
        try {
            createUserWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log("Email User Created:", user.email)
                    if (!user) return;
                    createNewStats({ userID: user.uid, email: user.email as string });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    console.log(errorCode)
                    console.log(errorMessage)
                });
        } catch (error) {
            console.log(error);
        }
    }

    //Login with email get form data
    const handleLoginBtn = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Send data to firebase
        EmailLogin(formData);
    };

    // Firebase method
    const EmailLogin = (data: { email: string; password: string; }) => {
        try {
            signInWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log("User Found:", user.email)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    console.log(errorCode)
                    console.log(errorMessage)
                });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {showEmail &&
                <>
                    <h3 className='text-xl bold-font'>Login with Email</h3>
                    <button
                        className="p-1 pl-3 pr-3 
                        bg-white text-black border border-white
                        rounded-3xl font-bold  
                        hover:bg-black hover:text-white 
                        transition-all ease-in-out disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-black"
                        disabled={!isChecked}
                        onClick={showEmailForms}>
                        Email
                    </button>
                </>
            }
            {!showEmail &&
                <>
                    {toggleLoginSignup &&
                        <>
                            <h3 className='text-xl bold-font'>Login with Email</h3>
                            <form
                                className='flex flex-col items-center gap-3 rounded-3xl p-4'
                                onSubmit={handleLoginBtn}>
                                <div className='flex flex-col items-center'>
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        className='text-white p-1 px-3 rounded-3xl bg-slate-700 text-left w-auto'
                                        autoComplete="email"
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='flex flex-col items-center'>
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        className='text-white p-1 px-3 rounded-3xl bg-slate-700 text-left w-auto'
                                        autoComplete="current-password"
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button
                                    className="p-1 pl-3 pr-3 
                                    bg-white text-black border border-white
                                    rounded-3xl font-bold  
                                    hover:bg-black hover:text-white 
                                    transition-all ease-in-out"
                                    type="submit">
                                    Login
                                </button>
                                <button
                                    className='p-1 pl-3 pr-3 text-purple-700'
                                    onClick={showLoginSignup}>
                                    Create an account
                                </button>
                            </form>
                        </>
                    }

                    {!toggleLoginSignup &&
                        <>
                            <h3 className='text-xl bold-font'>Create an Account</h3>
                            <form
                                className='flex flex-col items-center gap-3 rounded-3xl p-4 w-full'
                                onSubmit={handleSignUpBtn}
                            >
                                <div className='flex flex-col items-center'>
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        className='text-white p-1 px-3 rounded-3xl bg-slate-700 text-left w-auto'
                                        autoComplete="email"
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='flex flex-col items-center'>
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        className='text-white p-1 px-3 rounded-3xl bg-slate-700 text-left w-auto'
                                        autoComplete="new-password"
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button
                                    className="p-1 pl-3 pr-3 
                                    bg-white text-black border border-white
                                    rounded-3xl font-bold  
                                    hover:bg-black hover:text-white 
                                    transition-all ease-in-out"
                                    type="submit">
                                    SignUp
                                </button>
                                <button
                                    className='p-1 pl-3 pr-3 text-purple-700'
                                    onClick={showLoginSignup}>
                                    Back to login
                                </button>
                            </form>
                        </>
                    }
                </>
            }
        </>
    );
}

export default EmailForm;
