import '../styles/Header.css'

import LogoButton from './LogoButton';
import RedirectButtons from './RedirectButtons';
import FanShopButton from './FanShopButton';
import Searchbar from './searchbar';
import ConfigButton from './ConfigButton';
import UserButton from './userButton';

function Header() {

    return(
        <div className="header">
            <div className="left">
                <LogoButton />
            </div>
            <div className="center">
                <RedirectButtons />
                <FanShopButton />
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