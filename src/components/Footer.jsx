function Footer() {
  return (
    <footer 
      className="w-full border-t pt-12 pb-8 px-6 sm:px-12 transition-colors duration-300"
      style={{ 
        backgroundColor: "var(--search-bg)", 
        borderColor: "var(--card-border)",
        color: "var(--text-color)" 
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
        <div className="md:col-span-2 flex flex-col items-start">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-bold text-lg tracking-wide">El-wagha</span>
          </div>
          <p className="text-xs sm:text-sm opacity-70 max-w-xs leading-relaxed">
            El-wagha Your number one movie/series/anime streaming site
          </p>
        </div>

        <div className="flex flex-col">
          <h4 className="text-xs font-bold uppercase tracking-wider mb-4 opacity-90">El-wagha</h4>
          <ul className="space-y-2.5 text-xs sm:text-sm opacity-70">
            <li><a href="#" className="hover:opacity-100 transition-opacity">About us</a></li>
            <li><a href="#" className="hover:opacity-100 transition-opacity">Contact us</a></li>
            <li><a href="#" className="hover:opacity-100 transition-opacity">FAQs</a></li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h4 className="text-xs font-bold uppercase tracking-wider mb-4 opacity-90">Legal</h4>
          <ul className="space-y-2.5 text-xs sm:text-sm opacity-70">
            <li><a href="#" className="hover:opacity-100 transition-opacity">Terms and condition</a></li>
            <li><a href="#" className="hover:opacity-100 transition-opacity">Privacy policy</a></li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h4 className="text-xs font-bold uppercase tracking-wider mb-4 opacity-90">Contact</h4>
          <p className="text-xs sm:text-sm opacity-70 mb-4">support@shady.site</p>
          <div className="flex items-center gap-3">
            <a 
              href="https://www.linkedin.com/in/shadyasaad/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 opacity-75 hover:opacity-100 transition-all"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </a>
            <a 
              href="https://github.com/shadeasaad" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 opacity-75 hover:opacity-100 transition-all"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t flex flex-col sm:flex-row items-center justify-between text-xs opacity-60" style={{ borderColor: "var(--card-border)" }}>
        <p>© All rights reserved. El-wagha</p>
      </div>
    </footer>
  );
}

export default Footer;