import "../styles/FanShopButton.css"
import { GiShoppingBag } from "react-icons/gi";
import { useTranslation } from 'react-i18next';

function FanShopButton() {
    const { t } = useTranslation();
    return(
        <div className="fanshopbutton-container">
            <button className="fanshop-button">
                <GiShoppingBag className="fanshop-icon" />
                <span className="fanshop-label">{t("navigation.shop")}</span>
            </button>
        </div>
    )
}

export default FanShopButton;