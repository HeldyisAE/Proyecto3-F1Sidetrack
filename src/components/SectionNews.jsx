import { useEffect, useState } from "react";

import NoDRS from "../assets/NoDRS.jpg";
import V8Return from "../assets/V8Return.jpg";

import { useTranslation } from 'react-i18next';

import "../styles/SectionNews.css";

function SectionNews() {
    const { t } = useTranslation();

    const news = [
      {
        title: t("news.antonelli.title"),
        image: "https://imagenes.eleconomista.com.mx/files/webp_768_448/files/fp/uploads/2026/06/07/6a25c4a241899.r_d.2631-1945-1305.jpeg"
      },
      {
        title: t("news.nodrs.title"),
        image: "https://ca-times.brightspotcdn.com/dims4/default/7750d83/2147483647/strip/true/crop/7989x5326+0+0/resize/1200x800!/format/webp/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F21%2Fbc%2F49a71f6d401c827ac77d30bb3b17%2Fcadillac-punto-esquivo-75971.jpg",
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