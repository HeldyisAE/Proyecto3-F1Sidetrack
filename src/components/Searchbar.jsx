import '../styles/Searchbar.css';
import { useTranslation } from 'react-i18next';
import { FaSearch } from "react-icons/fa";

function Searchbar() {
    const { t } = useTranslation();

    return(

        <div className="searchbar-container">

            <div className="searchbar-wrapper">

                <FaSearch className="searchbar-icon"/>

                <input
                    className="searchbar-input"

                    placeholder={t("navigation.searchbar")}
                />

            </div>

        </div>
    )
}

export default Searchbar;