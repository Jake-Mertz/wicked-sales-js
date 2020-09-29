import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      view: {
        name: 'details'
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
    this.props.setView('catalog', {});
  }

  render() {
    // console.log(this.props);
    // console.log(this.state);
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
          <img src={this.state.product[0].image} className="card-img-top" alt="sales product"></img>
          <h1>{this.state.product[0].name}</h1>
          <h3>{this.state.product[0].price}</h3>
          <h4>{this.state.product[0].shortDescription}</h4>
          <button onClick={() => this.props.addToCart(this.props.details.id)}>Add to Cart</button>
          <p>{this.state.product[0].longDescription}</p>
        </div>
      );
    }
  }
}

export default ProductDetails;
