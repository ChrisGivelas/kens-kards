import React, { useState } from "react";
import { SHOPPING_CART_ICON_SMALL } from "../../assets/svg icons/ShoppingCartIcons";
import { getCardTitleString } from "./utils";

const Card = ({ card, isInCart, addItemToCart, removeItemFromCart }) => {
    let [classes, setClasses] = useState(isInCart ? "remove" : "add");

    let { team, subset, price, sku, imageSrc } = card;

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
            <img src={imageSrc} alt="card" />
            <div className="card-text">
                <p className="sku">SKU: {sku}</p>
                <p className="title">{getCardTitleString(card)}</p>
                {!!team && <p>{team}</p>}
                {!!subset && <p>{subset}</p>}
                <p className="price">{`$${price}.00`}</p>
            </div>
            <div className={`add-to-cart ${classes}`} onClick={handleClick}>
                <SHOPPING_CART_ICON_SMALL />
            </div>
        </div>
    );
};

export default Card;
