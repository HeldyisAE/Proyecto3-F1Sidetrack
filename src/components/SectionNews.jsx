import { useEffect, useState } from "react";

import AntonelliLeader from "../assets/AntonelliLeader.jpg";
import NoDRS from "../assets/NoDRS.jpg";
import V8Return from "../assets/V8Return.jpg";

import { useTranslation } from 'react-i18next';

import "../styles/SectionNews.css";

function SectionNews() {
    const { t } = useTranslation();

    const news = [
      {
        title: t("news.antonelli.title"),
        image: AntonelliLeader,
      },
      {
        title: t("news.nodrs.title"),
        image: NoDRS,
      },
      {
        title: t("news.v8return.title"),
        image: V8Return,
      },
    ];

    const [currentNews, setCurrentNews] = useState(0);

    useEffect(() => {

        const interval = setInterval(() => {

            setCurrentNews(
                (prev) => (prev + 1) % news.length
            );

        }, 5000);

        return () => clearInterval(interval);

    }, []);

    return (

        <div className="news-carousel">

            <img
                src={news[currentNews].image}
                alt={news[currentNews].title}
                className="news-image"
            />

            <div className="news-overlay" />

            <div className="news-content">

                <span className="news-tag">
                    {t("news.breaking")}
                </span>

                <h2>
                    {news[currentNews].title}
                </h2>

            </div>

            <div className="news-indicators">

                {news.map((_, index) => (

                    <button
                        key={index}
                        className={
                            index === currentNews
                                ? "indicator active"
                                : "indicator"
                        }
                        onClick={() => setCurrentNews(index)}
                    />

                ))}

            </div>

        </div>

    );

}

export default SectionNews;