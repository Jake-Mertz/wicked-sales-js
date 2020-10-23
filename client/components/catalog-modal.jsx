import React from 'react';

function CatalogModal(props) {
  return (
    <div className="demo-modal-background">
      <div className="demo-site-modal">
        <div>This site is for demonstration purposes only. No real purchases can be made.
          <button onClick={() => props.setView('catalog', {})} className="demo-site-modal-button">Got it!</button>
        </div>
      </div>
    </div>
  );
}

export default CatalogModal;
