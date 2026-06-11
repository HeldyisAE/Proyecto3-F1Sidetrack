import "../styles/Searchbar.css";
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";

import { useSearch } from "../hooks/useSearch";
import { useF1 } from "../hooks/useF1";
import { teams } from "../data/teams";
import { useProductSearch } from "../hooks/useProductSearch";
import { products } from "../data/products";

import SuggestionCard from "./SuggestionCard";
import ProductModal from "./ProductModal";

function Searchbar({ onProductSelect }) {
    const navigate = useNavigate();

    const [selectedProduct, setSelectedProduct] = useState(null);

    const [isFocused, setIsFocused] = useState(false);
    const searchbarRef = useRef(null);

    const { t } = useTranslation();

    const [query, setQuery] = useState("");

    const { driverStandings } = useF1();

    const location = useLocation();

    const isShop = location.pathname.startsWith("/shop");

    const sportSuggestions = useSearch(query, driverStandings, teams);

    const productSuggestions = useProductSearch(query, products);

    const suggestions = isShop ? productSuggestions : sportSuggestions;

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                searchbarRef.current &&
                !searchbarRef.current.contains(event.target)
            ) {
                setIsFocused(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setQuery("");
        setIsFocused(false);
    }, [location.pathname]);

    const handleSearch = () => {

        if (!query.trim()) return;

        if (!isShop) return;

        navigate(
            `/shop/search?q=${encodeURIComponent(query)}`
        );

        setIsFocused(false);
    };

    return (
        <div className="searchbar-container" ref={searchbarRef}>
            <div className="searchbar-wrapper">
                <FaSearch className="searchbar-icon" />

                <input
                    className="searchbar-input"
                    onFocus={() => setIsFocused(true)}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                    placeholder={
                        isShop
                            ? t("navigation.searchbarShop")
                            : t("navigation.searchbarHome")
                    }
                />
            </div>

            {isFocused && suggestions.length > 0 && (
                <div className="search-suggestions">
                    {suggestions.map((item) => (
                        <SuggestionCard
                            item={item}
                            onProductSelect={setSelectedProduct}
                        />
                    ))}
                </div>
            )}
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
}

export default Searchbar;
