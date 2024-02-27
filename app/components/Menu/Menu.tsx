import { useState, useEffect } from 'react';
import { getMongoAdmin } from '../../utils/REST';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../utils/Firebase';
import { useRouter } from 'next/navigation';
import './Menu.css';

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [user] = useAuthState(auth);
    const router = useRouter();

    const handleClick = () => {
        setIsOpen(!isOpen);
    }
    const handleHomeClick = () => {
        setIsOpen(!isOpen);
        router.push('/');
    }
    const handleDashClick = () => {
        setIsOpen(!isOpen);
        router.push('/dashboard');
    }
    const handleContactClick = () => {
        setIsOpen(!isOpen);
        router.push('/contact');
    }
    const handleAboutClick = () => {
        setIsOpen(!isOpen);
        router.push('/about');
    }

    const handleLoginClick = () => {
        setIsOpen(!isOpen);
        router.push('/login');
    }

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;

            try {
                const adminData = await getMongoAdmin({ userUID: user.uid });

                if (!adminData) {
                    setIsAdmin(false);
                    throw new Error('Failed to fetch admin data');
                }

                setIsAdmin(adminData);
            } catch (error) {
                console.error('Error fetching admin data: ', error);
                setIsAdmin(false);
            }
        };

        fetchData();
    }, [user, setIsAdmin]);

    return (
        <>
            <div className="menuBtn" onClick={handleClick}>
                <div className={isOpen ? 'menuBar1Opened' : 'menuBar1'} />
                <div className={isOpen ? 'menuBar2Opened' : 'menuBar2'} />
                <div className={isOpen ? 'menuBar3Opened' : 'menuBar3'} />
            </div>
            <div className={isOpen ? 'menuBoard' : 'close'}>
                <ul>
                    <li className={isOpen ? 'separator' : 'separator-close'} />
                </ul>
                <ul>
                    <li
                        onClick={handleHomeClick}
                        className={isOpen ? 'liItem' : 'closeItem'}>
                        Home
                    </li>
                </ul>
                {isAdmin && (
                    <ul>
                        <li
                            onClick={handleDashClick}
                            className={isOpen ? 'liItem' : 'closeItem'}>
                            DashBoard
                        </li>
                    </ul>
                )}
                <ul>
                    <li
                        onClick={handleContactClick}
                        className={isOpen ? 'liItem' : 'closeItem'}>
                        Contact
                    </li>
                </ul>
                <ul>
                    <li
                        onClick={handleAboutClick}
                        className={isOpen ? 'liItem' : 'closeItem'}>
                        About
                    </li>
                </ul>
                <ul>
                    <li
                        onClick={handleLoginClick}
                        className={isOpen ? 'liItem' : 'closeItem'}>
                        Login
                    </li>
                </ul>
                <ul>
                    <li
                        className={isOpen ? 'emptySpace' : 'close'}
                        onClick={handleClick}>
                    </li>
                </ul>
            </div>
        </>
    )
}
export default Menu;