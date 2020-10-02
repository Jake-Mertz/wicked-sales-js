import React from 'react';

function ProductListItem(props) {
  return (
    <div
      className="card product-list-item"
      style={{ width: '18rem' }}
      onClick={() => props.setView('details', { id: props.id })}
    >
      <img src={props.image} className="card-img-top product-image mx-auto" alt="sales product"></img>
      <div className="card-body align-items-stretch">
        <h5 className="card-title">{props.name}</h5>
        <p>{props.price}</p>
        <p className="card-text">{props.shortDescription}</p>
        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
      </div>
    </div>
  );
}

export default ProductListItem;
