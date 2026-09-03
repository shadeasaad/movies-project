import { useEffect, useState } from "react";
import { getAnimeShows } from "../service/api";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";
import SearchCom from "../components/SearchCom";

function Anime() {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const data = await getAnimeShows();
        setAnimeList(data || []);
      } catch (err) {
        console.error("Failed to fetch anime:", err);
      }
    };
    fetchAnime();
  }, []);

  if (animeList.length === 0) {
    return <Loader fullscreen={true} label="Loading Anime..." />;
  }

  return (
    
    <div className="w-full pb-16 pt-1">
      <SearchCom />

      <section className="anime-shows pt-10 px-4 sm:px-5">
        <h3 className="font-bold text-xl sm:text-2xl mb-6">Anime Shows</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
          {animeList.map((item) => (
            <MovieCard key={`anime-${item.id}`} movie={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Anime;