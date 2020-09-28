import React from 'react';
// import Header from './header';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      view: {
        name: 'details',
        productId: this.props.id
      }
    };
    this.backToCatalog = this.backToCatalog.bind(this);
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.details.id}`, { method: 'GET' })
      .then(res => res.json())
      .then(data => this.setState({ product: data }))
      .catch(err => console.error('Product does not exist', err));
  }

  backToCatalog() {
    this.setView('catalog', {});
  }

  render() {
    if (this.state.product === null) {
      return (
        <div>
          <h1>Product could not be found</h1>
          <button onClick={this.backToCatalog}>Back to Catalog</button>
        </div>
      );
    } else if (this.state.product !== null) {
      return (
        <div>
          <button onClick={this.backToCatalog}>Back to Catalog</button>
          <img src={this.state.product.image} className="card-img-top" alt="sales product"></img>
          <h1>{this.props.name}</h1>
          <h3>{this.props.price}</h3>
          <p>{this.props.details.longDescription}</p>
        </div>
      );
    }
  }
}

export default ProductDetails;
