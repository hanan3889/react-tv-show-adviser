import { useEffect, useState } from "react";
import { TVShowAPI } from "./api/tv-show";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
import { Logo } from "./components/Logo/Logo";
import "./global.css";
import s from "./style.module.css";
import { BACKDROP_BASE_URL } from "./config";
import logo from "./assets/images/logo.png";
import { TVShowListItem } from "./components/TVShowListItem/TVShowListItem";
import { TVShowList } from "./components/TVShowList/TVShowList";
import { SearchBar } from "./components/SearchBar/SearchBar";

export function App() {
    const [currentTVShow, setcurrentTVShow] = useState();
    const [recommendationList, setRecommendationList] = useState([]);

    async function fetchPopulars() {
        const populars = await TVShowAPI.fetchPopulars();
        if (populars.length > 0) {
            setcurrentTVShow(populars[0]);
        }
    }

    async function fetchRecommendations(tvShowId) {
        const recommendations = await TVShowAPI.fetchRecommendations(tvShowId);
        if (recommendations.length > 0) {
            setRecommendationList(recommendations.slice(0, 10));
        }
    }

    useEffect(() => {
        fetchPopulars();
    }, []);

    useEffect(() => {
        if (currentTVShow) {
            fetchRecommendations(currentTVShow.id);
        }
    }, [currentTVShow]);

    function setCurrentTvShowFromRecommendation(tvShow) {
        setcurrentTVShow(tvShow);
    }
    console.log(recommendationList);

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
                        <SearchBar />
                    </div>
                </div>
            </div>
            <div className={s.tv_show_details}>
                {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
            </div>
            <div className={s.recommendations}>
                {recommendationList && recommendationList.length > 0 && (
                    <TVShowList
                        onClickItem={setcurrentTVShow}
                        TVShowList={recommendationList}
                    />
                )}
            </div>
        </div>
    );
}
