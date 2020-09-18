import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch('/api/products/:productId', { method: 'GET' })
      .then(res => res.json())
      .then(data => this.setState({ product: data }))
      .catch(err => console.error('Product does not exist', err));
  }

  render() {
    return (
      null
    );
  }
}

export default ProductDetails;
