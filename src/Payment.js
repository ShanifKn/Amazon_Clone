import React, { useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import Checkoutproduct from "./Checkoutproduct";
import { Link } from "react-router-dom";
import Header from "./Header";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const elements = useElements();
  const navigate = useNavigate();
  const stripe = useStripe();

  const [succeeded, setSucceeded] = useState();
  const [processing, setProcessing] = useState();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(null);
  const [clientSecret, setClientSecret] = useState();

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  console.log("The Secret ", clientSecret);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        db.collection("users").doc(user?.uid).collection("orders").set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        navigate.replace("/orders");
      });
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <Header />
      <div className="payment-container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className="payment-section">
          <div className="payment-title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment-address">
            <p>{user?.email}</p>
            <p>123 React lane</p>
            <p>Los Angeles,CA</p>
          </div>
        </div>
        <div className="payment-section">
          <div className="payment-title">
            <h3>Review item and Delivery</h3>
          </div>
          <div className="payment-item">
            {basket.map((item, index) => (
              <Checkoutproduct
                key={index}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="payment-section">
          <div className="payment-title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment-details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment-price">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total:{value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
