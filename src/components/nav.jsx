import { useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search as SearchIcon, Menu, X, Home, Film, Tv, Settings, RotateCw, CloudMoon, Contrast, AlignLeft, Minimize2, Palette, User, LogOut } from "lucide-react";
import { useGSAP } from "@gsap/react";
import NavSet from "./NavSet";
import gsap from "gsap";
import Search from "./Search";

function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentLocation = location.pathname;

  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem("currentUser");
    try {
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/login");
  };

  const navLinks = [
    { id: 1, label: "Home", href: "/", icon: Home },
    { id: 2, label: "Movies", href: "/movies", icon: Film },
    { id: 3, label: "TV", href: "/TV", icon: Tv },
    { id: 4, label: "Anime", href: "/anime", icon: Tv },
    currentUser
      ? { id: 5, label: currentUser.userName, href: "#", icon: User, isUser: true }
      : { id: 5, label: "Login / Register", href: "/login", icon: User },
  ];

  const settingsIconRef = useRef(null);
  const settingsMobileIconRef = useRef(null);

  useGSAP(() => {
    if (settingsIconRef.current) {
      gsap.to(settingsIconRef.current, {
        rotate: "+=360",
        duration: 5,
        ease: "none",
        repeat: -1,
      });
    }
    if (settingsMobileIconRef.current) {
      gsap.to(settingsMobileIconRef.current, {
        rotate: "+=360",
        duration: 5,
        ease: "none",
        repeat: -1,
      });
    }
  }, []);

  const [active, setActive] = useState(false);
  const [activeSet, setActiveSet] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("isDarkMode");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [isContrast, setIsContrast] = useState(() => {
    const saved = localStorage.getItem("isContrast");
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [isRTL, setIsRTL] = useState(() => {
    const saved = localStorage.getItem("isRTL");
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [isCompact, setIsCompact] = useState(() => {
    const saved = localStorage.getItem("isCompact");
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem("currentTheme") || "green";
  });

  const themes = {
    green: { primary: "#10b981", bg: "rgba(16, 185, 129, 0.1)" },
    blue: { primary: "#3b82f6", bg: "rgba(59, 130, 246, 0.1)" },
    purple: { primary: "#a855f7", bg: "rgba(168, 85, 247, 0.1)" },
    skyblue: { primary: "#60a5fa", bg: "rgba(96, 165, 250, 0.1)" },
    amber: { primary: "#f59e0b", bg: "rgba(245, 158, 11, 0.1)" },
    red: { primary: "#ef4444", bg: "rgba(239, 68, 68, 0.1)" },
  };

  const handleThemeChange = (themeName) => {
    setCurrentTheme(themeName);
    localStorage.setItem("currentTheme", themeName);
    document.documentElement.style.setProperty("--primary-color", themes[themeName].primary);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("isContrast", JSON.stringify(isContrast));
  }, [isContrast]);

  useEffect(() => {
    localStorage.setItem("isRTL", JSON.stringify(isRTL));
  }, [isRTL]);

  useEffect(() => {
    localStorage.setItem("isCompact", JSON.stringify(isCompact));
  }, [isCompact]);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    document.documentElement.style.setProperty("--primary-color", themes[currentTheme]?.primary || themes.green.primary);
  }, []);

  useEffect(() => {
    if (active || activeSet || isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [active, activeSet, isSearchOpen]);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleResetToDefaults = () => {
    localStorage.clear();
    setIsDarkMode(true);
    setIsContrast(false);
    setIsRTL(false);
    setIsCompact(false);
    setCurrentTheme("green");
    document.documentElement.classList.add("dark");
    document.documentElement.style.setProperty("--primary-color", themes.green.primary);
  };

  const isModified = !isDarkMode || isContrast || isRTL || isCompact || currentTheme !== "green";

  const settingsItems = [
    {
      label: "Dark mode",
      icon: CloudMoon,
      state: isDarkMode,
      onToggle: handleThemeToggle,
    },
    {
      label: "Contrast",
      icon: Contrast,
      state: isContrast,
      onToggle: () => setIsContrast(!isContrast),
    },
    {
      label: "Right to left",
      icon: AlignLeft,
      state: isRTL,
      onToggle: () => setIsRTL(!isRTL),
    },
    {
      label: "Compact",
      icon: Minimize2,
      state: isCompact,
      onToggle: () => setIsCompact(!isCompact),
    },
  ];

  return (
    <>
      <nav
        className="flex justify-between items-center fixed w-full px-4 sm:px-6 h-18 z-30 transition-colors duration-300 shadow-sm backdrop-blur-md bg-opacity-70 dark:bg-opacity-70"
        style={{ backgroundColor: "var(--nav-bg)", color: "var(--text-color)" }}
      >
        <div className="logo flex items-center gap-4">
          <div className="menu" onClick={() => setActive(!active)}>
            <Menu className="sm:hidden cursor-pointer w-6 h-6 hover:opacity-75 transition-opacity" />
          </div>
          <img
            src="/favicon.png"
            alt="logo"
            className="w-8 h-8 rounded-full object-contain"
            style={{ backgroundColor: "var(--primary-color)" }}
          />
        </div>

        <div className="hidden sm:flex items-center gap-6">
          <ul className="flex flex-row items-center gap-1">
            {navLinks.map((item) => {
              const isActive = currentLocation === item.href;

              return (
                <li key={item.id} className="group flex items-center">
                  <Link
                    to={item.href}
                    onClick={(e) => {
                      if (item.isUser) {
                        e.preventDefault();
                      }
                    }}
                    className={`text-sm font-bold relative p-4 font-sans transition-all flex items-center gap-2 ${
                      isActive ? "" : "opacity-80 hover:opacity-100 duration-300"
                    }`}
                    style={isActive ? { color: "var(--primary-color)" } : { color: "var(--text-color)" }}
                  >
                    {isActive ? (
                      <span
                        className="w-2 h-2 rounded-full inline-block transition-all duration-700"
                        style={{ backgroundColor: "var(--primary-color)" }}
                      />
                    ) : (
                      <span
                        className="w-2 h-2 rounded-full inline-block bg-transparent group-hover:bg-[var(--text-color)] transition-all duration-300"
                      />
                    )}
                    {item.label}
                  </Link>

                  {item.isUser && (
                    <button
                      onClick={handleLogout}
                      title="Logout"
                      className="text-xs px-2 py-1 ml-1 rounded bg-neutral-800 text-neutral-300 hover:text-white hover:bg-red-600 transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <LogOut size={14} />
                      Logout
                    </button>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-4">
            <SearchIcon
              className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
              onClick={() => setIsSearchOpen(true)}
            />
            <span
              ref={settingsIconRef}
              className="inline-flex items-center justify-center cursor-pointer transition-opacity"
            >
              <Settings
                className="w-5 h-5"
                onClick={() => setActiveSet(!activeSet)}
              />
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:hidden">
          <SearchIcon
            className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
            onClick={() => setIsSearchOpen(true)}
          />
          <span
            ref={settingsMobileIconRef}
            className="inline-flex items-center justify-center cursor-pointer transition-opacity"
          >
            <Settings
              className="w-5 h-5"
              onClick={() => setActiveSet(!activeSet)}
            />
          </span>
        </div>
      </nav>

      {active && (
        <div
          className="fixed inset-0 bg-black/50 z-40 sm:hidden backdrop-blur-xs"
          onClick={() => setActive(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-72 max-w-[85vw] z-50 transform transition-transform duration-300 ease-in-out flex flex-col justify-between p-6 shadow-xl backdrop-blur-xl bg-opacity-80 dark:bg-opacity-80 ${
          active ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "var(--drawer-bg)", color: "var(--text-color)" }}
      >
        <div>
          <div className="flex items-center justify-between mb-8 pt-2">
            <img
              src="/favicon.png"
              alt="logo"
              className="w-8 h-8 rounded-full object-contain"
              style={{ backgroundColor: "var(--primary-color)" }}
            />
            <X
              className="w-6 h-6 cursor-pointer opacity-75 hover:opacity-100 transition-opacity"
              onClick={() => setActive(false)}
            />
          </div>

          <ul className="flex flex-col gap-2">
            {navLinks.map((item) => {
              const IconComponent = item.icon;
              const isActive = currentLocation === item.href;

              return (
                <li key={item.id} className="flex flex-col">
                  <Link
                    to={item.href}
                    onClick={(e) => {
                      if (item.isUser) {
                        e.preventDefault();
                      } else {
                        setActive(false);
                      }
                    }}
                    className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                      isActive ? "font-bold bg-black/5 dark:bg-white/10" : "opacity-75 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                    style={isActive ? { color: "var(--primary-color)" } : { color: "var(--text-color)" }}
                  >
                    {IconComponent && <IconComponent className="w-5 h-5" />}
                    {item.label}
                  </Link>

                  {item.isUser && (
                    <button
                      onClick={() => {
                        setActive(false);
                        handleLogout();
                      }}
                      className="mt-1 flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors w-full"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {activeSet && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-xs"
          onClick={() => setActiveSet(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[410px] z-50 transform transition-transform duration-300 ease-in-out flex flex-col justify-between p-6 shadow-xl overflow-y-auto backdrop-blur-xl bg-opacity-80 dark:bg-opacity-80 ${
          activeSet ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: "var(--drawer-bg)", color: "var(--text-color)" }}
      >
        <div>
          <div className="flex items-center justify-between mb-6 pt-2">
            <p className="font-sans font-bold text-lg">Settings</p>
            <div className="icon flex gap-2">
              <button
                onClick={handleResetToDefaults}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors relative flex items-center justify-center"
              >
                <RotateCw className="w-4.5 h-4.5 cursor-pointer opacity-75 hover:opacity-100 transition-opacity" />
                {isModified && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>
              <button
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center justify-center"
                onClick={() => setActiveSet(false)}
              >
                <X className="w-4.5 h-4.5 cursor-pointer opacity-75 hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>

          <div className="components">
            <NavSet
              settingsList={settingsItems}
              currentTheme={currentTheme}
              onThemeChange={handleThemeChange}
            />
          </div>
        </div>
      </div>

      <Search isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

export default Nav;