import Header from "./Header";
import Landing from "./Landing";
import Shop from "./shop/Shop";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import testCardsInfo from "../sandbox/testCards";

function App() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        if (cards.length === 0) {
            Promise.all(
                testCardsInfo.map((tc) => {
                    return import(`../sandbox/testImgs/${tc.title}.jpg`).then(
                        (imgSrc) => {
                            return { imgSrc: imgSrc.default, info: tc };
                        }
                    );
                })
            ).then((cards) => {
                console.log(cards);
                setCards(cards);
            });
        }
    }, [cards.length]);
    return (
        <div className="App">
            <Header />
            <Landing />
            <Shop cards={cards} />
            <Footer />
        </div>
    );
}

export default App;
