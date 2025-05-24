import { NavLink } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useState, useEffect, useRef, useContext } from "react";
import { FiSun, FiMoon, FiUser, FiLogOut, FiPlus, FiHome, FiSearch, FiList, FiMenu, FiX } from "react-icons/fi";
import { motion as MOTION, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const links = [
    { path: "/", label: "Home", icon: <FiHome className="mr-2" />, private: false },
    { path: "/browse-listings", label: "Browse", icon: <FiSearch className="mr-2" />, private: false },
    { path: "/add-listing", label: "Add Listing", icon: <FiPlus className="mr-2" />, private: true },
    { path: "/my-listings", label: "My Listings", icon: <FiList className="mr-2" />, private: true }
  ];

  // Dynamic colors based on theme
  const navBg = theme === 'light' ? 'bg-white' : 'bg-gray-900';
  const navText = theme === 'light' ? 'text-gray-800' : 'text-gray-100';
  const navBorder = theme === 'light' ? 'border-gray-200' : 'border-gray-700';
  const navShadow = theme === 'light' ? 'shadow-md' : 'shadow-lg';
  const activeBg = theme === 'light' ? 'bg-blue-100' : 'bg-blue-900';
  const activeText = theme === 'light' ? 'text-blue-700' : 'text-blue-300';
  const hoverBg = theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-800';
  console.log(currentUser)

  return (
    <nav className={`${navBg} ${navText} ${navShadow} sticky top-0 z-50 border-b ${navBorder}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            <MOTION.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${hoverBg} transition mr-2`}
              aria-label="Toggle menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </MOTION.button>

            <MOTION.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <NavLink to="/" className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                  <div className={`${theme === 'light' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'} px-3 py-2 rounded-lg font-bold text-xl shadow-sm`}>
                    RF
                  </div>
                  <span className={`ml-3 text-xl font-bold hidden sm:inline ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                    Roommate Finder
                  </span>
                </div>
              </NavLink>
            </MOTION.div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {links.map(({ path, label, icon, private: isPrivate }) =>
              (!isPrivate || currentUser) && (
                <MOTION.div key={path} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 rounded-lg transition-all mx-1 ${
                        isActive 
                          ? `${activeBg} ${activeText} font-semibold shadow-sm` 
                          : `${hoverBg}`
                      }`
                    }
                  >
                    {icon}
                    {label}
                  </NavLink>
                </MOTION.div>
              )
            )}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <MOTION.button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${hoverBg} transition`}
              aria-label="Toggle theme"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === "light" ? 
                <FiMoon size={20} className="text-gray-700" /> : 
                <FiSun size={20} className="text-yellow-300" />
              }
            </MOTION.button>

            {/* User Dropdown or Login Button */}
            {currentUser ? (
              <div className="relative" ref={dropdownRef}>
                <MOTION.button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-full ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'} flex items-center justify-center border-2 ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'} hover:border-blue-500 transition-all shadow-sm`}>
                      {currentUser.photoURL ? (
                        <img 
                          src={currentUser.photoURL} 
                          alt="Profile" 
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <FiUser className={theme === 'light' ? "text-gray-700" : "text-gray-300"} size={18} />
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                </MOTION.button>

                {/* Animated Dropdown */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <MOTION.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ type: "spring", damping: 20, stiffness: 300 }}
                      className={`absolute right-0 mt-2 w-56 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-xl shadow-2xl py-2 z-50 ${theme === 'light' ? 'text-gray-800' : 'text-gray-100'} overflow-hidden border ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}
                    >
                      <div className={`px-4 py-3 ${theme === 'light' ? 'bg-blue-600' : 'bg-blue-700'} text-white`}>
                        <p className="font-semibold truncate">{currentUser.displayName || "User"}</p>
                        <p className="text-sm text-white/80 truncate">{currentUser.email || "user@example.com"}</p>
                      </div>
                      <MOTION.button
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={logout}
                        className={`flex items-center w-full px-4 py-3 text-left ${theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-700'} transition-colors`}
                      >
                        <FiLogOut className="mr-2 text-red-500" />
                        <span>Sign Out</span>
                      </MOTION.button>
                    </MOTION.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <MOTION.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <NavLink
                  to="/login"
                  className={`${theme === 'light' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-700 text-white hover:bg-blue-600'} px-4 py-2 rounded-lg font-medium transition flex items-center shadow-sm hover:shadow-md`}
                >
                  <FiUser className="mr-2" />
                  <span className="hidden sm:inline">Sign In</span>
                  <span className="sm:hidden">Login</span>
                </NavLink>
              </MOTION.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <MOTION.div
            className={`md:hidden ${theme === 'light' ? 'bg-white' : 'bg-gray-900'} py-4 px-4 absolute top-16 left-0 w-full shadow-xl z-50 border-b ${navBorder}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex flex-col space-y-2">
              {links.map(({ path, label, icon, private: isPrivate }) =>
                (!isPrivate || currentUser) && (
                  <MOTION.div
                    key={path}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <NavLink
                      to={path}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center py-3 px-4 rounded-lg text-lg ${
                          isActive 
                            ? `${activeBg} ${activeText} font-semibold shadow-sm` 
                            : `${hoverBg}`
                        }`
                      }
                    >
                      {icon}
                      {label}
                    </NavLink>
                  </MOTION.div>
                )
              )}
            </div>
          </MOTION.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;