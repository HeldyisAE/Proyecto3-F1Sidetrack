export function searchProducts(query, products) {
    if (!query.trim()) {
        return [];
    }

    const searchTerm = query.toLowerCase();

    return products
        .filter(
            (product) =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.team.toLowerCase().includes(searchTerm)
        )
        .map((product) => ({
            id: product.id,
            type: "product",
            name: product.name,
            image: product.image,
            team: product.team,
            product,
        }));
}