import Header from "./Header";
import Landing from "./Landing";
import Shop from "./shop/Shop";
import Footer from "./Footer";
import Checkout from "./Checkout";
import About from "./About";
import Contact from "./Contact";
import TrackOrder from "./TrackOrder";
import LogIn from "./LogIn";

import { useEffect, useState, useCallback } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import "rc-slider/assets/index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import _ from "lodash";

import testCardsInfo from "../sandbox/testCards";
import {
    DEFAULT_LOWER_YEAR_RANGE,
    DEFAULT_SPORT_OPTIONS,
    DEFAULT_UPPER_YEAR_RANGE,
    getCardTitleString,
} from "./shop/utils";
import { buildQueryParamString } from "./utils";

function App() {
    let history = useHistory();

    const [cart, setCart] = useState({});
    const [cards, setCards] = useState([]);

    const handleSearch = useCallback(
        ({ cardSearch, sport, lowerYear, upperYear }) => {
            history.push(
                `/shop?${buildQueryParamString({ cardSearch, sport, lowerYear, upperYear })}`
            );
        },
        [history]
    );

    const addItemToCart = (card) => {
        let newCart = _.cloneDeep(cart);
        newCart[card.sku] = card;
        setCart(newCart);
        toast.success(`"${getCardTitleString(card)}" added to cart!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const removeItemFromCart = (card) => {
        let newCart = _.cloneDeep(cart);
        delete newCart[card.sku];
        setCart(newCart);
        toast.info(`"${getCardTitleString(card)}" removed from cart.`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    useEffect(() => {
        if (cards.length === 0) {
            Promise.all(
                testCardsInfo.map((tc) => {
                    return import(`../sandbox/testImgs/${tc.title}.jpg`).then((imageSrc) => {
                        return { ...tc, imageSrc: imageSrc.default };
                    });
                })
            ).then((cards) => {
                setCards(cards);
            });
        }
    }, [cards.length]);

    return (
        <div className="App">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Header cartCount={Object.keys(cart).length} handleSearch={handleSearch} />
            <Switch>
                <Route path="/checkout">
                    <Checkout cart={cart} />
                </Route>
                <Route path="/contact">
                    <Contact cart={cart} />
                </Route>
                <Route path="/about">
                    <About cart={cart} />
                </Route>
                <Route path="/trackorder">
                    <TrackOrder cart={cart} />
                </Route>
                <Route path="/login">
                    <LogIn cart={cart} />
                </Route>
                <Route path="/shop">
                    <Shop
                        cards={cards}
                        cart={cart}
                        addItemToCart={addItemToCart}
                        removeItemFromCart={removeItemFromCart}
                    />
                </Route>
                <Route path="/">
                    <Landing
                        handleSearch={handleSearch}
                        sportOptions={DEFAULT_SPORT_OPTIONS.map((sport) => ({
                            value: sport,
                            label: sport,
                        }))}
                        yearOptions={Array.from(
                            new Array(DEFAULT_UPPER_YEAR_RANGE - DEFAULT_LOWER_YEAR_RANGE),
                            (x, i) => DEFAULT_LOWER_YEAR_RANGE + i
                        ).map((year) => ({ value: year, label: year }))}
                    />
                </Route>
            </Switch>
            <Footer />
        </div>
    );
}

export default App;
