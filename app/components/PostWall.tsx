import Image from "next/image";

interface PostWallProps {
    image: string | any,
    title?: string,
    style?: string,
    priority?: boolean
}

const PostWall = ({ image, title, priority }: PostWallProps) => {
    return (
        <div>
            <h1>{title}</h1>
            <Image
                className="w-full object-cover"
                src={image ? image : "https://res.cloudinary.com/dykcimfhh/image/upload/v1708840720/unbroken-assets/images/missing_pv8kbr.jpg"}
                width={500}
                height={275}
                alt="postWall"
                priority={priority}
            />
        </div>
    )
}

export default PostWall;