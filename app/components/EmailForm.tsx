"use client";

import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { createNewStats } from '../utils/REST';

interface EmailFormProps {
    isChecked: boolean;
    onAccountMessage: (message: string | null) => void;
}
const EmailForm = ({ isChecked, onAccountMessage }: EmailFormProps) => {
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
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    console.log("Email User Created:", user.email)
                    if (!user) return;
                    const message = await createNewStats({ userID: user.uid, email: user.email as string });
                    onAccountMessage(message);
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
        <div className="flex flex-col items-center gap-4">
            {showEmail &&
                <>
                    <h3 className='text-sm font-bold uppercase tracking-[0.24em] text-green-300'>Email</h3>
                    <button
                        className="rounded-md border border-white bg-white px-7 py-3 text-base font-black text-black transition-all ease-in-out hover:-translate-y-0.5 hover:bg-black hover:text-white disabled:opacity-30 disabled:hover:translate-y-0 disabled:hover:bg-white disabled:hover:text-black"
                        disabled={!isChecked}
                        onClick={showEmailForms}>
                        Continue with Email
                    </button>
                </>
            }
            {!showEmail &&
                <>
                    {toggleLoginSignup &&
                        <>
                            <h3 className='text-sm font-bold uppercase tracking-[0.24em] text-green-300'>Email login</h3>
                            <form
                                className='flex w-full flex-col items-stretch gap-4'
                                onSubmit={handleLoginBtn}>
                                <div className='flex flex-col gap-2'>
                                    <label className="text-sm font-bold text-gray-300" htmlFor="email">Email</label>
                                    <input
                                        className='w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-3 text-left text-white outline-none transition-all focus:border-green-300'
                                        autoComplete="email"
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className="text-sm font-bold text-gray-300" htmlFor="password">Password</label>
                                    <input
                                        className='w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-3 text-left text-white outline-none transition-all focus:border-green-300'
                                        autoComplete="current-password"
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button
                                    className="rounded-md border border-green-300 bg-green-400 px-7 py-3 text-base font-black text-black shadow-[0_10px_30px_rgba(74,222,128,0.18)] transition-all ease-in-out hover:-translate-y-0.5 hover:bg-white"
                                    type="submit">
                                    Login
                                </button>
                                <button
                                    className='px-3 py-1 text-sm font-bold text-green-300 transition-colors hover:text-white'
                                    type="button"
                                    onClick={showLoginSignup}>
                                    Create an account
                                </button>
                            </form>
                        </>
                    }

                    {!toggleLoginSignup &&
                        <>
                            <h3 className='text-sm font-bold uppercase tracking-[0.24em] text-green-300'>Create account</h3>
                            <form
                                className='flex w-full flex-col items-stretch gap-4'
                                onSubmit={handleSignUpBtn}
                            >
                                <div className='flex flex-col gap-2'>
                                    <label className="text-sm font-bold text-gray-300" htmlFor="email">Email</label>
                                    <input
                                        className='w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-3 text-left text-white outline-none transition-all focus:border-green-300'
                                        autoComplete="email"
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className="text-sm font-bold text-gray-300" htmlFor="password">Password</label>
                                    <input
                                        className='w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-3 text-left text-white outline-none transition-all focus:border-green-300'
                                        autoComplete="new-password"
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button
                                    className="rounded-md border border-green-300 bg-green-400 px-7 py-3 text-base font-black text-black shadow-[0_10px_30px_rgba(74,222,128,0.18)] transition-all ease-in-out hover:-translate-y-0.5 hover:bg-white"
                                    type="submit">
                                    Sign Up
                                </button>
                                <button
                                    className='px-3 py-1 text-sm font-bold text-green-300 transition-colors hover:text-white'
                                    type="button"
                                    onClick={showLoginSignup}>
                                    Back to login
                                </button>
                            </form>
                        </>
                    }
                </>
            }
        </div>
    );
}

export default EmailForm;
