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
            <Landing />
            <Shop
                cards={cards}
                cart={cart}
                addItemToCart={addItemToCart}
                removeItemFromCart={removeItemFromCart}
            />
            <Footer />
        </div>
    );
}

export default App;
