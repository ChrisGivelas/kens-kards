import React from "react";

const SHOPPING_CART_ICON = (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
        <circle cx="10.5" cy="27.5" r="2.5"></circle>
        <circle cx="23.5" cy="27.5" r="2.5"></circle>
        <path d="M26.4 21H11.2c-1.2 0-2.2-.8-2.4-1.9L5.4 4.8c-.1-.5-.5-.8-1-.8H1c-.6 0-1-.4-1-1s.4-1 1-1h3.4C5.8 2 7 3 7.3 4.3l3.4 14.3c.1.2.3.4.5.4h15.2c.2 0 .4-.1.5-.4l3.1-10c.1-.2 0-.4-.1-.4-.1-.1-.2-.2-.4-.2H14c-.6 0-1-.4-1-1s.4-1 1-1h15.5c.8 0 1.5.4 2 1s.6 1.5.4 2.2l-3.1 10c-.3 1.1-1.3 1.8-2.4 1.8z"></path>
    </svg>
);

const ShoppingCartIcon = ({ withIndicator, count = 0 }) => {
    if (withIndicator) {
        return (
            <div className="shopping-cart-with-indicator">
                <div className="shopping-cart-indicator">
                    <span>{count}</span>
                </div>
                {SHOPPING_CART_ICON}
            </div>
        );
    }
    return SHOPPING_CART_ICON;
};

export default ShoppingCartIcon;