import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieReviews } from "../service/api";
import Loader from "../components/Loader";
import { X, Delete, Pencil } from "lucide-react";

function Watch() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(10);
  const [content, setContent] = useState("");

  const [reviewToDelete, setReviewToDelete] = useState(null);

  const [reviewToEdit, setReviewToEdit] = useState(null);
  const [editAuthor, setEditAuthor] = useState("");
  const [editRating, setEditRating] = useState(10);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieData, reviewsData] = await Promise.all([
          getMovieDetails(id),
          getMovieReviews(id),
        ]);
        setMovie(movieData);
        const formattedReviews = reviewsData.map(review => ({
          ...review,
          isUserAdded: false
        }));
        setReviews(formattedReviews);
      } catch (err) {
        console.error("Failed to load watch page data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    const newReview = {
      id: Date.now(),
      author,
      author_details: { rating: Number(rating) },
      content,
      isUserAdded: true, 
    };

    setReviews([newReview, ...reviews]);
    
    setAuthor("");
    setRating(10);
    setContent("");
    setIsModalOpen(false);
  };

  const handleDeleteReview = (review) => {
    setReviewToDelete(review);
  };

  const confirmDeleteReview = () => {
    setReviews(reviews.filter((review) => review.id !== reviewToDelete.id));
    setReviewToDelete(null);
  };

  const cancelDeleteReview = () => {
    setReviewToDelete(null);
  };

  const handleEditReview = (review) => {
    setReviewToEdit(review);
    setEditAuthor(review.author);
    setEditRating(review.author_details?.rating ?? 10);
    setEditContent(review.content);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editAuthor.trim() || !editContent.trim()) return;

    setReviews(
      reviews.map((review) =>
        review.id === reviewToEdit.id
          ? {
              ...review,
              author: editAuthor,
              author_details: { rating: Number(editRating) },
              content: editContent,
            }
          : review
      )
    );

    setReviewToEdit(null);
  };

  const cancelEditReview = () => {
    setReviewToEdit(null);
  };

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
          <h1 className="text-3xl sm:text-5xl font-bold mb-2">
            {movie.title || movie.name}
          </h1>
          <p className="text-sm sm:text-base text-gray-300 italic">
            {movie.tagline}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="bg-zinc-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-bold mb-2">Overview</h3>
          <p className="text-gray-300 leading-relaxed mb-6">{movie.overview}</p>

          <div className="flex items-center gap-6 text-sm text-gray-400">
            <span>
              Release Date: {movie.release_date || movie.first_air_date}
            </span>
            {movie.runtime && <span>Runtime: {movie.runtime} mins</span>}
          </div>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 h-fit">
          <h3 className="text-lg font-bold mb-2">Rating</h3>
          <div className="flex items-center gap-3">
            <span
              className="text-3xl font-extrabold"
              style={{ color: "var(--primary-color)" }}
            >
              {movie.vote_average?.toFixed(1)}
            </span>
            
            <span className="text-xs text-gray-400">
              ({movie.vote_count} total votes)
            </span>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="text-white flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">User Reviews</h3>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-lg sm:text-xl font-bold px-4 py-2 rounded-2xl bg-[var(--search-bg)] cursor-pointer hover:opacity-90 transition-opacity"
          >
            + add Review
          </button>
        </div>

        {reviews.length === 0 ? (
          <p className="text-gray-400">
            No reviews available for this movie yet.
          </p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-zinc-900 p-5 rounded-xl border border-zinc-800"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-sm">{review.author}</span>
                  <div className="flex items-center gap-3">
                    {review.author_details?.rating && (
                      <span
                        className="text-xs px-2 py-0.5 rounded font-bold text-black"
                        style={{ backgroundColor: "var(--primary-color)" }}
                      >
                        {review.author_details.rating} / 10
                      </span>
                    )}
                    {review.isUserAdded && (
                      <>
                        <button
                          onClick={() => handleEditReview(review)}
                          className="text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors"
                          title="Edit review"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteReview(review)}
                          className="text-gray-400 hover:text-red-400 cursor-pointer transition-colors"
                          title="Delete review"
                        >
                          <Delete size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {review.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg p-6 rounded-2xl shadow-2xl relative text-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add Your Review</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-[var(--primary-color)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Rating (1 - 10)</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-[var(--primary-color)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Review Content</label>
                <textarea
                  rows="4"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your review here..."
                  required
                  className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-[var(--primary-color)] resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-zinc-800 text-gray-300 hover:bg-zinc-700 text-sm font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-black font-bold text-sm transition-opacity hover:opacity-90 cursor-pointer"
                  style={{ backgroundColor: "var(--primary-color)" }}
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {reviewToEdit && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg p-6 rounded-2xl shadow-2xl relative text-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Edit Your Review</h3>
              <button
                onClick={cancelEditReview}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
                <input
                  type="text"
                  value={editAuthor}
                  onChange={(e) => setEditAuthor(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-[var(--primary-color)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Rating (1 - 10)</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={editRating}
                  onChange={(e) => setEditRating(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-[var(--primary-color)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Review Content</label>
                <textarea
                  rows="4"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="Write your review here..."
                  required
                  className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-[var(--primary-color)] resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={cancelEditReview}
                  className="px-4 py-2 rounded-lg bg-zinc-800 text-gray-300 hover:bg-zinc-700 text-sm font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-black font-bold text-sm transition-opacity hover:opacity-90 cursor-pointer"
                  style={{ backgroundColor: "var(--primary-color)" }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {reviewToDelete && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-sm p-6 rounded-2xl shadow-2xl relative text-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Delete Review</h3>
              <button
                onClick={cancelDeleteReview}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-sm text-gray-300 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-white">
                {reviewToDelete.author}
              </span>
              's review? This can't be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={cancelDeleteReview}
                className="px-4 py-2 rounded-lg bg-zinc-800 text-gray-300 hover:bg-zinc-700 text-sm font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteReview}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-opacity cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Watch;