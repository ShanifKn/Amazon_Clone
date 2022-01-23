import React from "react";
import Checkoutproduct from "./Checkoutproduct";
import "./Order.css";
import Moment from "react-moment";

function Order() {
  return (
    <div className="order">
      <h2>Orders</h2>
      <p className="order__id">Order ID: {Order.id}</p>
      <p className="order__date">
        {Moment.unix(Order.data.created).format("MMMM Do YYYY,h:mma")}
      </p>
      {Order.data.basket?.map((item, index) => (
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
  );
}

export default Order;
