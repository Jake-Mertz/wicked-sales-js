import React from 'react';
import Header from './header';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      view: {
        name: 'details',
        productId: this.product.productId
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
    if (this.state.view === 'details') {
      return (
        <div>
          <Header />
          <button onClick={this.backToCatalog}>Back to Catalog</button>
          <img src={this.props.image} className="card-img-top" alt="sales product"></img>
          <h1>`${this.props.details.name}`</h1>
          <h3>`${this.props.details.price}`</h3>
          <p>`${this.props.details.longDescription}`</p>
        </div>
      );
    }
  }
}

export default ProductDetails;
