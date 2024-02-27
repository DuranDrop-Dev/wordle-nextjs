"use client";

import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

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
                    <h3>Login with Email</h3>
                    <button
                        className="read-more-button"
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
                            <h3>Login with Email</h3>
                            <form
                                className='myForm'
                                onSubmit={handleLoginBtn}
                            >
                                <div className='inputContainer'>
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        autoComplete="email"
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='inputContainer'>
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        autoComplete="current-password"
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button
                                    className="read-more-button"
                                    type="submit">
                                    Login
                                </button>
                                <button
                                    className='textBtn'
                                    onClick={showLoginSignup}>
                                    Create an account
                                </button>
                            </form>
                        </>
                    }

                    {!toggleLoginSignup &&
                        <>
                            <h3>Create an Account</h3>
                            <form
                                className='myForm'
                                onSubmit={handleSignUpBtn}
                            >
                                <div className='inputContainer'>
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        autoComplete="email"
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='inputContainer'>
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        autoComplete="new-password"
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button
                                    className="read-more-button"
                                    type="submit">
                                    SignUp
                                </button>
                                <button
                                    className='textBtn'
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
