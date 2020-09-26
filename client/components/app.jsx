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
    this.setView = this.setView.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  render() {
    let appView = null;
    if (this.state.view.name === 'catalog') {
      appView = <ProductList setView={this.setView} />;
    } else if (this.state.view.name === 'details') {
      appView = <ProductDetails
        details={this.state.view.params}
        setView={this.setView}
      />;
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
