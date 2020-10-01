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

  handleSubmit() {
    // console.log(this.state.name, this.state.creditCard, this.state.shippingAddress);
    event.preventDefault();
    this.props.placeOrder(this.state.name, this.state.creditCard, this.state.shippingAddress);
    this.setState({
      name: '',
      creditCard: '',
      shippingAddress: ''
    });
  }

  render() {
    const priceTotal = this.props.cartData.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price;
    }, 0);
    const backToCatalog = () => { this.props.setView('catalog'); };
    return (
      <div>
        <h1>Checkout</h1>
        <h3>Order Total: {priceTotal}</h3>
        <form onSubmit={this.handleSubmit}>
          <label>Name
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}></input>
          </label>
          <label>Credit Card
            <input
              type="text"
              name="creditCard"
              value={this.state.creditCard}
              onChange={this.handleChange}></input>
          </label>
          <label>Shipping Address
            <textarea
              name="shippingAddress"
              rows="7"
              value={this.state.shippingAddress}
              onChange={this.handleChange}></textarea>
          </label>
          <button type="submit">Place Order</button>
        </form>
        <button onClick={backToCatalog}>Continue Shopping</button>
      </div>
    );
  }
}

export default CheckoutForm;
