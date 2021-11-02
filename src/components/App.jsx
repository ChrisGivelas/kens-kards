import Header from "./Header";
import Landing from "./Landing";
import Shop from "./shop/Shop";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import testCardsInfo from "../sandbox/testCards";
import "rc-slider/assets/index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import _ from "lodash";
import { getCardTitleString } from "./shop/utils";
import { Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";

function App() {
    const [cart, setCart] = useState({});
    const [cards, setCards] = useState([]);

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
            <Header cartCount={Object.keys(cart).length} />
            <Switch>
                <Route path="/checkout">
                    <Checkout cart={cart} />
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
                    <Landing />
                </Route>
            </Switch>
            <Footer />
        </div>
    );
}

export default App;
