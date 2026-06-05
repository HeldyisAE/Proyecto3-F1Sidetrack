import '../styles/Searchbar.css';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaSearch } from "react-icons/fa";

function Searchbar() {
    const { t } = useTranslation();

    const location = useLocation();
    const inShop = location.pathname === "/shop"

    return(

        <div className="searchbar-container">

            <div className="searchbar-wrapper">

                <FaSearch className="searchbar-icon"/>

                <input
                    className="searchbar-input"

                    placeholder={inShop ? t("navigation.searchbarShop") : t("navigation.searchbarHome")}
                />

            </div>

        </div>
    )
}

export default Searchbar;