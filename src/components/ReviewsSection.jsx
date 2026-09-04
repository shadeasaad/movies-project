import { X } from "lucide-react";

function ReviewsSection({
  reviews = [],
  isModalOpen,
  setIsModalOpen,
  author,
  setAuthor,
  rating,
  setRating,
  content,
  setContent,
  handleSubmit,
}) {
  return (
    <div className="mt-16">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white">User Reviews</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-xl text-sm font-semibold border border-zinc-700 transition-colors cursor-pointer"
        >
          + add Review
        </button>
      </div>

      {reviews.length === 0 ? (
        <p className="text-gray-400">No reviews available for this movie yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-sm text-white">{review.author}</span>
                {review.author_details?.rating && (
                  <span
                    className="text-xs px-2 py-0.5 rounded font-bold text-black"
                    style={{ backgroundColor: "var(--primary-color)" }}
                  >
                    {review.author_details.rating} / 10
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{review.content}</p>
            </div>
          ))}
        </div>
      )}

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

            <form onSubmit={handleSubmit} className="space-y-4">
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
    </div>
  );
}

export default ReviewsSection;