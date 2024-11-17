import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../HeaderPackage/Header';
import { useParams, useNavigate } from 'react-router-dom';

const ProductsList = () => {
    const { CategoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

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
        const getProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('Token no encontrado.');
                const response = await axios.get(`https://localhost:7199/api/Products/list-products-by-category?CategoryId=${CategoryId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.status === 204 || !response.data || response.data.length === 0) {
                    setProducts([]);
                } else {
                    setProducts(response.data);
                }
            } catch (error) {
                console.error('Error obteniendo productos:', error.message);
                setError('Error obteniendo productos');
            }
        };
        updateCartCount();
        getProducts();
    }, [CategoryId]);

    const updateCartCount = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `https://localhost:7199/api/CartItems/cart-items-user?userId=${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const totalCount = response.data.reduce((total, item) => total + item.quantity, 0);
            setCartCount(totalCount);
            localStorage.setItem('cartCount', totalCount);
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
        }
    };

    const handleAddToCart = async (product) => {
        const userId = localStorage.getItem('userId');  
        if (!userId) {
            alert("Por favor, inicia sesión para agregar productos al carrito.");
            return;
        }

        const cartItemData = {
            userId: parseInt(userId), 
            ProductId: parseInt(product.productID),  
            Quantity: 1,
        };

        try {
            const token = localStorage.getItem('token'); 
            const response = await axios.post('https://localhost:7199/api/CartItems/items-cart', cartItemData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                const newCount = cartCount + 1;
                setCartCount(newCount);
                await updateCartCount();
            } else {
                console.error('Error al agregar el producto al carrito:', response.statusText);
            }
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error);
        }
    };

    return (
        <div className="p-8 bg-[#181733] min-h-screen">
            <Header cartCount={cartCount} />
            {error && <p className="text-center text-red-500 mb-4">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.length === 0 ? (
                    <p className="text-center text-lg text-gray-500">No hay productos disponibles en esta categoría.</p>
                ) : (
                    products.map((product) => {
                        const imageUrl = productImages[product.productID];

                        return (
                            <div key={product.productID}
                                className="bg-[#f4f4f4] rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer duration-300 mt-28">
                                <div className="p-6">
                                    <img
                                        src={imageUrl}
                                        alt={product.productName}
                                        className="h-full w-auto object-cover object-top transition-transform duration-300 hover:scale-105"
                                    />
                                    <h3 className="text-xl font-semibold text-[#0454a4] mt-4">{product.productName}</h3>
                                    <p className="text-gray-600 mt-2">{product.productDescription}</p>
                                    <p className="text-gray-800 font-bold mt-2">${product.productPrice}</p>
                                    <button
                                        className="w-full text-white bg-gradient-to-r from-[#a41c4c] via-[#a41c4c] to-[#0454a4] hover:bg-gradient-to-l focus:outline-none font-medium rounded-lg text-xl py-2.5 text-center mt-3"
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        Agregar al carrito
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default ProductsList;
