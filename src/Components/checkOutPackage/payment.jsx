import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../HeaderPackage/Header'

const Checkout = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert('No se ha encontrado el usuario. Por favor, inicia sesión.');
      return;
    }

    const paymentData = {
      cardNumber,
      cardHolderName,
      expiryDate,
      address,
      city,
      state,
      zipCode,
      country,
      userId: localStorage.getItem('userId'),
    };

    try {
      const response = await axios.post('https://localhost:7199/api/PaymentAddresses/Payment', paymentData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        }
      });

      if (response.status === 200) {
        localStorage.removeItem('cartCount');
        localStorage.removeItem('cartItems');
        setCartCount(0);
        navigate('/success');
      }
    } catch (error) {
      console.error("Error en el pago:", error);
    }
  };


  return (
    <div className="p-8 bg-[#181733] min-h-screen">
      <Header user={localStorage.getItem('userName')} />
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-20">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nombre en la tarjeta</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={cardHolderName}
                onChange={(e) => setCardHolderName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Número de tarjeta</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Fecha de expiración</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Dirección</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Ciudad</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Estado</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Código Postal</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">País</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white bg-gradient-to-r from-[#a41c4c] via-[#a41c4c] to-[#0454a4] px-6  rounded-lg text-xl font-semibold hover:bg-gradient-to-l "
              >
                Comprar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
