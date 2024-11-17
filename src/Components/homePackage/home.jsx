import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../HeaderPackage/Header'
import { useNavigate } from 'react-router-dom';

const CategoriesList = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const categoryImages = {
        1: 'https://www.fcbarcelona.com/photo-resources/2024/10/26/45249bed-342e-441b-a2b6-0fc6907d2747/mini__GP11828.jpg?width=1200&height=750',
        2: 'https://www.fcbarcelona.com/photo-resources/2024/11/02/587f3721-9448-4da8-8a0b-852e3fd6deb6/025-8C4A4511.jpg?width=1200&height=750',
        3: 'https://www.fcbarcelona.com/photo-resources/2024/10/21/68fa24d7-24fc-4686-acc5-8ea4e874c515/CONEIX-LA-BAR-A-ESCOLA.jpg?width=864&height=676'
    }

    useEffect(() => {
        const getAllCategories = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('Token no encontrado.');
                const response = await axios.get('https://localhost:7199/api/Categories/full-categories', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.status === 204 || (response.data && response.data.length === 0)) {
                    setCategories([]);
                } else {
                    setCategories(response.data);
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.warn('No se encontraron categorías.');
                    setCategories([]);
                } else {
                    setError('Error obteniendo categorías');
                    console.error('Error:', error.response ? error.response.data : error.message);
                }
            }
        };

        getAllCategories();
    }, []);

    return (
        <div className="p-8 bg-[#181733] min-h-screen">
            <Header user={localStorage.getItem('userName')} />
            {error && <p className="text-center text-red-500 mb-4">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-24">
                {categories.length === 0 ? (
                    <p className="text-center text-lg text-gray-500">No hay categorías disponibles.</p>
                ) : (
                    categories.map((category) => {
                        const imageUrl = categoryImages[category.categoryId];

                        return (
                            <div
                                key={category.categoryId}
                                className="relative h-[500px] w-full rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
                                onClick={() => navigate(`/products/${category.categoryId}`)}  
                            >
                                <img
                                    src={imageUrl}
                                    alt={category.categoryName}
                                    className="h-full w-auto object-cover object-top transition-transform duration-300"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                    <h3 className="text-3xl font-semibold text-white font-paytone">
                                        {category.categoryName}
                                    </h3>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default CategoriesList;
