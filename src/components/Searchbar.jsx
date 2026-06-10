import "../styles/Searchbar.css";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";

import { useSearch } from "../hooks/useSearch";
import { useF1 } from "../hooks/useF1";
import { teams } from "../data/teams";

import SuggestionCard from "./SuggestionCard";

function Searchbar() {

    const [isFocused, setIsFocused] = useState(false);
    const searchbarRef = useRef(null);

    const { t } = useTranslation();

    const [query, setQuery] = useState("");

    const { driverStandings } = useF1();

    const suggestions = useSearch(query, driverStandings, teams);

    const location = useLocation();

    const inShop = location.pathname === "/shop";

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
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    return (
        <div className="searchbar-container" ref={searchbarRef}>
            <div className="searchbar-wrapper">
                <FaSearch className="searchbar-icon" />

                <input
                    className="searchbar-input"
                    onFocus={() => setIsFocused(true)}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={
                        inShop
                            ? t("navigation.searchbarShop")
                            : t("navigation.searchbarHome")
                    }
                />
            </div>

            {isFocused && suggestions.length > 0 && (
                <div className="search-suggestions">
                    {suggestions.map((item) => (
                        <SuggestionCard
                            key={`${item.type}-${item.id}`}
                            item={item}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Searchbar;
