import { useMemo } from "react";
import { searchProducts } from "../services/productSearchService";

export function useProductSearch(query, products) {

    return useMemo(() => {

        return searchProducts(
            query,
            products
        );

    }, [query, products]);
}