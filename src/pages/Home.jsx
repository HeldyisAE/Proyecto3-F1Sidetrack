import '../styles/Home.css';
import Header from '../components/Header';
import F1ContentController from '../components/F1ContentController';
import { useF1Menu } from '../hooks/useF1Menu';

function Home() {
    const { data, loading, error, activeView, handleConsult, clearView } = useF1Menu();

    return (
        <div className="home">
            <div className="top">
                <Header handleConsult={handleConsult} activeView={activeView} />
            </div>
            <div className="mid">
                <div className="content-container">
                    <F1ContentController
                        data={data}
                        loading={loading}
                        error={error}
                        activeView={activeView}
                        clearView={clearView}
                    />
                </div>
            </div>
            <div className="bottom">
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', color: 'var(--color-text-secondary, #888)' }}>
                    F1 Sidetrack · Datos proporcionados por OpenF1
                </p>
            </div>
        </div>
    );
}

export default Home;
