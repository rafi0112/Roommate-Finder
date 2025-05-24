import { useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Typewriter } from "react-simple-typewriter";
import { Fade } from "react-awesome-reveal";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Home = () => {
  const [featuredRoommates, setFeaturedRoommates] = useState([]);
  const [loading, setLoading] = useState(true);
  const allRoommates = useLoaderData();

  useEffect(() => {
  const timer = setTimeout(() => {
    // ✅ Shuffle the array before selecting 6 random roommates
    const shuffledRoommates = [...allRoommates].sort(() => 0.5 - Math.random());
    
    // ✅ Pick first 6 roommates after shuffle
    const featured = shuffledRoommates.slice(0, 6).map(roommate => ({
      _id: roommate._id,
      name: roommate.userName || "Anonymous",
      image: roommate.imageUrl || "https://randomuser.me/api/portraits/lego/1.jpg",
      location: roommate.location || "Location not specified",
      budget: `${roommate.rentAmount}` || "Not specified",
      interests: [
        roommate.lifestylePreferences?.student ? "Student" : "",
        roommate.lifestylePreferences?.professional ? "Professional" : "",
        roommate.lifestylePreferences?.pets ? "Pet Lover" : "",
        roommate.lifestylePreferences?.smoking ? "Smoker" : "Non-smoker",
        roommate.lifestylePreferences?.nightOwl ? "Night Owl" : "",
        roommate.lifestylePreferences?.earlyRiser ? "Early Riser" : ""
      ].filter(Boolean),
      lifestyle: roommate.lifestylePreferences?.professional ? "Professional" : 
                roommate.lifestylePreferences?.student ? "Student" : "Not specified",
      availableFrom: roommate.availability || "Not specified"
    }));

    setFeaturedRoommates(featured);
    setLoading(false);
  }, 1000);

  return () => clearTimeout(timer);
}, [allRoommates]);


  return (
    <div className="min-h-screen">
      {/* Banner Slider */}
          <section className="mb-12">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper rounded-lg overflow-hidden shadow-xl"
      >
        <SwiperSlide>
          <div className="relative h-96 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
            <Fade duration={800}>
              <div className="text-center px-4">
                <h2 className="text-4xl font-bold mb-4">
                  <Typewriter words={["Find Your Perfect Roommate", "Make Lifelong Connections"]} loop={true} />
                </h2>
                <p className="text-xl mb-6">Compatibility based on lifestyle, budget, and interests</p>
                <Link to="/register" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
                  Get Started
                </Link>
              </div>
            </Fade>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative h-96 bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center text-white">
            <Fade duration={800}>
              <div className="text-center px-4">
                <h2 className="text-4xl font-bold mb-4">
                  <Typewriter words={["Safe and Verified Profiles", "A Trustworthy Community"]} loop={true} />
                </h2>
                <p className="text-xl mb-6">All users go through our verification process</p>
                <Link to="/search" className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
                  Browse Roommates
                </Link>
              </div>
            </Fade>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative h-96 bg-gradient-to-r from-orange-500 to-pink-600 flex items-center justify-center text-white">
            <Fade duration={800}>
              <div className="text-center px-4">
                <h2 className="text-4xl font-bold mb-4">
                  <Typewriter words={["Save on Living Costs", "Affordable Housing Made Easy"]} loop={true} />
                </h2>
                <p className="text-xl mb-6">Find roommates with similar budgets in your area</p>
                <Link to="/how-it-works" className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
                  Learn How It Works
                </Link>
              </div>
            </Fade>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>

      {/* Featured Roommates Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Featured Roommates</h2>
          <Link to="/browse-listings" className="text-blue-600 hover:text-blue-800 font-medium">View All →</Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-4 h-80 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRoommates.map((roommate) => (
              <div key={roommate._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48 bg-gray-100">
                  <img 
                    src={roommate.image} 
                    alt={roommate.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://randomuser.me/api/portraits/lego/1.jpg";
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-xl font-bold text-white">{roommate.name}</h3>
                    <p className="text-gray-200 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {roommate.location}
                    </p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                      {roommate.budget}/month
                    </span>
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      roommate.availableFrom.includes("Available") 
                        ? "bg-green-100 text-green-800" 
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {roommate.availableFrom}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{roommate.description || "No description provided"}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {roommate.interests.slice(0, 3).map((interest, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                        {interest}
                      </span>
                    ))}
                    {roommate.interests.length > 3 && (
                      <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                        +{roommate.interests.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <Link 
                    to={`/roommate/${roommate._id}`} 
                    className="block w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-center py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-16 mb-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Create Your Profile</h3>
              <p className="text-gray-600">
                Set up your profile with your preferences, lifestyle habits, and budget to help us find your perfect match.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Find Matches</h3>
              <p className="text-gray-600">
                Browse through compatible roommates in your desired location and budget range.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect & Move In</h3>
              <p className="text-gray-600">
                Message potential roommates, meet up, and finalize your living arrangements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md relative">
            <div className="absolute -top-4 -left-4 text-6xl text-gray-200">"</div>
            <div className="flex items-center mb-4">
              <img 
                src="https://randomuser.me/api/portraits/women/32.jpg" 
                alt="Sarah K." 
                className="w-12 h-12 rounded-full mr-4 border-2 border-blue-500"
              />
              <div>
                <h4 className="font-semibold">Sarah K.</h4>
                <p className="text-gray-500 text-sm">New York, NY</p>
              </div>
            </div>
            <p className="text-gray-700 relative z-10">
              "I was nervous about finding a roommate after moving to a new city, but this platform made it so easy. 
              My roommate and I have similar work schedules and both love hiking. It's been 6 months and we're already 
              planning to renew our lease together!"
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md relative">
            <div className="absolute -top-4 -left-4 text-6xl text-gray-200">"</div>
            <div className="flex items-center mb-4">
              <img 
                src="https://randomuser.me/api/portraits/men/45.jpg" 
                alt="Michael T." 
                className="w-12 h-12 rounded-full mr-4 border-2 border-blue-500"
              />
              <div>
                <h4 className="font-semibold">Michael T.</h4>
                <p className="text-gray-500 text-sm">Austin, TX</p>
              </div>
            </div>
            <p className="text-gray-700 relative z-10">
              "The compatibility matching really works! My roommate and I have become good friends. 
              We both work in tech, enjoy cooking, and have similar cleanliness standards. 
              I couldn't have asked for a better living situation."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;