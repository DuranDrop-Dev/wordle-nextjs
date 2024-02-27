"use client";

import "./PostWall.css";
import Image from "next/image";

interface PostWallProps {
    image: string | any,
    title?: string,
    style?: string,
    priority?: boolean
}

const PostWall = ({ image, title, style, priority }: PostWallProps) => {
    if (style === "fade") {
        return (
            <div className="post-wall-container-fade">
                <h1 className="post-wall-title">{title}</h1>
                <Image
                    className="post-wall-img-fade"
                    src={image ? image : "https://res.cloudinary.com/dykcimfhh/image/upload/v1708840720/unbroken-assets/images/missing_pv8kbr.jpg"}
                    width={500}
                    height={275}
                    alt="postWall"
                    priority={priority}
                />
            </div>
        )
    }

    if (style === "normal" || style === undefined) {
        return (
            <div className="post-wall-container">
                <h1 className="post-wall-title">{title}</h1>
                <Image
                    className="post-wall-img"
                    src={image ? image : "https://res.cloudinary.com/dykcimfhh/image/upload/v1708840720/unbroken-assets/images/missing_pv8kbr.jpg"}
                    alt="postWall"
                    width={630}
                    height={360}
                    priority={priority}
                />
            </div>
        )
    }


};

export default PostWall;