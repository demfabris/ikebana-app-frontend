import React, { useState } from 'react';

import './styles.scss';

export default function CheckoutCartElement(el, key) {
    return(
        <div key={key} className="checkout-cart-el">
            <div className="checkout-cart-el__content">
                <img className="element-img" 
                    src={el.picture} alt="planta" />
                <h3 className="element-title">{el.name}</h3>
            </div>
        </div>
    );
}

