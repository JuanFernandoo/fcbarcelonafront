import React, { useState} from 'react';
import Header from '../HeaderPackage/Header'
import fcBarcelonaVector from '../../Assets/fcBarcelonaVector.png';

const successPage = () => {
    return (
        <div className="p-8 bg-[#181733] min-h-screen">
            <Header user={localStorage.getItem('userName')} />
            <div className="text-center">
                <h1 className="text-6xl font-black text-gray-200 mt-48">Compra realizada exitosamente</h1>
                <img src={fcBarcelonaVector} alt="Profile" className="h-[100px] w-[100px] mt-10 mb-10 mx-auto" />
                <p className="mt-4 text-gray-500 ">Gracias por su compra.</p>

                <a
                    href="/home"
                    className="mt-6 inline-block  px-5 py-3  text-white bg-gradient-to-r from-[#a41c4c] via-[#a41c4c] to-[#0454a4] rounded-lg text-xl font-semibold hover:bg-gradient-to-l focus:outline-none "
                >
                    Volver al incio
                </a>
            </div>
        </div>
    );
};

export default successPage;