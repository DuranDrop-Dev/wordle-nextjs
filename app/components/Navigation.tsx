"use client"

import NavProfilePic from "./NavProfilePic";
import Menu from "./Menu";
import Link from "next/link";

const Navigation = () => {
    return (
        <>
            <div className="flex justify-between items-center h-15 bg-gray-950">
                <Menu />
                <Link href="/">WORDLE</Link>
                <NavProfilePic />
            </div>
        </>
    );
}
export default Navigation;