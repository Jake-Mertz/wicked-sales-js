import React from 'react';

function CartSummaryItem(props) {
  // console.log(props);
  return (
    <div
      className="card col-sm-8 cart-item"
      // onClick={() => props.setView('details', { id: props.id })}
    >
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={props.image} className="card-img-top cart-image" alt="sales product"></img>
        </div>
        <div className="col-md-5">
          <div className="card-body">
            <h1 className="card-title cart-item-title">{props.name}</h1>
            <h2>${props.price}</h2>
            <p>{props.shortDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryItem;
