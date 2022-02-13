export const translatePaginatedSearchWithFiltersResponse = ({ data }) => {
    let cards = data.products.edges.map((productEdge) => {
        let card = { cursor: productEdge.cursor };
        card["tags"] = productEdge.node.tags;
        card["title"] = productEdge.node.title;
        card["available"] = productEdge.node.variants.edges[0].node.availableForSale;
        card["image"] = productEdge.node.variants.edges[0].node.image;
        card["price"] = Number(productEdge.node.variants.edges[0].node.priceV2.amount);

        return card;
    });

    return cards;
};
