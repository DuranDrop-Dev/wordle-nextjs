"use client"

import { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/Firebase";
import { useRouter } from "next/navigation";
import { createNewStats, getMongoAdmin } from "../utils/REST";
import Link from "next/link";
import Image from "next/image";
import placeholder from "@icons/profilePlaceholder.svg";
import EmailForm from "../components/EmailForm";

const LoginBox = () => {
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
                if (user) {
                    setIsAdmin(await getMongoAdmin({ userUID: user.uid }));
                    await createNewStats({userID: user.uid});
                } else {
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error('Error fetching admin data: ', error);
                setIsAdmin(false);
            }
        };

        fetchData();
    }, [user, setIsAdmin]);

    if (loading || error) return (
        <div className="flex max-w-screen-md mx-auto flex-col items-center">
            <div className="flex flex-col items-center justify-center gap-1 m-3">
                <h1>loading...</h1>
            </div>
        </div>
    );

    if (!user) return (
        <div className="flex max-w-screen-md mx-auto flex-col items-center">
            <h1 className="font-bold text-3xl m-6">Login</h1>
            <div className="flex flex-col items-center gap-5 m-3 bg-gray-950 p-8 rounded-md">
                <br />
                <label>
                    <div>
                        <input
                            checked={isChecked}
                            onChange={enableLogin}
                            type="checkbox"
                            id="myCheckbox"
                        />
                        <i>*by checking this box you agree to the{" "}
                            <Link href="/terms"><i><b>Terms & Conditions</b></i></Link>{" "}
                            and{" "}
                            <Link href="/privacy-policy"><i><b>Privacy Policy</b></i></Link>
                        </i>
                    </div>
                </label>
                <br />
                <h3 className="text-xl bold-font">Login/Sign in with Google</h3>
                <button
                    className="p-1 pl-3 pr-3 
                    bg-white text-black border-2 border-white
                    rounded-3xl font-bold  
                    hover:bg-black hover:text-white 
                    transition-all ease-in-out"
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
        <div className="max-w-screen-md mx-auto flex flex-col items-center text-center h-full bg-nav">
            <h1 className="font-bold text-3xl m-6">Sign Out</h1>
            <div className="flex flex-col items-center gap-5 m-3 bg-gray-950 p-8 rounded-md">
                {user.photoURL &&
                    <Image
                        className="rounded-full user-photo"
                        src={user.photoURL}
                        alt="userPhoto"
                        width={80}
                        height={80}
                    />
                }
                {!user.photoURL &&
                    <Image
                        className="rounded-full user-photo"
                        src={placeholder}
                        alt="userPhoto"
                        width={80}
                        height={80}
                    />
                }
                <h3 className="text-xl bold-font">
                    Welcome, {displayUserName}
                </h3>
                <button
                    className="p-1 pl-3 pr-3 
                    bg-white text-black border-2 border-white
                    rounded-3xl font-bold  
                    hover:bg-black hover:text-white 
                    transition-all ease-in-out"
                    onClick={Logout}>
                    Logout
                </button>

                <div className="flex flex-col items-center">
                    <h3 className="text-xl bold-font m-3">What Now:</h3>
                    <div className="flex flex-row items-center gap-3">
                        <button
                            className="p-1 pl-3 pr-3 
                            bg-white text-black border-2 border-white
                            rounded-3xl font-bold  
                            hover:bg-black hover:text-white 
                            transition-all ease-in-out"
                            onClick={() => router.push("/")}>
                            Home
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
};
export default LoginBox;
