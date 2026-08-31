import ImgSlider from "../components/ImgSlider";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import { getTrendingAll, getMoviesOnly, getTopRatedTv, getUpcomingMovies } from "../service/api";
import SearchCom from "../components/SearchCom";

function HomePage() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [trendData, popData, topData, upData] = await Promise.all([
          getTrendingAll(),
          getMoviesOnly(),
          getTopRatedTv(),
          getUpcomingMovies(),
        ]);
        setTrending(trendData);
        setPopular(popData);
        setTopRated(topData);
        setUpcoming(upData);
      } catch (err) {
        console.error("Failed to fetch home data:", err);
      }
    };
    fetchHomeData();
  }, []);

  if (trending.length === 0) {
    return <Loader fullscreen={true} label="Loading Home..." />;
  }

  return (
    <div className="w-full pb-16">
      <ImgSlider />
      <SearchCom />

      <section className="trending pt-10 px-4 sm:px-5">
        <h3 className="font-bold text-xl sm:text-2xl mb-6">Trending Now</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xxl:grid-5 gap-4 sm:gap-6 justify-items-center">
          {trending.map((item) => (
            <MovieCard key={`trending-${item.id}`} movie={item} />
          ))}
        </div>
      </section>

      <section className="popular-movies pt-16 px-4 sm:px-5">
        <h3 className="font-bold text-xl sm:text-2xl mb-6">Popular Movies</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xxl:grid-5 gap-4 sm:gap-6 justify-items-center">
          {popular.map((item) => (
            <MovieCard key={`pop-${item.id}`} movie={item} />
          ))}
        </div>
      </section>

      <section className="top-rated-tv pt-16 px-4 sm:px-5">
        <h3 className="font-bold text-xl sm:text-2xl mb-6">Top Rated TV Shows</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xxl:grid-5 gap-4 sm:gap-6 justify-items-center">
          {topRated.map((item) => (
            <MovieCard key={`top-${item.id}`} movie={item} />
          ))}
        </div>
      </section>

      <section className="coming-soon pt-16 px-4 sm:px-5">
        <h3 className="font-bold text-xl sm:text-2xl mb-6">Coming Soon</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xxl:grid-5 gap-4 sm:gap-6 justify-items-center">
          {upcoming.map((item) => (
            <MovieCard key={`upcoming-${item.id}`} movie={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;