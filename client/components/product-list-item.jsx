import React from 'react';

function ProductListItem(props) {
  // console.log(props);
  return (
    <div className="card d-flex align-items-stretch" style={{ width: '18rem' }}>
      <img src="{props.image}" className="card-img-top" alt="sales product"></img>
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">example text</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  );
}

export default ProductListItem;
