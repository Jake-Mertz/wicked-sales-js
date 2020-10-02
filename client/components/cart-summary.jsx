import React from 'react';
import CartSummaryItem from './cart-summary-item';

function CartSummary(props) {
  const cartItems = props.cartData.map((item, index) => {
    return (
      <CartSummaryItem
        key={item.productId + index}
        image={item.image}
        name={item.name}
        price={item.price}
        shortDescription={item.shortDescription}
        setView={props.setView}
      />
    );
  });
  const priceTotal = props.cartData.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price;
  }, 0);
  const backToCatalog = () => {
    props.setView('catalog', {});
  };
  const checkout = () => {
    if (props.cartData.length > 0) {
      props.setView('checkout', {});
    }
  };
  if (props.cartData.length === 0) {
    return (
      <h1 className="cart-empty-text">Your cart is empty!</h1>
    );
  }
  return (
    <div>
      <button onClick={backToCatalog} className="p-back-button">Back to Catalog</button>
      <h1 className="cart-header">My Cart</h1>
      {cartItems}
      <div className="cart-footer">
        <h3 className="cart-total">Item Total ${priceTotal}</h3>
        <button className="cart-checkout-button" onClick={checkout}>Checkout</button>
      </div>
    </div>
  );
}

export default CartSummary;
