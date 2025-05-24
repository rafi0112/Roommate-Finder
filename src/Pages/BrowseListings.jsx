import { useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router";
import { FiSearch, FiHome, FiDollarSign, FiUser, FiCalendar, FiInfo } from "react-icons/fi";

const BrowseListings = () => {
  const loaderData = useLoaderData();
  
  // Transform the data to match expected format
  const transformListings = (data) => {
    if (!data) return [];
    return data.map(listing => ({
      id: listing._id,
      title: listing.title || "No title",
      location: listing.location || "Location not specified",
      rent: parseInt(listing.rentAmount) || 0,
      roomType: listing.roomType || "Not specified",
      user: listing.contactInfo || "Unknown",
      postedDate: new Date().toISOString().split('T')[0],
      availability: listing.availability || "Unknown",
      lifestyle: [
        listing.lifestylePreferences?.pets ? "Pet friendly" : "No pets",
        listing.lifestylePreferences?.smoking ? "Smoking allowed" : "No smoking",
        listing.lifestylePreferences?.nightOwl ? "Night owl" : "",
        listing.lifestylePreferences?.earlyRiser ? "Early riser" : "",
        listing.lifestylePreferences?.student ? "Student preferred" : "",
        listing.lifestylePreferences?.professional ? "Professional preferred" : ""
      ].filter(item => item !== ""),
      description: listing.description || "No description provided"
    }));
  };

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    roomType: "all",
    maxRent: 20000,
    availability: "all"
  });
  
  // Load and transform data
  useEffect(() => {
    if (loaderData) {
      const timer = setTimeout(() => {
        const transformed = transformListings(loaderData);
        setListings(transformed);
        setLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [loaderData]);

  // Filter listings based on search and filters
  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRoomType = filters.roomType === "all" || 
                           listing.roomType.toLowerCase() === filters.roomType.toLowerCase();
    
    const matchesRent = listing.rent <= filters.maxRent;
    
    const matchesAvailability = filters.availability === "all" || 
                               listing.availability.toLowerCase().includes(filters.availability.toLowerCase());
    
    return matchesSearch && matchesRoomType && matchesRent && matchesAvailability;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Browse Roommate Listings</h1>
          <p className="text-gray-600">Find your perfect living situation</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search Listings
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="search"
                  placeholder="Search by title or location..."
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Room Type Filter */}
            <div>
              <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 mb-1">
                Room Type
              </label>
              <select
                id="roomType"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.roomType}
                onChange={(e) => setFilters({...filters, roomType: e.target.value})}
              >
                <option value="all">All Types</option>
                <option value="single">Single Room</option>
                <option value="shared">Shared Room</option>
                <option value="studio">Studio</option>
              </select>
            </div>

            {/* Max Rent Filter */}
            <div>
              <label htmlFor="maxRent" className="block text-sm font-medium text-gray-700 mb-1">
                Max Rent: ${filters.maxRent}
              </label>
              <input
                type="range"
                id="maxRent"
                min="500"
                max="20001"
                step="100"
                className="w-full"
                value={filters.maxRent}
                onChange={(e) => setFilters({...filters, maxRent: parseInt(e.target.value)})}
              />
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredListings.length} listings (from {listings.length} total)
        </div>

        {/* Listings Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p>Loading listings...</p>
            </div>
          ) : filteredListings.length === 0 ? (
            <div className="p-8 text-center">
              <FiInfo className="mx-auto text-gray-400 text-4xl mb-3" />
              <h3 className="text-lg font-medium text-gray-900">No listings found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Listing
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <FiHome className="mr-1" /> Location
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <FiDollarSign className="mr-1" /> Rent
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <FiUser className="mr-1" /> Posted By
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <FiCalendar className="mr-1" /> Availability
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredListings.map((listing) => (
                    <tr key={listing.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{listing.title}</div>
                        <div className="text-sm text-gray-500">{listing.roomType}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          {listing.lifestyle.join(', ')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{listing.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${listing.rent.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{listing.user}</div>
                        <div className="text-sm text-gray-500">{listing.postedDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          listing.availability.includes("Available") 
                            ? "bg-green-100 text-green-800" 
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {listing.availability}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/listings/${listing.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          See More →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseListings;