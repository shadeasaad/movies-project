function MovieCard({ movie }) {
  return (
    <a href={`/watch/${movie.id}`} className="w-full flex justify-center">
      <div className="card relative w-full max-w-sm bg-[var(--search-bg)] hover:-translate-y-2 duration-700 cursor-pointer rounded-2xl overflow-hidden flex flex-col">
        <div className="relative w-full aspect-[2/3] overflow-hidden">
          <img
            className="w-full h-full object-cover rounded-t-2xl"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/placeholder.jpg"
            }
            alt={movie.title}
          />
          <p className="rate absolute top-2 right-2 bg-[var(--primary-color)] text-white text-xs font-bold px-2 py-1 rounded-full z-20">
            {movie.vote_average?.toFixed(1)}
          </p>
        </div>
        
        <div className="p-3 flex flex-col flex-grow justify-between">
          <h4 className="text-[var(--text-color)] text-base font-semibold truncate">
            {movie.title}
          </h4>
          <p className="text-[var(--text-color)]/70 text-xs sm:text-sm mt-1">
            {movie.release_date}
          </p>
        </div>
      </div>
    </a>
  );
}

export default MovieCard;