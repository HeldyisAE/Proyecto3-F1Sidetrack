import "../styles/FanShopButton.css"
import { useNavigate } from "react-router-dom";
import { GiShoppingBag } from "react-icons/gi";
import { useTranslation } from 'react-i18next';

function FanShopButton() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return(
        <div className="fanshopbutton-container">
            <button className="fanshop-button" onClick={() => navigate("/shop")}>
                <GiShoppingBag className="fanshop-icon" />
                <span className="fanshop-label">{t("navigation.shop")}</span>
            </button>
        </div>
    )
}

export default FanShopButton;