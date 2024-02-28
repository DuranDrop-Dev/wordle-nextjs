"use client"

import NavProfilePic from "./NavProfilePic";
import Menu from "./Menu";
import Link from "next/link";

const Navigation = () => {
    return (
        <>
            <div className="flex justify-between items-center h-15 bg-gray-950">
                <Menu />
                <Link className="text-2xl font-bold text-white" href="/">WORDLE</Link>
                <NavProfilePic />
            </div>
        </>
    );
}
export default Navigation;