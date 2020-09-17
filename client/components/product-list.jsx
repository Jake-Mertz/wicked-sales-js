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

  render() {
    return (
      this.state.products.map(product => {
        return (
          <div className="col-sm" key={product.productId}>
            <ProductListItem
              name={product.name}
              price={product.price}
              image={product.image}
              shortDescription={product.shortDescription}
            />
          </div>
        );
      })
    );

    // <div className="container">
    //   <div className="row">
    //     <div className="col-sm">
    //       <ProductListItem />
    //     </div>
    //     <div className="col-sm">
    //       <ProductListItem />
    //     </div>
    //     <div className="col-sm">
    //       <ProductListItem />
    //     </div>
    //   </div>
    //   <div className="row">
    //     <div className="col-sm">
    //       <ProductListItem />
    //     </div>
    //     <div className="col-sm">
    //       <ProductListItem />
    //     </div>
    //     <div className="col-sm">
    //       <ProductListItem />
    //     </div>
    //   </div>
    // </div>

  }
}

export default ProductList;
