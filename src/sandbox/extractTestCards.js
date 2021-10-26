// Used to extract the text from https://www.oldsportscards.com/most-valuable-baseball-cards/ for test purposes only

var cardNodes = document.querySelectorAll(
    ".thrv_wrapper.thrv_contentbox_shortcode.thrv-content-box.tve-elem-default-pad"
);

var cards = [];

cardNodes.forEach(function (card) {
    let newCard = {};

    let cardInfo = card
        .querySelector(".thrv_wrapper.thrv_text_element h3")
        .innerText.substring(1);

    var split1 = cardInfo.split(": ");

    newCard["sku"] = split1[0];

    var split2 = split1[1].split(" ");

    newCard["year"] = split2[0];

    newCard["title"] = split2.slice(1).join(" ");

    cards.push(newCard);
});
