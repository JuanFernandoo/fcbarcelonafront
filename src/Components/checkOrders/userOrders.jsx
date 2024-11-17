import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../HeaderPackage/Header';
import Pagination from '../paginationPackage/pagination'

const OrdenesUsuarios = () => {
    const [ordenes, establecerOrdenes] = useState([]);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ordenesPorPagina = 4;
    const { userId } = useParams();

    useEffect(() => {
        const ordenesIdUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`https://localhost:7199/api/Orders/Orders-User-Id?userId=${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    establecerOrdenes(response.data);
                } else {
                    establecerOrdenes([]);
                }
            } catch (error) {
                console.error('Error obteniendo compras:', error.message);
                setError('Error obteniendo compras');
            }
        };
        if (userId) {
            ordenesIdUser();
        }
    }, [userId]);

    const ultimoProducto = currentPage * ordenesPorPagina;
    const primerProducto = ultimoProducto - ordenesPorPagina;
    const currentCartItems = ordenes.slice(primerProducto, ultimoProducto);
    const totalPages = Math.ceil(ordenes.length / ordenesPorPagina);

    return (
        <div className="p-8 bg-[#181733] min-h-screen">
            <Header user={localStorage.getItem('userName')} />

            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-44">
                <h2 className="text-xl font-bold mb-4">Mis Compras</h2>
                {error && <p className="text-red-500">{error}</p>}
                {ordenes.length === 0 ? (
                    <p>No tienes compras realizadas.</p>
                ) : (
                    <table className="min-w-full table-auto bg-white border border-gray-300 rounded-lg shadow-sm">
                        <thead>
                            <tr className="bg-[#181733] text-white">
                                <th className="py-2 px-4 text-left"># Orden</th>
                                <th className="py-2 px-4 text-left">Total</th>
                                <th className="py-2 px-4 text-left">Fecha</th>
                                <th className="py-2 px-4 text-left">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCartItems.map(order => (
                                <tr key={order.orderId} className="border-t">
                                    <td className="py-2 px-4">{order.orderId}</td>
                                    <td className="py-2 px-4">${order.totalAmount}</td>
                                    <td className="py-2 px-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 text-[#181733]">En proceso</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default OrdenesUsuarios;
