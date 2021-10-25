import React, { useState } from "react";
import MickeyMantleDefault from "../assets/imgs/mickey-mantle.png";
import ShoppingCartIcon from "../assets/svg icons/ShoppingCartIcon";

const getTestSku = () => Math.floor(Math.random() * 10000);

const testCardProps = {
    imgSrc: MickeyMantleDefault,
    info: {
        title: "Mickey Mantle Rookie Card",
        sport: "Baseball",
        year: 1952,
        team: "New York Yankees",
        subset: "subset 1",
        price: 5000000.0,
    },
};

const Card = ({
    imgSrc = testCardProps.imgSrc,
    sku = getTestSku(),
    info: { title, sport, year, team, subset, price } = testCardProps.info,
}) => {
    const [textIsHidden, setTextIsHidden] = useState(false);

    const handleImageHoverOn = () => setTextIsHidden(true);
    const handleImageHoverOff = () => setTextIsHidden(false);

    const cardTitle = `${title} - ${year} - ${team} - ${subset}`;

    return (
        <div className="card">
            <img
                src={imgSrc}
                alt="card"
                onMouseOver={handleImageHoverOn}
                onMouseOut={handleImageHoverOff}
            />
            <div className={`card-text${textIsHidden ? " hidden" : ""}`}>
                <p className="sku">SKU: {sku}</p>
                <p>{cardTitle}</p>
                <p className="price">{`$${price}.00`}</p>
            </div>
            <div className={`add-to-cart${textIsHidden ? " hidden" : ""}`}>
                <ShoppingCartIcon />
            </div>
        </div>
    );
};

export default Card;
