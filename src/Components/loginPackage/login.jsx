import React, { useState } from 'react';
import axios from 'axios';
import fcBarcelonaVector from '../../Assets/fcBarcelonaVector.png';
import { useNavigate, Link } from 'react-router-dom';
import Notification from '../notificationPackage/notification';

const Login = () => {
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const [notificationType, setNotificationType] = useState('success');
    const navigate = useNavigate();

    const HandleLogin = async (e) => {
        e.preventDefault();

        if (!Username || !Password) {
            setNotificationMessage('Por favor, ingresa ambos campos (Usuario y Contraseña).');
            setIsNotificationVisible(true);
            setNotificationType('error');
            return;
        }

        try {
            const response = await axios.post('https://localhost:7199/api/Login/Login', {
                Username,
                Password,
            });

            if (response.status === 200 && response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('userId', response.data.userId); 

                setNotificationMessage('El inicio de sesión fue exitoso');
                setIsNotificationVisible(true);
                setNotificationType('success');
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else {
                throw new Error('Respuesta inesperada del servidor');
            }
        } catch (err) {
            if (err.response) {
                const errorMessage = err.response.data;
                if (err.response.status === 401) {
                    setNotificationMessage('Usuario y/o contraseña incorrecta');
                } else {
                    setNotificationMessage('Error desconocido. Intente nuevamente.');
                }
            } else if (err.request) {
                setNotificationMessage('Error al iniciar sesión. No se recibió respuesta del servidor.');
            } else {
                setNotificationMessage('Hubo un problema al procesar la solicitud.');
            }

            setIsNotificationVisible(true);
            setNotificationType('error');
        }
    };

    const onCloseNotification = () => {
        setIsNotificationVisible(false);
    };

    return (
        <div className="bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStFhNQJNyfCCcrkQvzHKP5WEQ_5G23SRVbrg&s')] bg-cover flex flex-col md:flex-row items-center justify-center h-screen">
            <div className="flex-grow max-w-md md:max-w-lg bg-white rounded-lg shadow-lg text-center p-9 mt-10 md:mt-0 relative">
                <h1 className="text-[#0454a4] text-7xl mb-4 font-PalanquinDark font-bold">FC Barcelona</h1>
                <h2 className="text-[#a41c4c] text-3xl mb-4 font-SignikaNegative font-bold">Iniciar Sesión</h2>
                <img src={fcBarcelonaVector} alt="Profile" className="h-[80px] w-[80px] mt-2 mb-4 mx-auto" />
                <form onSubmit={HandleLogin} className="w-full">
                    <div className="mb-5 text-start">
                        <label className="block mb-1 text-[#36454F] font-semibold text-s">Usuario:</label>
                        <input
                            type="text"
                            value={Username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full p-2 mb-3 text-[16px] border border-[#36454F] rounded focus:outline-none focus:ring-1 focus:ring-[#0454a4] transition-all duration-300"
                        />
                    </div>

                    <div className="mb-5 text-start relative">
                        <label className="block mb-1 text-[#36454F] font-semibold text-s">Contraseña:</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-2 mb-3 text-[16px] border border-[#36454F] rounded focus:outline-none focus:ring-1 focus:ring-[#0454a4] transition-all duration-300 pr-10" 
                        />
                        <div
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 translate-y-[-183%] ml-96 cursor-pointer"
                        >
                            {showPassword ? (
                                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            d="M3 14C3 9.02944 7.02944 5 12 5C16.9706 5 21 9.02944 21 14M17 14C17 16.7614 14.7614 19 12 19C9.23858 19 7 16.7614 7 14C7 11.2386 9.23858 9 12 9C14.7614 9 17 11.2386 17 14Z"
                                            stroke="#0454a4"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </g>
                                </svg>
                            ) : (
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24px"
                                    height="24px"
                                >
                                    <path
                                        d="M2 2L22 22"
                                        stroke="#a41c4c"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335"
                                        stroke="#a41c4c"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818"
                                        stroke="#a41c4c"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full text-white bg-gradient-to-r from-[#a41c4c] via-[#a41c4c] to-[#0454a4] hover:bg-gradient-to-l focus:outline-none font-medium rounded-lg text-xl py-2.5 text-center mb-7"
                    >
                        Iniciar sesión
                    </button>
                </form>
                <p className="text-center text-m">
                    ¿No tienes una cuenta? <Link to="/signup" className="text-[#0454a4] font-bold mt-2">Regístrate aquí</Link>
                </p>
            </div>

            <Notification
                message={notificationMessage}
                isVisible={isNotificationVisible}
                onClose={onCloseNotification}
                type={notificationType}
            />
        </div>
    );
}

export default Login;