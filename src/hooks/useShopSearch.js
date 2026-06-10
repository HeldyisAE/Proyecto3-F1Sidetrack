export function useShopSearch(query, products) {
    return useMemo(() => {

        if (!query.trim()) return [];

        return products.filter(product =>
            product.name
                .toLowerCase()
                .includes(query.toLowerCase())
        );

    }, [query, products]);
}