import React, { useEffect, useState } from 'react';
import Header from '../HeaderPackage/Header';
import Pagination from '../paginationPackage/pagination'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const productosPorPagina = 4;

    const productImages = {
        1: 'https://store.fcbarcelona.com/cdn/shop/files/25100BC_1.jpg?v=1728910801&width=1946',
        2: 'https://www.barcelonafc.es/wp-content/uploads/nueva-equipaci%C3%B3n/equipaciones/camiseta-visitante-ucl-2425-fc-barcelona-para-hombre.webp',
        3: 'https://store.fcbarcelona.com/cdn/shop/files/BLMP740012_1.jpg?v=1728392864',
        4: 'https://store.fcbarcelona.com/cdn/shop/files/FQ7793-010_1.jpg?v=1722943269',
        5: 'https://store.fcbarcelona.com/cdn/shop/files/25100BMCW_1_82f0fea3-95ff-4567-a987-011b0ba149d4.jpg?v=1730382221&width=1946',
        6: 'https://store.fcbarcelona.com/cdn/shop/files/25200CWF_1.jpg?v=1725430922&width=1946',
        7: 'https://store.fcbarcelona.com/cdn/shop/files/BLMP000884010_1_282d4ceb-e932-4735-bc2c-a5fb1e72d798.jpg?v=1720778206',
        8: 'https://store.fcbarcelona.com/cdn/shop/files/FN8331-418_1.jpg?v=1723110422',
        9: 'https://store.fcbarcelona.com/cdn/shop/files/FN9233-456_1.jpg?v=1721278026&width=1946',
        10: 'https://store.fcbarcelona.com/cdn/shop/files/FN9232-011_1.jpg?v=1725425554',
        11: 'https://store.fcbarcelona.com/cdn/shop/files/FQ3469-010_1.jpg?v=1722943231',
        12: 'https://store.fcbarcelona.com/cdn/shop/files/BLMP000884016_5.jpg?v=1718962706',
    };

    useEffect(() => {
        const fetchCartItems = async () => {
            const userId = localStorage.getItem('userId');
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`https://localhost:7199/api/CartItems/cart-items-user?userId=${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });


                if (response.status === 200) {
                    if (response.data.length === 0) {
                        setCartItems([]);
                        setTotalCartPrice(0);
                    } else {
                        const groupedItems = response.data.reduce((acc, item) => {
                            const existingItem = acc.find(i => i.productId === item.productId);
                            if (existingItem) {
                                existingItem.quantity += item.quantity;
                                existingItem.totalPrice += item.price * item.quantity;
                            } else {
                                acc.push({ ...item, totalPrice: item.price * item.quantity });
                            }
                            return acc;
                        }, []);

                        setCartItems(groupedItems);
                        const total = groupedItems.reduce((sum, item) => sum + item.totalPrice, 0);
                        setTotalCartPrice(total);
                    }
                } else {
                    setError("No se pudo cargar el carrito.");
                }
            } catch (error) {
                setError("Error al obtener los productos del carrito.");
                console.error(error);
            }
        };
        fetchCartItems();
    }, []);

    const handleProceedToCheckout = () => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            navigate(`/Checkout/${userId}`); 
        } else {
            alert('Por favor, inicia sesión primero.');
        }
    };

    const handleQuantityChange = async (productId, change) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.productId === productId
                    ? {
                        ...item,
                        quantity: item.quantity + change,
                        totalPrice: (item.quantity + change) * item.price,
                    }
                    : item
            )
        );

        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        const updatedItem = cartItems.find(item => item.productId === productId);
        let updatedQuantity = updatedItem.quantity + change;
        try {
            await axios.put(
                `https://localhost:7199/api/CartItems/update-cart?userId=${userId}`,
                { productId, quantity: updatedQuantity },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setTotalCartPrice(prevTotal => prevTotal + change * updatedItem.price);
        } catch (error) {
            console.error("Error al actualizar el carrito:", error);
        }
    };

    const handleDeleteItem = async (productId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.productId !== productId));

        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        try {
            await axios.delete(
                `https://localhost:7199/api/CartItems/remove-item?userId=${userId}&productId=${productId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setTotalCartPrice((prevTotal) =>
                prevTotal - cartItems.find((item) => item.productId === productId).totalPrice
            );
        } catch (error) {
            console.error("Error al eliminar el producto del carrito:", error);
        }
    };

    const ultimoProducto = currentPage * productosPorPagina;
    const primerProducto = ultimoProducto - productosPorPagina;
    const currentCartItems = cartItems.slice(primerProducto, ultimoProducto);
    const totalPages = Math.ceil(cartItems.length / productosPorPagina);


    return (
        <div className="p-8 bg-[#181733] min-h-screen">
            <Header user={localStorage.getItem('userName')} />

            {error && <p className="text-center text-red-500 mb-4">{error}</p>}

            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-16">
                {cartItems.length === 0 ? (
                    <p className="text-center text-lg text-gray-600">No hay productos en el carrito.</p>
                ) : (
                    <ul className="space-y-4">
                        {currentCartItems.map((item) => {
                            const imageUrl = productImages[item.productId]; 

                            return (
                                <li
                                    key={item.productId}
                                    className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 relative"
                                >
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={imageUrl || 'https://via.placeholder.com/150'}
                                            alt={item.productName}
                                            className="h-24 w-24 object-cover rounded-md"
                                        />
                                        <div>
                                            <h2 className="text-xl font-semibold text-[#0454a4]">{item.productName}</h2>
                                            <p className="text-gray-600">Precio Unitario: ${item.price}</p>
                                        </div>
                                    </div>

                                    <button
                                        className="absolute top-2 right-2 p-2 rounded-full h-8 w-8 text-xs bg-[#e1e4e6] text-gray-800 font-bold"
                                        onClick={() => handleDeleteItem(item.productId)}
                                    >
                                        X
                                    </button>

                                    <div className="flex items-center space-x-4">
                                        <button
                                            className="px-3 py-1 rounded-full bg-[#dbe8ef] text-gray-800 font-bold"
                                            onClick={() => handleQuantityChange(item.productId, -1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="text-lg font-semibold">{item.quantity}</span>
                                        <button
                                            className="px-3 py-1 rounded-full bg-[#dbe8ef] text-gray-800 font-bold"
                                            onClick={() => handleQuantityChange(item.productId, 1)}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-lg font-bold text-gray-800 mt-10">Total: ${item.totalPrice}</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>

            <div className="text-center mt-8">
                <p className="text-xl font-semibold text-white mb-4">Total del Carrito: ${totalCartPrice}</p>
                <button
                    className="text-white bg-gradient-to-r from-[#a41c4c] via-[#a41c4c] to-[#0454a4] px-6 py-3 rounded-lg text-xl font-semibold hover:bg-gradient-to-l focus:outline-none"
                    onClick={handleProceedToCheckout}
                >
                    Proceder al Pago
                </button>
            </div>
        </div>
    );
};

export default Cart;
