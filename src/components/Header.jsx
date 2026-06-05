import '../styles/Header.css'
import { useLocation } from "react-router-dom";

import LogoButton from './LogoButton';
import RedirectButtons from './RedirectButtons';
import FanShopButton from './FanShopButton';
import Searchbar from './searchbar';
import ConfigButton from './ConfigButton';
import UserButton from './userButton';

function Header() {

    const location = useLocation();
    const inShop = location.pathname === "/shop"

    return(
        <div className="header">
            <div className="left">
                <LogoButton />
            </div>
            <div className="center">
                <RedirectButtons />
                {!inShop && <FanShopButton />}
                <Searchbar />
                <ConfigButton />
            </div>
            <div className="right">
                
                <UserButton />
            </div>
        </div>
    )
};

export default Header;