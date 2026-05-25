import '../styles/Header.css'

import LogoButton from './LogoButton';
import RedirectButtons from './RedirectButtons';
import FanShopButton from './FanShopButton';

function Header() {

    return(
        <div className="header">
            <div className="left">
                <LogoButton />
            </div>
            <div className="center">
                <RedirectButtons />
                <FanShopButton />
            </div>
            <div className="right">
                <h1>Right</h1>
            </div>
        </div>
    )
};

export default Header;