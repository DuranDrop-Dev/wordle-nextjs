import { auth } from "../utils/Firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from "next/navigation";
import Image from "next/image";
import profile from "@icons/profilePlaceholder.svg"

const NavProfilePic = () => {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    const handleLoginClick = () => {
        router.push('/login');
    }

    if (loading) return (
        <Image
            className="rounded-full w-15 h-15 m-3 cursor-pointer"
            src={profile}
            alt=""
        />)

    if (user) return (
        <>
            {!user.photoURL &&
                <Image
                    className="rounded-full w-15 h-15 m-3 cursor-pointer"
                    onClick={handleLoginClick}
                    src={profile}
                    alt="profile"
                    width={35}
                    height={35}
                />
            }
            {user.photoURL &&
                <Image
                    className="rounded-full w-15 h-15 m-3 cursor-pointer"
                    onClick={handleLoginClick}
                    src={user.photoURL}
                    alt="photoURL"
                    width={35}
                    height={35}
                />
            }
        </>
    );

    if (!user) return (
        <>
            <Image
                className="rounded-full w-15 h-15 m-3 cursor-pointer"
                onClick={handleLoginClick}
                src={profile}
                alt="profile"
                width={35}
                height={35}
            />
        </>
    );
}
export default NavProfilePic;