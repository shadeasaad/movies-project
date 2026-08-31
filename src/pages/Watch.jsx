import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieReviews } from "../service/api";
import Loader from "../components/Loader";

function Watch() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieData, reviewsData] = await Promise.all([
          getMovieDetails(id),
          getMovieReviews(id),
        ]);
        setMovie(movieData);
        setReviews(reviewsData);
      } catch (err) {
        console.error("Failed to load watch page data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Loader fullscreen={true} label="Loading Movie Details..." />;
  }

  if (!movie) {
    return <div className="text-white text-center pt-24">Movie not found.</div>;
  }

  return (
    <div className="w-full min-h-screen text-white pt-24 px-4 sm:px-8 pb-16">
      <div className="relative w-full h-[40vh] sm:h-[50vh] rounded-2xl overflow-hidden mb-8">
        <img
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
              : "/placeholder.jpg"
          }
          alt={movie.title || movie.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-3xl sm:text-5xl font-bold mb-2">{movie.title || movie.name}</h1>
          <p className="text-sm sm:text-base text-gray-300 italic">{movie.tagline}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres?.map((genre) => (
              <span key={genre.id} className="bg-zinc-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                {genre.name}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-bold mb-2">Overview</h3>
          <p className="text-gray-300 leading-relaxed mb-6">{movie.overview}</p>

          <div className="flex items-center gap-6 text-sm text-gray-400">
            <span>Release Date: {movie.release_date || movie.first_air_date}</span>
            {movie.runtime && <span>Runtime: {movie.runtime} mins</span>}
          </div>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 h-fit">
          <h3 className="text-lg font-bold mb-2">Rating</h3>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-extrabold" style={{ color: "var(--primary-color)" }}>
              {movie.vote_average?.toFixed(1)}
            </span>
            <span className="text-xs text-gray-400">({movie.vote_count} total votes)</span>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-6">User Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-400">No reviews available for this movie yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.slice(0, 5).map((review) => (
              <div key={review.id} className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-sm">{review.author}</span>
                  {review.author_details?.rating && (
                    <span className="text-xs px-2 py-0.5 rounded font-bold" style={{ backgroundColor: "var(--primary-color)" }}>
                      {review.author_details.rating} / 10
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-gray-300 line-clamp-4">{review.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Watch;