import { useEffect, useState } from "react";
import { getTvShows, getTopRatedTv } from "../service/api";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";
import SearchCom from "../components/SearchCom";

function TV() {
  const [tvShows, setTvShows] = useState([]);
  const [topRatedTv, setTopRatedTv] = useState([]);

  useEffect(() => {
    const fetchTvData = async () => {
      try {
        const [tvData, topData] = await Promise.all([
          getTvShows(),
          getTopRatedTv(),
        ]);
        setTvShows(tvData);
        setTopRatedTv(topData);
      } catch (err) {
        console.error("Failed to fetch TV shows:", err);
      }
    };
    fetchTvData();
  }, []);

  if (tvShows.length === 0) {
    return <Loader fullscreen={true} label="Loading TV Shows..." />;
  }

  return (
    <div className="w-full pb-16 pt-1">
      <SearchCom />

      <section className="popular-tv pt-10 px-4 sm:px-5">
        <h3 className="font-bold text-xl sm:text-2xl mb-6">Popular TV Shows</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
          {tvShows.map((item) => (
            <MovieCard key={`tv-pop-${item.id}`} movie={item} />
          ))}
        </div>
      </section>

      <section className="top-rated-tv pt-16 px-4 sm:px-5">
        <h3 className="font-bold text-xl sm:text-2xl mb-6">Top Rated TV Shows</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
          {topRatedTv.map((item) => (
            <MovieCard key={`tv-top-${item.id}`} movie={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default TV;