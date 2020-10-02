import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
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
    return null;
  }

  render() {
    const productListRender = this.state.products.map(product => {
      return (
        <div className="col-sm" key={product.productId}>
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
    // console.log(this.state);
    // console.log(this.props);
    if (this.state.products.length === 0) {
      return (
        <h1>No products are available!</h1>
      );
    } else {
      return (
        // this.state.products.map(product => {
        //   return (
        //     <div className="col-sm" key={product.productId}>
        //       <ProductListItem
        //         name={product.name}
        //         price={product.price}
        //         image={product.image}
        //         shortDescription={product.shortDescription}
        //         setView={this.props.setView}
        //         id={product.productId}
        //         longDescription={product.longDescription}
        //       />
        //     </div>
        //   );
        // })
        <div>
          <div className="demo-site-modal hidden">This site is for demonstration purposes only. No real purchases can be made.
            <button onClick={this.hideModal} className="demo-site-modal-button">Got it!</button>
          </div>
          <div className="row justify-content-start">
            <div className="product-list col-md">{productListRender}</div>
          </div>
        </div>
      );
    }
  }
}

export default ProductList;
