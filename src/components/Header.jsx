import '../styles/Header.css'
import { useLocation } from "react-router-dom";
import { useState } from 'react';

import LogoButton from './LogoButton';
import RedirectButtons from './RedirectButtons';
import FanShopButton from './FanShopButton';
import CartButton from './CartButton';
import Searchbar from './searchbar';
import ConfigButton from './ConfigButton';
import UserButton from './userButton';
import DriversMegaMenu from './DriversMegaMenu';

function Header() {

    const [activeMenu, setActiveMenu] = useState(null);

    const location = useLocation();
    const inShop = location.pathname.startsWith("/shop");

    return(
        <div className="header-wrapper"  onMouseLeave={() => setActiveMenu(null)}>
            <div className="header">
                <div className="left">
                    <LogoButton />
                </div>
                <div className="center">
                    <RedirectButtons activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
                    {inShop ? (
                        <CartButton />
                    ) : (
                        <FanShopButton />
                    )}
                    <Searchbar />
                    <ConfigButton />
                </div>
                <div className="right">
                    
                    <UserButton />
                </div>
            </div>

            {activeMenu === "drivers" && (<DriversMegaMenu onClose={() => setActiveMenu(null)}/>)}

        </div>
    )
};

export default Header;