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
    const [initialRender, setInitialRender] = useState(true);
    const [displayUserName, setDisplayUserName] = useState("Guest");
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [accountMessage, setAccountMessage] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();
    const googleProvider = new GoogleAuthProvider();

    const showAccountMessage = (message: string | null) => {
        if (!message) return;

        setAccountMessage(message);
        window.setTimeout(() => {
            setAccountMessage("");
        }, 3500);
    };

    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log("GoogleLogin Result Received");
            if (!result.user?.email) return;
            const message = await createNewStats({ userID: result.user.uid, email: result.user.email });
            showAccountMessage(message);
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
        if (!initialRender) {
            return;
        }
        const fetchData = async () => {
            if (!user) return;

            try {
                if (user) {
                    setIsAdmin(await getMongoAdmin({ userUID: user.uid }));
                } else {
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error('Error fetching admin data: ', error);
                setIsAdmin(false);
            }
        };

        fetchData();
        setInitialRender(false);
    }, [user, setIsAdmin, initialRender]);

    if (loading || error) return (
        <div className="flex min-h-[70vh] items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-4">
                <div
                    className="h-8 w-8 animate-spin rounded-full border-4 border-gray-600 border-t-white"
                    aria-label="Loading login"
                    role="status"
                />
                <h1 className="text-sm font-bold uppercase tracking-[0.24em] text-green-300">Loading</h1>
            </div>
        </div>
    );

    if (!user) return (
        <div className="mx-auto grid min-h-[80vh] w-full max-w-5xl items-center gap-10 py-10 md:grid-cols-[1fr_380px] md:py-16">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-green-300">Player access</p>
                <h1 className="max-w-2xl text-5xl font-black leading-tight sm:text-6xl">Login</h1>
                <p className="mt-5 max-w-xl text-base leading-7 text-gray-300 sm:text-lg">
                    Sign in to save your wins and losses between rounds.
                </p>

                <div className="mt-8 grid grid-cols-5 gap-2" aria-hidden="true">
                    {["S", "A", "V", "E", "D"].map((letter, index) => (
                        <div
                            className={`flex h-12 w-12 items-center justify-center rounded-md border text-lg font-black shadow-lg sm:h-14 sm:w-14 ${
                                index === 0 || index === 4
                                    ? "border-green-400 bg-green-500 text-white shadow-green-950/40"
                                    : index === 2
                                        ? "border-yellow-300 bg-yellow-400 text-black shadow-yellow-950/30"
                                        : "border-gray-600 bg-gray-900 text-white shadow-black/30"
                            }`}
                            key={`login-tile-${letter}`}
                        >
                            {letter}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-6 rounded-md border-2 border-slate-900 bg-gray-950 p-6 shadow-2xl shadow-black/30">
                {accountMessage &&
                    <div className="animate-pulse rounded-md border border-green-300 bg-green-400/10 px-4 py-3 text-center text-sm font-black uppercase tracking-[0.18em] text-green-300">
                        {accountMessage}
                    </div>
                }

                <label className="flex items-start gap-3 text-sm leading-6 text-gray-300">
                    <input
                        checked={isChecked}
                        onChange={enableLogin}
                        type="checkbox"
                        id="myCheckbox"
                        className="mt-1 h-4 w-4 accent-green-400"
                    />
                    <span>
                        I agree to the{" "}
                        <Link className="font-bold text-green-300 hover:text-white" href="/terms">Terms & Conditions</Link>{" "}
                        and{" "}
                        <Link className="font-bold text-green-300 hover:text-white" href="/privacy-policy">Privacy Policy</Link>.
                    </span>
                </label>

                {!isChecked &&
                    <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                        Check the box to enable login
                    </p>
                }

                <div className="flex flex-col items-center gap-4 border-t border-gray-800 pt-6">
                    <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-green-300">Google</h3>
                    <button
                        className="rounded-md border border-green-300 bg-green-400 px-7 py-3 text-base font-black text-black shadow-[0_10px_30px_rgba(74,222,128,0.18)] transition-all ease-in-out hover:-translate-y-0.5 hover:bg-white disabled:opacity-30 disabled:hover:translate-y-0 disabled:hover:bg-green-400"
                        disabled={!isChecked}
                        id="loginBtn"
                        onClick={GoogleLogin}
                    >
                        Continue with Google
                    </button>
                </div>

                <div className="border-t border-gray-800 pt-6">
                    <EmailForm isChecked={isChecked} onAccountMessage={showAccountMessage} />
                </div>
            </div>
        </div>
    )

    if (user) return (
        <div className="mx-auto flex min-h-[80vh] max-w-screen-md flex-col items-center justify-center text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-green-300">Signed in</p>
            <div className="flex flex-col items-center gap-5 rounded-md border-2 border-slate-900 bg-gray-950 p-8 shadow-2xl shadow-black/30">
                {user.photoURL &&
                    <Image
                        className="rounded-full border-2 border-green-300 user-photo"
                        src={user.photoURL}
                        alt="userPhoto"
                        width={80}
                        height={80}
                    />
                }
                {!user.photoURL &&
                    <Image
                        className="rounded-full border-2 border-green-300 user-photo"
                        src={placeholder}
                        alt="userPhoto"
                        width={80}
                        height={80}
                    />
                }
                <h1 className="text-3xl font-black">
                    Welcome, {displayUserName}
                </h1>
                <button
                    className="rounded-md border border-green-300 bg-green-400 px-7 py-3 text-base font-black text-black shadow-[0_10px_30px_rgba(74,222,128,0.18)] transition-all ease-in-out hover:-translate-y-0.5 hover:bg-white"
                    onClick={Logout}>
                    Logout
                </button>

                <div className="flex flex-col items-center">
                    <h3 className="m-3 text-sm font-bold uppercase tracking-[0.24em] text-gray-300">What Now</h3>
                    <button
                        className="rounded-md border border-white bg-white px-6 py-2 font-black text-black transition-all ease-in-out hover:-translate-y-0.5 hover:bg-black hover:text-white"
                        onClick={() => router.push("/")}>
                        Home
                    </button>
                </div>

            </div>
        </div>
    )
};
export default LoginBox;
