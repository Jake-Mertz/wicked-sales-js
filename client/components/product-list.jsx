import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      showModal: true
    };
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('api/products', { method: 'GET' })
      .then(res => res.json())
      .then(data => this.setState({ products: data }));
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  render() {
    const productListRender = this.state.products.map(product => {
      return (
        <div key={product.productId}>
          <ProductListItem
            name={product.name}
            price={product.price}
            image={product.image}
            shortDescription={product.shortDescription}
            setView={this.props.setView}
            id={product.productId}
            longDescription={product.longDescription}
          />
        </div>
      );
    });
    if (this.state.products.length === 0) {
      return (
        <h1 className="no-product-available">No products are available!</h1>
      );
    } else {
      return (
        <div>
          <div className={'modal' + (this.state.showModal ? ' show' : '')}>
            <div className="demo-site-modal">
              <div>This site is for demonstration purposes only. No real purchases can be made.
                <button onClick={this.hideModal} className="demo-site-modal-button">Got it!</button>
              </div>
            </div>
          </div>
          <div className="row row-cols-3">
            <div className="col product-list">{productListRender}</div>
          </div>
        </div>
      );
    }
  }
}

export default ProductList;
