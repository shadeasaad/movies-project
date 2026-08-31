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
          <ul className="space-y-2.5 text-xs sm:text-sm opacity-7كية">
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
          <p className="text-xs sm:text-sm opacity-70">support@shady.site</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t flex flex-col sm:flex-row items-center justify-between text-xs opacity-60" style={{ borderColor: "var(--card-border)" }}>
        <p>© All rights reserved. El-wagha</p>
      </div>
    </footer>
  );
}

export default Footer;