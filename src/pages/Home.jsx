import '../styles/Home.css'

import Header from '../components/Header';
import Footer from '../components/Footer';
import HomeLayout from '../layouts/HomeLayout';

function Home() {

    return (
        <div className="home">
            <div className="top">
                <Header />
            </div>
            <div className="mid">
                <div className='content-container'>
                    <HomeLayout />  
                </div>
            </div>
            <div className="bottom">
                <Footer />
            </div>
        </div>
    )
};

export default Home;