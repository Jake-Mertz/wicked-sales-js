import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'checkout',
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.placeOrder(this.state.name, this.state.creditCard, this.state.shippingAddress);
  }

  render() {
    const priceTotal = this.props.cartData.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price;
    }, 0);
    const backToCatalog = () => { this.props.setView('catalog'); };
    return (
      <div className="checkout-page">
        <div className="checkout-reminder">Please do not enter any personal information into this form.</div>
        <h1 className="checkout-form-header">Checkout</h1>
        <h3 className="checkout-form-order-total">Order Total: ${priceTotal}</h3>
        <form onSubmit={this.handleSubmit} className="checkout-form">
          <label className="d-block checkout-form-label">Name
            <input
              className="d-block checkout-form-input"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}></input>
          </label>
          <label className="d-block checkout-form-label">Credit Card
            <input
              className="d-block checkout-form-input"
              type="text"
              name="creditCard"
              value={this.state.creditCard}
              onChange={this.handleChange}></input>
          </label>
          <label className="d-block checkout-form-label">Shipping Address
            <textarea
              className="d-block checkout-form-input"
              name="shippingAddress"
              rows="5"
              value={this.state.shippingAddress}
              onChange={this.handleChange}></textarea>
          </label>
          <button onClick={backToCatalog} className="checkout-return-to-catalog">Continue Shopping</button>
          <button type="submit" className="checkout-form-submit">Place Order</button>
        </form>
      </div>
    );
  }
}

export default CheckoutForm;
