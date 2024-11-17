import React, { useState, useEffect } from 'react';
import HeaderImage from '../../Assets/HeaderImage.png';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const [menu, setMenu] = useState(false);
    const [user, setUser] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const username = localStorage.getItem('username');
        const storedUserId = localStorage.getItem('userId');
        console.log('User ID from localStorage:', storedUserId);

        if (storedUserId) setUserId(storedUserId);
        if (username) {
            setUser({ username, initials: initials(username) });
        }

        const savedCartCount = localStorage.getItem('cartCount');
        setCartCount(savedCartCount ? Number(savedCartCount) : 0);

        const handleStorageChange = () => {
            const updatedCount = localStorage.getItem('cartCount') || 0;
            setCartCount(Number(updatedCount));
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const initials = (username) => {
        if (!username) return '';
        const names = username.split(' ');
        return names.map(name => name.charAt(0).toUpperCase()).join('');
    };

    const menuUser = () => setMenu(!menu);

    const ClicLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    return (
        <header className="w-full flex items-center p-4 bg-[#181733] text-white fixed top-0 z-50">
            <a href="/home">
                <img src={HeaderImage} alt="Profile" className="h-8 w-22 mr-4 cursor-pointer" />
            </a>
            <div className="flex-grow flex justify-center">
                <nav className="flex space-x-6">
                    <Link to="/products/1" className="text-xl font-SignikaNegative font-bold hover:underline hover:text-[#a41c4c] transition duration-300">Hombres</Link>
                    <Link to="/products/2" className="text-xl font-SignikaNegative font-bold hover:underline hover:text-[#a41c4c] transition duration-300">Mujeres</Link>
                    <Link to="/products/3" className="text-xl font-SignikaNegative font-bold hover:underline hover:text-[#a41c4c] transition duration-300">Niños</Link>
                </nav>
            </div>
            <div className="flex items-center ml-auto space-x-6 mr-10">
                <div className="relative flex items-center">
                    <Link
                        to={userId ? `/cart/${userId}` : '/login'}
                        className="text-2xl hover:text-[#a41c4c] transition duration-300"
                    >
                        <FontAwesomeIcon icon={faCartShopping} />
                    </Link>

                    {cartCount > 0 && (
                        <div className="absolute right-0 top-0 bg-[#a41c4c] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center -mt-2 -mr-2">
                            {cartCount}
                        </div>
                    )}
                </div>

                {user ? (
                    <div className="flex items-center relative group">
                        <div className="bg-white rounded-full flex items-center justify-between w-[190px] cursor-pointer p-2" onClick={menuUser}>
                            <div className="flex flex-col justify-center text-center">
                                <p className="text-[#a41c4c] font-bold font-SignikaNegative translate-x-6">{user.username}</p>
                            </div>
                            <div className="bg-[#181733] rounded-full h-10 w-10 flex items-center justify-center text-white text-2xl ">
                                {user.initials}
                            </div>
                        </div>
                        <div className={`absolute right-0 top-full mt-1 bg-white rounded-3xl shadow-lg transition-transform scale-0 group-hover:scale-100`}>
                            <ul className="flex flex-col list-none p-2">
                                <li className="my-1">
                                    <a
                                        href={`/ordenesUsuarios/${userId}`}
                                        className="text-[#181733] text-lg px-4 rounded-full hover:bg-[#3e3d3d] hover:bg-opacity-10"
                                    >
                                        Administrar
                                    </a>
                                    <hr className="border-t border-gray-300" />
                                    <a
                                        href="/login"
                                        onClick={ClicLogout}
                                        className="text-[#181733] text-lg px-4 rounded-full hover:bg-[#3e3d3d] hover:bg-opacity-10"
                                    >
                                        Cerrar Sesión
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : null}
            </div>
        </header>
    );
};

export default Header;
