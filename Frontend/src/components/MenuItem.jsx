import React from "react";

import '../styles/MenuItem.css';

function MenuItem({item, addToOrderCallback}) {
    return (
        <div className="menu-item-card">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>{item.price}</p>
            <button onClick={() => addToOrderCallback(item)}> Add to Order </button>
        </div>
    );
}

export default MenuItem;