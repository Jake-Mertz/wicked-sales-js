import React from 'react';
import CartSummaryItem from './cart-summary-item';

function CartSummary(props) {
  // console.log(props.cartData);
  const cartItems = props.cartData.map((item, index) => {
    return (
      <CartSummaryItem
        key={item.productId + index}
        image={item.image}
        name={item.name}
        price={item.price}
        shortDescription={item.shortDescription}
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
      <h1>Your cart is empty!</h1>
    );
  }
  return (
    <div>
      <button onClick={backToCatalog}>Back to Catalog</button>
      <h1>My Cart</h1>
      {cartItems}
      <h3>Item Total {priceTotal}</h3>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}

export default CartSummary;
