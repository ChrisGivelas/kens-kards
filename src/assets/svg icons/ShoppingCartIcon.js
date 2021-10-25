import React from "react";

const SHOPPING_CART_ICON_LARGE = (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
        <circle cx="10.5" cy="27.5" r="2.5"></circle>
        <circle cx="23.5" cy="27.5" r="2.5"></circle>
        <path d="M26.4 21H11.2c-1.2 0-2.2-.8-2.4-1.9L5.4 4.8c-.1-.5-.5-.8-1-.8H1c-.6 0-1-.4-1-1s.4-1 1-1h3.4C5.8 2 7 3 7.3 4.3l3.4 14.3c.1.2.3.4.5.4h15.2c.2 0 .4-.1.5-.4l3.1-10c.1-.2 0-.4-.1-.4-.1-.1-.2-.2-.4-.2H14c-.6 0-1-.4-1-1s.4-1 1-1h15.5c.8 0 1.5.4 2 1s.6 1.5.4 2.2l-3.1 10c-.3 1.1-1.3 1.8-2.4 1.8z"></path>
    </svg>
);

const SHOPPING_CART_ICON_SMALL = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
        <circle cx="7" cy="17" r="2"></circle>
        <circle cx="15" cy="17" r="2"></circle>
        <path d="M20 4.4V5l-1.8 6.3c-.1.4-.5.7-1 .7H6.7c-.4 0-.8-.3-1-.7L3.3 3.9c-.2-.6-.7-.9-1.2-.9H.4C.2 3 0 2.8 0 2.6V1.4c0-.2.2-.4.4-.4h2.5c1 0 1.8.6 2.1 1.6l.1.4 2.3 6.8c0 .1.2.2.3.2h8.6c.1 0 .3-.1.3-.2l1.3-4.4c0-.2-.2-.4-.4-.4H9.4c-.2 0-.4-.2-.4-.4V3.4c0-.2.2-.4.4-.4h9.2c.8 0 1.4.6 1.4 1.4z"></path>
    </svg>
);

const ShoppingCartIcon = ({ withIndicator, largeVersion, count = 0 }) => {
    if (withIndicator) {
        return (
            <div className="shopping-cart-with-indicator">
                <div className="shopping-cart-indicator">
                    <span>{count}</span>
                </div>
                {SHOPPING_CART_ICON_LARGE}
            </div>
        );
    }

    if (largeVersion) {
        return SHOPPING_CART_ICON_LARGE;
    }
    return SHOPPING_CART_ICON_SMALL;
};

export default ShoppingCartIcon;
