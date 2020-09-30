import React from 'react';

function Header(props) {
  function item() {
    if (props.cartItemCount === 1) {
      return ' Item';
    } else {
      return ' Items';
    }
  }
  const goToCart = () => props.setView('cart', {});
  return (
    <div className="d-flex bg-dark text-white">
      <i className="fas fa-dollar-sign fa-lg icon"></i>
      <h3>Wicked Sales</h3>
      <h4 className="header-cart-text">{props.cartItemCount}{item()}</h4>
      <i className="fas fa-shopping-cart header-cart-icon" onClick={goToCart}></i>
    </div>
  );
}

export default Header;
