import React from 'react';

function Header(props) {
  function item() {
    if (props.cartItemCount === 1) {
      return ' Item';
    } else {
      return ' Items';
    }
  }
  const backToCatalog = () => props.setView('catalog');
  const goToCart = () => props.setView('cart', {});
  return (
    <div className="d-flex bg-dark text-white header-div">
      <i className="fas fa-music fa-lg icon"></i>
      <h3 onClick={backToCatalog} className="header-title">Wicked Sales</h3>
      <h4 className="header-cart-text">{props.cartItemCount}{item()}</h4>
      <i className="fas fa-shopping-cart header-cart-icon" onClick={goToCart}></i>
    </div>
  );
}

export default Header;
