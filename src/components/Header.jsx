import '../styles/Header.css';
import { useLocation } from "react-router-dom";
import { useState } from 'react';
import LogoButton from './LogoButton';
import RedirectButtons from './RedirectButtons';
import FanShopButton from './FanShopButton';
import CartButton from './CartButton';
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
                {/* 1. Izquierda */}
                <div className="left">
                    <LogoButton />
                </div>

                {/* 2. Centro: Navegación (Flexible) */}
                <div className="center">
                    <RedirectButtons activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
                    {inShop ? <CartButton /> : <FanShopButton />}
                </div>

                {/* 3. Derecha: Acciones (Fijas) */}
                <div className="right">
                    <Searchbar />
                    <ConfigButton
                        onClick={config.togglePanel}
                        isActive={config.isOpen}
                    />
                    <UserButton />
                </div>
            </div>

            {activeMenu === "drivers" && (
                <DriversMegaMenu setActiveMenu={setActiveMenu} onClose={() => setActiveMenu(null)} />
            )}

            <ConfigPanel {...config} />
        </div>
    );
}

export default Header;