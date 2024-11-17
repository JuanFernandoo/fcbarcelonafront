import React, { useState } from "react";
import axios from "axios";
import fcBarcelonaVector from '../../Assets/fcBarcelonaVector.png'
import vectorCiudad from '../../Assets/vectorCiudad.png'
import vectorMessi from '../../Assets/vectorMessi.png'
import gaviVector from '../../Assets/gaviVector.png'
import boixosVector from '../../Assets/boixosVector.png'
import Notification from "../notificationPackage/notification";
import { Link, useNavigate } from 'react-router-dom';

const SignUp =() => {
    const [Email, setEmail] = useState('')
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const [notificationType, setNotificationType] = useState('success');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const HandleSignUp = async (e) => {
        e.preventDefault();  
        try{
            const response = await axios.post('https://localhost:7199/api/SignUp/SignUp' , {
                Email,
                Username,
                Password,
            });
            if (response.status === 200){
                setNotificationMessage(`El registro fue exitoso`);
                setIsNotificationVisible(true);
                setNotificationType('success');
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                setNotificationMessage(`Error en el registro`);
                setIsNotificationVisible(true);
                setNotificationType('error');
            }
        } catch (err) {
            if (err.response) { 
                const errorMessage = err.response.data;
                if (errorMessage.includes('El email esta en uso')) {
                    setNotificationMessage('El email esta en uso');
                } else if (errorMessage.includes('El nombre de usuario esta en uso')) {
                    setNotificationMessage('El nombre de usuario esta en uso');
                } else if (err.request) {
                    setNotificationMessage('Error al registrarse. No se recibió respuesta del servidor.');
                }
                setIsNotificationVisible(true);
                setNotificationType('error');
            }
        }
    }

    const onCloseNotification = () => {
        setIsNotificationVisible(false);
    }

    return (
        <div className="bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStFhNQJNyfCCcrkQvzHKP5WEQ_5G23SRVbrg&s')]  bg-cover relative min-h-screen flex">
            <img src={vectorCiudad} alt="Side" className="absolute  left-20 h-[350px] mt-80" />
            <img src={vectorMessi} alt="Side" className="absolute left-16 h-[400px]" />
            <img src={fcBarcelonaVector} alt="Side" className="absolute left-96 h-[200px] mt-44" />
            <img src={gaviVector} alt="Side" className="absolute left-96 translate-x-36 h-[400px] mt-60" />
            <img src={boixosVector} alt="Side" className="absolute left-96 translate-x-56 h-[300px]" />
            <div className="flex-1 flex items-center justify-end">
                <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-10 flex flex-col items-center z-10 -translate-x-10">
                    <h1 className="text-[#0454a4] text-6xl mb-3 font-PalanquinDark font-bold text-center">FC Barcelona</h1>
                    <h2 className="text-[#a41c4c] text-2xl mb-4 font-SignikaNegative font-bold text-center">Registro</h2>
                    <form onSubmit={HandleSignUp} className="w-full">
                        <div className="mb-6">
                            <label className="block mb-1 text-[#36454F] font-semibold">Email:</label>
                            <input
                                type="email"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-2 mb-3 text-[16px] border border-[#36454F] rounded focus:outline-none focus:ring-1 focus:ring-[#0454a4] transition-all duration-300"
                            />

                            <label className="block mb-1 text-[#36454F] font-semibold">Usuario:</label>
                            <input
                                type="text"
                                value={Username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full p-2 mb-3 text-[16px] border border-[#36454F] rounded focus:outline-none focus:ring-1 focus:ring-[#0454a4] transition-all duration-300"
                            />

                            <div className="relative block mb-1 text-[#36454F] font-semibold">
                                <label className="block mb-1 text-[#36454F] font-semibold">Contraseña:</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={Password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full p-2 mb-3 text-[16px] border border-[#36454F] rounded focus:outline-none focus:ring-1 focus:ring-[#0454a4] transition-all duration-300"
                                />
                                <div
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-6 translate-y-[-45px] cursor-pointer" >
                                    <div onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? (
                                            <svg
                                                width="24px"
                                                height="24px"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
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
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-gradient-to-r from-[#a41c4c] via-[#a41c4c] to-[#0454a4] hover:bg-gradient-to-l focus:outline-none font-medium rounded-lg text-xl py-2.5 text-center mb-7"
                        >
                            Registrarse
                        </button>
                    </form>
                    <p className="text-center text-m">
                        ¿Ya tienes una cuenta? <Link to="/login" className="text-[#0454a4] font-bold mt-2">Inicia sesión aquí</Link>
                    </p>

                </div>
            </div>
            <Notification
                message={notificationMessage}
                isVisible={isNotificationVisible}
                onClose={onCloseNotification}
                type={notificationType}
            />
        </div>
    );

};

export default SignUp;

