import '../styles/Home.css'

import Header from '../components/Header';

function Home() {

    return (
        <div className="home">
            <div className="top">
                <Header />
            </div>
            <div className="mid">
                <div className='content-container'>
                    <h1>Content</h1>  
                </div>
            </div>
            <div className="bottom">
                <h1>Footer</h1>
            </div>
        </div>
    )
};

export default Home;