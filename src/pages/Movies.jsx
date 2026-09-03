import { useEffect, useState } from "react";
import { getMoviesOnly, getTopRatedMovies, getUpcomingMovies } from "../service/api";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";
import SearchCom from "../components/SearchCom";

function Movies() {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const [popData, topData, upData] = await Promise.all([
          getMoviesOnly(),
          getTopRatedMovies(),
          getUpcomingMovies(),
        ]);

        const isNotAnime = (item) => {
          const isAnimation =
            item.genre_ids?.includes(16) ||
            item.genres?.some((g) => g.id === 16);
          const isJapanese = item.original_language === "ja";
          return !(isAnimation && isJapanese);
        };

        setPopular((popData || []).filter(isNotAnime));
        setTopRated((topData || []).filter(isNotAnime));
        setUpcoming((upData || []).filter(isNotAnime));
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      } finally {
        setLoading(false); 
      }
    };
    fetchMovieData();
  }, []);

  if (loading) {
    return <Loader fullscreen={true} label="Loading Movies..." />;
  }

  return (
    <div className="w-full pt-1 pb-16">

      <SearchCom />

      <section className="popular-movies pt-10 px-4 sm:px-5">
        <h3 className="font-bold text-xl sm:text-2xl mb-6">Popular Movies</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
          {popular.map((item) => (
            <MovieCard key={`mov-pop-${item.id}`} movie={item} />
          ))}
        </div>
      </section>

      <section className="top-rated-movies pt-16 px-4 sm:px-5">
        <h3 className="font-bold text-xl sm:text-2xl mb-6">Top Rated Movies</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
          {topRated.map((item) => (
            <MovieCard key={`mov-top-${item.id}`} movie={item} />
          ))}
        </div>
      </section>

      <section className="coming-soon pt-16 px-4 sm:px-5">
        <h3 className="font-bold text-xl sm:text-2xl mb-6">Upcoming Movies</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
          {upcoming.map((item) => (
            <MovieCard key={`mov-up-${item.id}`} movie={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Movies;