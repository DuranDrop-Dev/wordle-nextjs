import Image from "next/image";
import LoginBox from "../components/LoginBox";

const Login = () => {
    return (
        <div className="flex flex-col bg-gradient-to-b from-black to-gray-950">
            <Image
                className="w-full object-cover max-w-3xl mx-auto"
                src="https://res.cloudinary.com/dykcimfhh/image/upload/v1709005064/unbroken-assets/images/dcpjw3xzxeackkuhpxl0.jpg"
                width={500}
                height={275}
                alt="postWall"
                priority
            />
            <LoginBox />
        </div>
    )
};
export default Login;
