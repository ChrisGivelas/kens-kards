import React from "react";
import ShoppingCartIcon from "../../assets/svg icons/ShoppingCartIcon";

const Card = ({
    imgSrc,
    info: { title, year, sport, team, subset, price, sku },
}) => {
    return (
        <div className="card">
            <img src={imgSrc} alt="card" />
            <div className="card-text">
                <p className="sku">SKU: {sku}</p>
                <p className="title">{title}</p>
                {!!year && <p>{year}</p>}
                {!!team && <p>{team}</p>}
                {!!subset && <p>{subset}</p>}
                <p className="price">{`$${price}.00`}</p>
            </div>
            <div className="add-to-cart">
                <ShoppingCartIcon />
            </div>
        </div>
    );
};

export default Card;
