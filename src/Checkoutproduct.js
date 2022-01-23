import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";

function Checkoutproduct({ id, title, image, price, rating }) {
  const [{}, dispatch] = useStateValue();

  const RemoveFromBaskets = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return (
    <div className="checkproduct">
      <img className="checkproduct_image" src={image} />
      <div className="checkproduct_info">
        <p className="checkproduct_title">{title}</p>
        <p className="checkproduct_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkproduct_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>🌟</p>
            ))}
        </div>
        <button onClick={RemoveFromBaskets}>Remove from Basket</button>
      </div>
    </div>
  );
}

export default Checkoutproduct;
