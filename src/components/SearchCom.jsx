import { useState, useEffect } from "react";
import { Search as SearchIcon, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { searchMulti } from "../service/api";

function SearchCom({ onSearch }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      setLoading(false);
      onSearch?.("");
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      const data = await searchMulti(query);
      setResults(data);
      setLoading(false);
      setHasSearched(true);
      onSearch?.(query.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="w-full max-w-xl mx-auto relative z-20 mt-26">
      <div
        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border mt-6"
        style={{
          backgroundColor: "var(--search-bg)",
          borderColor: "var(--card-border)",
          color: "var(--text-color)",
        }}
      >
        <SearchIcon className="w-4 h-4 opacity-70 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search this list..."
          className="w-full bg-transparent focus:outline-none text-sm"
          style={{ color: "var(--text-color)" }}
        />
      </div>

      {/* Results Dropdown */}
      {(loading || hasSearched) && (
        <div 
          className="absolute left-0 right-0 mt-2 w-full rounded-xl border shadow-xl overflow-hidden max-h-80 overflow-y-auto"
          style={{
            backgroundColor: "var(--search-bg)",
            borderColor: "var(--card-border)",
            color: "var(--text-color)",
          }}
        >
          {loading && (
            <div className="py-8 flex items-center justify-center opacity-70">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          )}

          {!loading && hasSearched && results.length === 0 && (
            <div className="py-8 text-center px-4">
              <p className="text-sm font-semibold">Not found</p>
              <p className="text-xs opacity-60 mt-1">No results found for "{query}".</p>
            </div>
          )}

          {!loading && results.map((item) => {
            const year = item.release_date ? item.release_date.split('-')[0] : '';
            const posterUrl = item.poster_path 
              ? `https://image.tmdb.org/t/p/w92${item.poster_path}` 
              : 'https://via.placeholder.com/92x138?text=No+Image';

            return (
              <Link 
                key={item.id}
                to={`/watch/${item.id}`}
                onClick={() => setQuery("")}
                className="flex items-center gap-3 p-2.5 hover:bg-white/5 transition-colors cursor-pointer border-b last:border-none block"
                style={{ borderColor: "var(--card-border)" }}
              >
                <img 
                  src={posterUrl} 
                  alt={item.title} 
                  className="w-10 h-14 object-cover rounded bg-zinc-800 shrink-0"
                />
                <div className="flex flex-col overflow-hidden">
                  <h4 className="text-xs font-medium truncate">{item.title}</h4>
                  <p className="text-[10px] opacity-60 uppercase mt-0.5">
                    {item.media_type} {year ? `• (${year})` : ''}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchCom;