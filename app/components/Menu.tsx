"use client"

import { useState, useEffect } from 'react';
import { getMongoAdmin } from '../utils/REST';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/Firebase';
import { useRouter } from 'next/navigation';

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
            <button
                id="toggleButton"
                className="focus:outline-none w-14 h-14 relative"
                onClick={handleClick}
            >
                <div className="flex flex-col items-center justify-center p-3.5 w-full h-full">
                    <div
                        className={`w-6 h-1 rounded-sm bg-white mt-0 left-0 transition-transform duration-300 ${isOpen ? 'w-6 rotate-45 absolute' : ''
                            }`}
                        style={{ top: 26, left: 16 }}
                    ></div>
                    <div
                        className={`w-6 h-1 rounded-sm bg-white mt-1 left-0 transition-transform duration-300 ${isOpen ? 'opacity-0' : ''
                            }`}
                        style={{ top: '50%' }}
                    ></div>
                    <div
                        className={`w-6 h-1 rounded-sm bg-white mt-1 left-0 transition-transform duration-300 ${isOpen ? 'w-6 -rotate-45 absolute' : ''
                            }`}
                        style={{ top: 22, bottom: 0, left: 16 }}
                    ></div>
                </div>
            </button>

            <div className={`absolute flex flex-col h-0 top-14 w-full z-50 transition-transform transform ${isOpen ? 'scale-y-100' : 'scale-y-0'}`}>
                <ul>
                    <li className='w-full border-b border-gray-800' />
                </ul>
                <ul>
                    <li
                        onClick={handleHomeClick}
                        className='w-full py-2 px-0 font-bold text-white bg-gray-950 border-b border-gray-800 pl-2 hover: cursor-pointer'>
                        Home
                    </li>
                </ul>
                
                <ul>
                    <li
                        onClick={handleLoginClick}
                        className='w-full py-2 px-0 font-bold text-white bg-gray-950 border-b border-gray-800 pl-2 hover: cursor-pointer'>
                        Login
                    </li>
                </ul>
                <ul>
                    <li
                        className='w-full h-screen py-2 px-0 font-bold text-white bg-nav'
                        onClick={handleClick}>
                    </li>
                </ul>
            </div>
        </>
    )
}
export default Menu;