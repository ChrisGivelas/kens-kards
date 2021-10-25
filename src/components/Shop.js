import React, { useState } from "react";
import Card from "./Card";

const testCards = Array(100).fill(<Card />);

const viewingSizes = [10, 20, 50, 100];

const Shop = ({ cards = testCards, totalCards = testCards.length }) => {
    const [viewSize, setViewSize] = useState(viewingSizes[0]);
    const [upperPriceRange, setUpperPriceRange] = useState(1000);

    return (
        <div className="shop">
            <h1>Shop</h1>
            <div className="shop-grid">
                <div className="shop-filters">
                    <h2>Filters</h2>

                    <div className="filter-container sport-filter">
                        <h4>Sport</h4>
                        <input type="radio" value="Baseball" /> Baseball
                        <input type="radio" value="Basketball" /> BasketBall
                        <input type="radio" value="Hockey" /> Hockey
                    </div>

                    <div className="filter-container pice-filter">
                        <h4>Price</h4>
                        <p>
                            <input
                                type="range"
                                min="0"
                                max="10000"
                                value={upperPriceRange}
                                onChange={(e) =>
                                    setUpperPriceRange(e.target.value)
                                }
                            />
                        </p>
                        <p>{`$0 - $${upperPriceRange}`}</p>
                    </div>

                    <div className="filter-container year-filter">
                        <h4>Year</h4>
                        <input type="text" placeholder="year" />
                    </div>

                    <div className="filter-container team-filter">
                        <h4>Team</h4>
                        <input type="text" placeholder="team" />
                    </div>

                    <div className="filter-container subset-filter">
                        <h4>Subset</h4>
                        <input type="text" placeholder="subset" />
                    </div>
                </div>
                <div className="shop-listings">
                    <div className="shop-config">
                        <div className="showing">
                            <span>
                                Showing 1 -{" "}
                                {`${viewSize} of ${totalCards} cards`}
                            </span>
                            <span style={{ marginLeft: 20 }}>
                                Show:{" "}
                                <select
                                    name="view-sizes"
                                    onChange={(e) =>
                                        setViewSize(e.target.value)
                                    }
                                >
                                    {viewingSizes.map((vs) => (
                                        <option
                                            value={vs}
                                            selected={vs === viewSize}
                                        >{`${vs}`}</option>
                                    ))}
                                </select>
                            </span>
                        </div>
                        <div className="sort">
                            Sort:{" "}
                            <select name="sort-types">
                                <option value="ALPHA ASC">
                                    Alphabetical Ascending
                                </option>
                                <option value="ALPHA DESC">
                                    Alphabetical Descending
                                </option>
                                <option value="PRICE ASC">
                                    Price - Lowest to Highest
                                </option>
                                <option value="PRICE DESC">
                                    Price - Highest to Lowest
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="shop-items">{cards.slice(0, viewSize)}</div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
