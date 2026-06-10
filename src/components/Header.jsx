import '../styles/Header.css';
import { useLocation } from "react-router-dom";
import { useState } from 'react';
import LogoButton from './LogoButton';
import RedirectButtons from './RedirectButtons';
import FanShopButton from './FanShopButton';
import Searchbar from './searchbar';
import ConfigButton from './ConfigButton';
import UserButton from './userButton';
import ConfigPanel from './ConfigPanel';
import DriversMegaMenu from './DriversMegaMenu';
import { useConfig } from '../hooks/useConfig';

function Header() {
    const config = useConfig();
    const [activeMenu, setActiveMenu] = useState(null);

    const location = useLocation();
    const inShop = location.pathname.startsWith("/shop");

    return (
        <div className="header-wrapper" onMouseLeave={() => setActiveMenu(null)}>
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
                    <ConfigButton
                        onClick={config.togglePanel}
                        isActive={config.isOpen}
                    />
                    <UserButton />
                </div>
            </div>

            {activeMenu === "drivers" && (
                <DriversMegaMenu onClose={() => setActiveMenu(null)} />
            )}

            <ConfigPanel
                isOpen={config.isOpen}
                closePanel={config.closePanel}
                theme={config.theme}
                changeTheme={config.changeTheme}
                language={config.language}
                changeLanguage={config.changeLanguage}
                LANGUAGES={config.LANGUAGES}
            />
        </div>
    );
}

export default Header;