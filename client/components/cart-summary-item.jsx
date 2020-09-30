import React from 'react';

function CartSummaryItem(props) {
  return (
    <div>
      <img src={props.image} className="card-img-top" alt="sales product"></img>
      <h1>{props.name}</h1>
      <h2>{props.price}</h2>
      <p>{props.shortDescription}</p>
    </div>
  );
}

export default CartSummaryItem;
