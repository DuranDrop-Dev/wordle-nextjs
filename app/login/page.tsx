"use client"

import { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/Firebase";
import { useRouter } from "next/navigation";
import { getMongoAdmin } from "../utils/REST";
import Link from "next/link";
import Image from "next/image";
import placeholder from "@icons/profilePlaceholder.svg";
import PostWall from "../components/PostWall/PostWall";
import EmailForm from "../components/EmailForm/EmailForm";

import "./loginStyle.css";

const Login = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [displayUserName, setDisplayUserName] = useState("Guest");
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();
    const googleProvider = new GoogleAuthProvider();

    const GoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            console.log("GoogleLogin Result Received");
        } catch (error) {
            console.log("GoogleLogin Error:", error);
        }
    };

    const Logout = () => {
        setIsAdmin(false);
        auth.signOut();
    };

    const enableLogin = () => {
        setIsChecked(!isChecked);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Get Display Name
    useEffect(() => {
        try {
            const userDisplayName = () => {
                if (user) {
                    return user.displayName ?? user.email ?? "Guest";
                } else {
                    return "Guest";
                }
            };
            // Set Result
            setDisplayUserName(userDisplayName());
        } catch (error) {
            console.log("DisplayName Error:", error);
        }
    }, [user]);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;

            try {
                const adminData = await getMongoAdmin({ userUID: user.uid });

                if (!adminData) {
                    setIsAdmin(false);
                    throw new Error('Failed to fetch admin data');
                }

                setIsAdmin(adminData);
            } catch (error) {
                console.error('Error fetching admin data: ', error);
                setIsAdmin(false);
            }
        };

        fetchData();
    }, [user, setIsAdmin]);

    if (loading || error) return (
        <div className="login-page">
            <div className="login-container">
                <PostWall image="https://res.cloudinary.com/dykcimfhh/image/upload/v1708840723/unbroken-assets/images/login_dcmzfg.jpg" title="" style="fade" />
                <h1>loading...</h1>
            </div>
        </div>
    );

    if (!user) return (
        <div className="login-container">
            <PostWall image="https://res.cloudinary.com/dykcimfhh/image/upload/v1708840723/unbroken-assets/images/login_dcmzfg.jpg" title="" style="fade" />
            <h1>Login</h1>
            <div className="login-card">
                <br />
                <label className="labelContainer">
                    <div>
                        <input
                            checked={isChecked}
                            onChange={enableLogin}
                            type="checkbox"
                            id="myCheckbox"
                        />
                        <i>*by checking this box you agree to the{" "}
                            <Link href="/terms">
                                <i><b>Terms & Conditions</b></i>
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy-policy">
                                <i><b>Privacy Policy</b></i>
                            </Link>
                        </i>
                    </div>
                </label>
                <br />
                <h3>Login/Sign in with Google</h3>
                <button
                    className="read-more-button"
                    disabled={!isChecked}
                    id="loginBtn"
                    onClick={GoogleLogin}
                >
                    Google
                </button>
                <br />
                <EmailForm isChecked={isChecked} />
            </div>
        </div>
    )

    if (user) return (
        <div className="login-container">
            <PostWall image="https://res.cloudinary.com/dykcimfhh/image/upload/v1708840723/unbroken-assets/images/login_dcmzfg.jpg" title="" style="fade" />
            <h1>Sign Out</h1>
            <div className="login-card">
                {user.photoURL &&
                    <Image
                        className="user-photo"
                        src={user.photoURL}
                        alt="userPhoto"
                        width={80}
                        height={80}
                    />
                }
                {!user.photoURL &&
                    <Image
                        className="user-photo"
                        src={placeholder}
                        alt="userPhoto"
                        width={80}
                        height={80}
                    />
                }
                <h3>Welcome, {displayUserName}</h3>
                <button
                    className="read-more-button"
                    onClick={Logout}>
                    Logout
                </button>

                <div className="user-logged-buttons">
                    <h3>What Now:</h3>
                    <div style={{ display: "flex" }}>
                        <button
                            className="read-more-button"
                            onClick={() => router.push("/")}>
                            Home
                        </button>
                        {isAdmin &&
                            <button
                                className="read-more-button"
                                onClick={() => router.push("/dashboard")}>
                                Dashboard
                            </button>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
};
export default Login;
