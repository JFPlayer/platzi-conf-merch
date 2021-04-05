import React, {useContext} from 'react'
import {AppContext} from '../context/AppContext';
import {PayPalButton} from 'react-paypal-button';

import './styles/Payment.css'

const Payment = ({history}) => {
  const {state, addNewOrder} = useContext(AppContext);
  const {cart, buyer} = state;

  const paypalOptions = {
    clientId: 'AbG6tBGJ_dVf4UMPRForVS7sqnFN5r2BEujPQ7a5Jh6Nuq-VfOdIn-2b43oSUfz9-r_r87azu81kX-S_',
    intent: 'capture',
    currency: 'USD'
  }

  const buttonStyles = {
    layout: 'vertical',
    shape: 'rect'
  }

  const handlePaymentSuccess = data => {
    console.log(data)
    if(data.status === 'COMPLETED'){
      const newOrder = {
        buyer,
        product: cart,
        payment: data
      }
      addNewOrder(newOrder);
      history.push('/checkout/success')
    }
  }

  const handleSumTotal = () => {
    const reducer = (acc, currentValue) => acc + currentValue.price;
    const sum = cart.reduce(reducer, 0);
    return sum;
  };

  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Resumen de pedido:</h3>
        {cart.map(item => (
          <div className="Payment-item" key={item.title}>
            <div className="Payment-element">
              <h4>{item.title}</h4>
              <span>$ {item.price}</span>
            </div>
          </div>
        ))}
        <div className="Payment-button">
          <PayPalButton
            paypalOptions={paypalOptions}
            buttonStyles={buttonStyles}
            amount={handleSumTotal()}
            onPaymentStart={() => console.log('Start Payment')}
            onPaymentSuccess={data => handlePaymentSuccess(data)}
            onPaymentError={error => console.log(error)}
            onPaymentCancel={data => console.log(data)}
          />
        </div>
      </div>
    </div>
  )
}

export default Payment
