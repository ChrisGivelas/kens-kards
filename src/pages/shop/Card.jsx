import React, { useState } from "react";
import { SHOPPING_CART_ICON_SMALL } from "../../assets/svg icons/ShoppingCartIcons";

const Card = ({ card, isInCart, addItemToCart, removeItemFromCart }) => {
    let [classes, setClasses] = useState(isInCart ? "remove" : "add");

    let {
        title,
        image: { url },
        price,
    } = card;

    const handleClick = () => {
        if (isInCart) {
            removeItemFromCart(card);
            setClasses("add");
        } else {
            addItemToCart(card);
            setClasses("remove");
        }
    };

    return (
        <div className="card">
            <img src={url} alt="card" />
            <div className="card-text">
                <p className="title">{title}</p>
                <p className="price">{`$${price}.00`}</p>
            </div>
            <div className={`add-to-cart ${classes}`} onClick={handleClick}>
                <SHOPPING_CART_ICON_SMALL />
            </div>
        </div>
    );
};

export default Card;
