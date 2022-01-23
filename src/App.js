import React from "react";
import "./App.css";
import { useEffect } from "react";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import Order from "./Order";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const [{}, dispatch] = useStateValue();

  const stripePromise = loadStripe(
    "pk_test_51K1wDdSGyflrBEBDm7mC82lIKLmAI6IHM95ZgIrkXJJ2oLYlfqQsgUwTPhrcjIs5Iq1gRBisSqtIJBLJZoKUUZ0f00RVlY2Yrn"
  );

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS ====>>>>", authUser);
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    // SHANIF
    <Elements stripe={stripePromise}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/orders" element={<Order />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </div>
      </Router>
    </Elements>
  );
}

export default App;
