// const express = require('express');
// const router = express.Router();
// const axios = require('axios');

// router.post('/create-payment', async (req, res) => {
//   try {
//     const { items, total, customerInfo, paymentMethod, cardInfo, deliveryType } = req.body;

//     // Configuração da Infinite Pay
//     const infinitePayData = {
//       amount: Math.round(total * 100),
//       currency: 'BRL',
//       description: 'Compra VM Tech Climatiza',
//       customer: {
//         name: customerInfo.name,
//         email: customerInfo.email,
//         phone: customerInfo.phone
//       },
//       items: items.map(item => ({
//         name: item.name,
//         quantity: item.quantity,
//         unit_amount: Math.round(item.price * 100)
//       })),
//       payment_method: paymentMethod === 'card' ? {
//         type: 'credit_card',
//         card: {
//           number: cardInfo.number,
//           exp_month: cardInfo.expiry.split('/')[0],
//           exp_year: cardInfo.expiry.split('/')[1],
//           cvv: cardInfo.cvv,
//           holder_name: cardInfo.holderName
//         }
//       } : {
//         type: 'pix'
//       },
//       success_url: `${process.env.FRONTEND_URL}/payment/success`,
//       cancel_url: `${process.env.FRONTEND_URL}/checkout`
//     };

//     const response = await axios.post('https://api.infinitepay.io/v1/payments', infinitePayData, {
//       headers: {
//         'Authorization': `Bearer ${process.env.INFINITE_PAY_API_KEY}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     res.json({ 
//       success: true,
//       paymentUrl: response.data.checkout_url 
//     });

//   } catch (error) {
//     console.error('Erro ao criar pagamento:', error);
//     res.status(500).json({ 
//       success: false,
//       error: 'Erro ao processar pagamento' 
//     });
//   }
// });

// module.exports = router;

import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import chair from './chair.jpg';
import gif from './giphy.gif';

function Product({ product }) {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: product.description,
                amount: {
                  currency_code: 'USD',
                  value: product.price,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaidFor(true);
          console.log(order);
        },
        onError: err => {
          setError(err);
          console.error(err);
        },
      })
      .render(paypalRef.current);
  }, [product.description, product.price]);

  if (paidFor) {
    return (
      <div>
        <h1>Congrats, you just bought {product.name}!</h1>
        <img alt={product.description} src={gif} />
      </div>
    );
  }

  return (
    <div>
      {error && <div>Uh oh, an error occurred! {error.message}</div>}
      <h1>
        {product.description} for ${product.price}
      </h1>
      <img alt={product.description} src={product.image} width="200" />
      <div ref={paypalRef} />
    </div>
  );
}

function App() {
  const product = {
    price: 777.77,
    name: 'comfy chair',
    description: 'fancy chair, like new',
    image: chair,
  };

  return (
    <div className="App">
      <Product product={product} />
    </div>
  );
}

export default App;