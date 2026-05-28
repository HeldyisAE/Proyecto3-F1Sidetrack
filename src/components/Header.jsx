import '../styles/Header.css';
import LogoButton from './LogoButton';
import RedirectButtons from './RedirectButtons';
import FanShopButton from './FanShopButton';

function Header({ handleConsult, activeView }) {
    return (
        <div className="header">
            <div className="left">
                <LogoButton />
            </div>
            <div className="center">
                <RedirectButtons handleConsult={handleConsult} activeView={activeView} />
                <FanShopButton />
            </div>
            <div className="right">
                {/* espacio para el módulo de usuario/login */}
            </div>
        </div>
    );
}
export default Header;