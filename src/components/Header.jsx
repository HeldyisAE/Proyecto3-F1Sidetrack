import '../styles/Header.css';
import LogoButton from './LogoButton';
import RedirectButtons from './RedirectButtons';
import FanShopButton from './FanShopButton';
import Searchbar from './searchbar';
import ConfigButton from './ConfigButton';
import UserButton from './userButton';
import ConfigPanel from './ConfigPanel';
import { useConfig } from '../hooks/useConfig';

function Header() {
    const config = useConfig();

    return (
        <>
            <div className="header">
                <div className="left">
                    <LogoButton />
                </div>
                <div className="center">
                    <RedirectButtons />
                    <FanShopButton />
                    <Searchbar />
                    <ConfigButton
                        onClick={config.togglePanel}
                        isActive={config.isOpen}
                    />
                </div>
                <div className="right">
                    <UserButton />
                </div>
            </div>

            <ConfigPanel
                isOpen={config.isOpen}
                closePanel={config.closePanel}
                theme={config.theme}
                changeTheme={config.changeTheme}
                language={config.language}
                changeLanguage={config.changeLanguage}
                LANGUAGES={config.LANGUAGES}
            />
        </>
    );
}

export default Header;
