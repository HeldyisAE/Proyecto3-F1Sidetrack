import { useState } from "react";
import ProductModal from "./ProductModal";
import { useNavigate } from "react-router-dom";
import "../styles/SuggestionCard.css";

function SuggestionCard({ item, onProductSelect }) {
    const navigate = useNavigate();

    const handleClick = () => {

        if (item.type === "driver") {
            navigate(`/driver/${item.id}`);
        }

        if (item.type === "team") {
            navigate(`/team/${item.id}`);
        }

        if (item.type === "product") {
            onProductSelect(item.product);
        }
    };

    return (
        <div className="suggestion-card" onClick={handleClick}>
            <img
                src={item.image}
                alt={item.name}
                className="suggestion-image"
            />

            <div className="suggestion-info">
                <span className="suggestion-name">{item.name}</span>

                <span className="suggestion-type">{item.type}</span>

                {item.type !== "product" && (
                    <span className="suggestion-type">{item.type}</span>
                )}

                {item.type === "product" && (
                    <span className="suggestion-team">{item.team}</span>
                )}
            </div>
        </div>
    );
}

export default SuggestionCard;
