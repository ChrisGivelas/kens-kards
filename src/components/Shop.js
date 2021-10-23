import react from "react";
import MickeyMantle from "../assets/imgs/mickey-mantle.png";

const Shop = () => {
    return (
        <div className="shop">
            <h1>Shop</h1>
            <div className="shop-grid">
                <div className="shop-filters">
                    <h2>Filters</h2>
                    <div className="filter-container sport-filter">
                        <form className="sport-filter">
                            <input type="radio" value="Baseball" /> Baseball
                            <input type="radio" value="Basketball" /> BasketBall
                            <input type="radio" value="Hockey" /> Hockey
                        </form>
                    </div>

                    <div className="filter-container year-filter">
                        <form className="year-filter">
                            <input type="text" placeholder="year" />
                        </form>
                    </div>

                    <div className="filter-container team-filter">
                        <form className="team-filter">
                            <input type="text" placeholder="team" />
                        </form>
                    </div>

                    <div className="filter-container subset-filter">
                        <form className="subset-filter">
                            <input type="text" placeholder="subset" />
                        </form>
                    </div>
                </div>
                <div className="shop-items"></div>
            </div>
        </div>
    );
};

export default Shop;
