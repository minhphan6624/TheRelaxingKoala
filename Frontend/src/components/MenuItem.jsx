import React from "react";

import '../styles/MenuItem.css';

function MenuItem({item, addToOrderCallback}) {
    return (
        <div className="menu-item-card card">
            <div className="card-body">
                <h2 className="card-title">{item.name}</h2>
                <p className="card-text">{item.description}</p>
                <p className="card-text">{item.price}</p>
                <button className="btn btn-primary" onClick={() => addToOrderCallback(item)}>Add to Order</button>
            </div>
        </div>
    );
}

export default MenuItem;