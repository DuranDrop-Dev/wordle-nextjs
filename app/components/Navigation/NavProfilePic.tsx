import { auth } from "../../utils/Firebase";
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
            className="navProfile"
            src={profile}
            alt=""
        />)

    if (user) return (
        <>
            {!user.photoURL &&
                <Image
                    className="navProfile"
                    onClick={handleLoginClick}
                    src={profile}
                    alt="profile"
                    width={35}
                    height={35}
                />
            }
            {user.photoURL &&
                <Image
                    className="navProfile"
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
                className="navProfile"
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