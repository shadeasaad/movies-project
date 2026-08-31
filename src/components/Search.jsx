import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Loader2 } from 'lucide-react';
import { searchMulti } from '../service/api';
function Search({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      const data = await searchMulti(query);
      setResults(data);
      setLoading(false);
      setHasSearched(true);
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/60 backdrop-blur-sm px-4">
      <div 
        className="w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-colors duration-300 max-h-[80vh]"
        style={{ 
          backgroundColor: "var(--search-bg)", 
          borderColor: "var(--card-border)",
          color: "var(--text-color)" 
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          className="flex items-center px-4 py-4 border-b gap-3 transition-colors duration-300"
          style={{ borderColor: "var(--card-border)" }}
        >
          <SearchIcon className="w-5 h-5 opacity-70" />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies, series, actors..." 
            className="w-full bg-transparent placeholder-zinc-500 focus:outline-none text-sm"
            style={{ color: "var(--text-color)" }}
            autoFocus
          />
          <button 
            onClick={onClose}
            className="text-xs px-2.5 py-1 rounded border opacity-75 hover:opacity-100 transition-opacity"
            style={{ 
              backgroundColor: "var(--card-bg)", 
              borderColor: "var(--card-border)",
              color: "var(--text-color)" 
            }}
          >
            X
          </button>
        </div>

        <div className="overflow-y-auto max-h-[60vh] p-2">
          {loading && (
            <div className="h-48 w-full flex items-center justify-center opacity-70">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          )}

          {!loading && !hasSearched && (
            <div className="h-48 w-full flex items-center justify-center opacity-50 text-sm">
              Start typing to search content...
            </div>
          )}

          {!loading && hasSearched && results.length === 0 && (
            <div className="py-16 text-center">
              <h3 className="text-base font-semibold mb-1">Not found</h3>
              <p className="text-xs opacity-60">
                No results found for "{query}". Try checking for typos or using complete words.
              </p>
            </div>
          )}

          {!loading && results.map((item) => {
            const year = item.release_date ? item.release_date.split('-')[0] : '';
            const posterUrl = item.poster_path 
              ? `https://image.tmdb.org/t/p/w92${item.poster_path}` 
              : 'https://via.placeholder.com/92x138?text=No+Image';

            return (
              <div 
                key={item.id}
                className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
              >
                <img 
                  src={posterUrl} 
                  alt={item.title} 
                  className="w-12 h-16 object-cover rounded-lg bg-zinc-800 shrink-0"
                />
                <div className="flex flex-col overflow-hidden">
                  <h4 className="text-sm font-medium truncate">{item.title}</h4>
                  <p className="text-xs opacity-60 uppercase mt-0.5">
                    {item.media_type} {year ? `• (${year})` : ''}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
}

export default Search;