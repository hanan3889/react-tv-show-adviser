import { useEffect, useState } from "react";
import { TVShowAPI } from "./api/tv-show";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
import { Logo } from "./components/Logo/Logo";
import "./global.css";
import s from "./style.module.css";
import { BACKDROP_BASE_URL } from "./config";
import logo from "./assets/images/logo.png";
import { TVShowListItem } from "./components/TVShowListItem/TVShowListItem";
export function App() {
    const [currentTVShow, setcurrentTVShow] = useState();

    async function fetchPopulars() {
        const populars = await TVShowAPI.fetchPopulars();
        if (populars.length > 0) {
            setcurrentTVShow(populars[0]);
        }
    }

    useEffect(() => {
        fetchPopulars();
    }, []);

    function setCurrentTvShowFromRecommendation(tvShow) {
        setcurrentTVShow(tvShow);
    }

    return (
        <div
            className={s.main_container}
            style={{
                background: currentTVShow
                    ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
                    : "black",
            }}
        >
            <div className={s.header}>
                <div className="row">
                    <div className="col-4">
                        <Logo
                            image={logo}
                            title=""
                            subtitle="Find a show you may like"
                        />
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <input style={{ width: "100%" }} type="text" />
                    </div>
                </div>
            </div>
            <div className={s.tv_show_details}>
                {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
            </div>
            <div className={s.recommendations}>
                {currentTVShow && (
                    <>
                        <TVShowListItem
                            onClick={setCurrentTvShowFromRecommendation}
                            tvShow={currentTVShow}
                        />
                        <TVShowListItem
                            onClick={setCurrentTvShowFromRecommendation}
                            tvShow={currentTVShow}
                        />
                        <TVShowListItem
                            onClick={setCurrentTvShowFromRecommendation}
                            tvShow={currentTVShow}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
