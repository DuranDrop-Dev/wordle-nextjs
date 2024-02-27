"use client"

import NavProfilePic from "./NavProfilePic";
import Menu from "../../components/Menu/Menu";
import logo from "@icons/white_icon.svg";
import Link from "next/link";
import Image from "next/image";
import "./Navigation.css";

const Navigation = () => {
    return (
        <>
            <div className="nav-container">
                <Menu />
                <div className="titleContainer">
                    <Link href="/"><div className="navTitle">UnBrokenMind</div></Link>
                    <Image className="navLogo" src={logo} alt="logo" />
                </div>
                <NavProfilePic />
            </div>
        </>
    );
}
export default Navigation;