import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      }
    };
  }

  setView(name, params) {
    this.setState({
      view: {
        name: 'details',
        params: { productId: this.product.productId }
      }
    });
  }

  render() {
    let appView = null;
    if (this.state.view.name === 'catalog') {
      appView = <ProductList view={this.setView()} />;
    } else {
      appView = <ProductDetails view={this.state.view.params} method={this.setView}/>;
    }
    return (
      <div>
        <Header />,
        {/* <ProductList view={this.setView()}/> */}
        {appView}
      </div>
    );
  }
}

export default App;
