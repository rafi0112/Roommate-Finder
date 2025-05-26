import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { motion as MOTION } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <FaFacebook />, url: "#" },
    { icon: <FaTwitter />, url: "#" },
    { icon: <FaInstagram />, url: "#" },
    { icon: <FaLinkedin />, url: "#" }
  ];

  const quickLinks = [
    { name: "Home", url: "/" },
    { name: "Browse Listings", url: "/browse-listings" },
    { name: "Add Listing", url: "/add-listing" },
    { name: "About Us", url: "/about" },
    { name: "Safety Tips", url: "/safety" },
    { name: "Privacy Policy", url: "/privacy" }
  ];

  const contactInfo = [
    { type: "Email", value: "support@roommatefinder.com" },
    { type: "Phone", value: "+1 (555) 123-4567" },
    { type: "Address", value: "123 Housing Ave, Suite 100" }
  ];

  return (
            <footer className={`w-full pt-12 pb-8 px-4 sm:px-8 lg:px-16
        bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 text-white
      `}
      >     
        <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <MOTION.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <span className="bg-white text-blue-600 font-bold text-xl px-3 py-1 rounded-lg">RF</span>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                Roommate Finder
              </h3>
            </MOTION.div>
            <p className="text-gray-400">
              Find your perfect roommate match based on lifestyle, budget, and preferences.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((link, index) => (
                <MOTION.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-xl transition-colors"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.icon}
                </MOTION.a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-2">
              {quickLinks.map((link, index) => (
                <MOTION.li 
                  key={index}
                  whileHover={{ x: 5 }}
                >
                  <a 
                    href={link.url} 
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    {link.name}
                  </a>
                </MOTION.li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start">
                  <div className="text-blue-400 mt-1 mr-3">
                    {info.type === "Email" && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                    {info.type === "Phone" && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    )}
                    {info.type === "Address" && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">{info.type}</p>
                    <p className="text-white">{info.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Stay Updated</h4>
            <p className="text-gray-400 mb-4">Get tips for finding roommates and housing updates</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 w-full rounded-l-lg focus:outline-none text-gray-900"
                required
              />
              <MOTION.button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </MOTION.button>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Roommate Finder. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/terms" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="/safety" className="text-gray-500 hover:text-white text-sm transition-colors">Safety Tips</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;