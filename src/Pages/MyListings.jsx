import { useState, useEffect, useContext } from "react";
import { Link, useLoaderData } from "react-router";
import { FiEdit, FiTrash2, FiHome, FiDollarSign, FiCalendar } from "react-icons/fi";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import { useTheme } from "../contexts/ThemeContext";

const MyListings = () => {
  const demoListings = useLoaderData();
  const { currentUser } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const {theme} = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      const userListings = demoListings.filter(listing => listing.userEmail === currentUser?.email);
      setListings(userListings);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [demoListings, currentUser]);

  const handleDelete = (id) => {
    // Optimistically update the UI first
    setListings(prevListings => prevListings.filter(listing => listing._id !== id));

    fetch(`https://roommate-server-lime.vercel.app/roommate/${id}`, {
      method: 'DELETE'
    })
    .then(res => {
      if (!res.ok) {
        // If the delete fails, revert the UI change
        setListings(prevListings => [...prevListings, 
          demoListings.find(listing => listing._id === id)
        ].filter(Boolean));
        throw new Error('Failed to delete');
      }
      return res.json();
    })
    .then(data => {
      Swal.fire({
        title: 'Deleted!',
        text: 'Your listing has been deleted.',data,
        icon: 'success'
      });
    })
    .catch(error => {
      console.error("Delete error:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete listing',
        icon: 'error'
      });
    });
  };

  return (
    <div className={`min-h-screen py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>My Roommate Listings</h1>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Manage your posted listings</p>
        </div>

        {/* Add New Listing Button */}
        <div className="mb-6">
          <Link
            to="/add-listing"
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${theme === 'dark' ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            Add New Listing
          </Link>
        </div>

        {/* Listings Table */}
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
          {loading ? (
            <div className="p-8 text-center">
              <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4`}></div>
              <p className={theme === 'dark' ? "text-gray-200" : ""}>Loading your listings...</p>
            </div>
          ) : listings.length === 0 ? (
            <div className="p-8 text-center">
              <div className={`mx-auto ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} rounded-full w-16 h-16 flex items-center justify-center mb-4`}>
                <FiHome className={theme === 'dark' ? "text-gray-500" : "text-gray-400 text-2xl"} />
              </div>
              <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>No listings found</h3>
              <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                You haven't posted any listings yet. Get started by adding one.
              </p>
              <div className="mt-6">
                <Link
                  to="/add-listing"
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${theme === 'dark' ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  Add Your First Listing
                </Link>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className={theme === 'dark' ? "bg-gray-900" : "bg-gray-50"}>
                  <tr>
                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Listing Title
                    </th>
                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      <div className="flex items-center">
                        <FiHome className="mr-1" /> Location
                      </div>
                    </th>
                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      <div className="flex items-center">
                        <FiDollarSign className="mr-1" /> Rent
                      </div>
                    </th>
                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      <div className="flex items-center">
                        <FiCalendar className="mr-1" /> Availability
                      </div>
                    </th>
                    <th scope="col" className={`px-6 py-3 text-right text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className={theme === 'dark' ? "bg-gray-900 divide-y divide-gray-800" : "bg-white divide-y divide-gray-200"}>
                  {listings.map((listing) => (
                    <tr key={listing.id} className={theme === 'dark' ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                      <td className={`px-6 py-4 whitespace-nowrap`}>
                        <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{listing.title}</div>
                        <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Posted on {listing.postedDate}</div>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap`}>
                        <div className={`text-sm ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{listing.location}</div>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap`}>
                        <div className={`text-sm ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>${listing.rent}</div>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap`}>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          listing.availability.includes("Now") 
                            ? (theme === 'dark' ? "bg-green-900 text-green-200" : "bg-green-100 text-green-800")
                            : (theme === 'dark' ? "bg-blue-900 text-blue-200" : "bg-blue-100 text-blue-800")
                        }`}>
                          {listing.availability}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <Link
                            to={`/edit-listing/${listing._id}`}
                            className={theme === 'dark' ? "text-blue-300 hover:text-blue-500 flex items-center" : "text-blue-600 hover:text-blue-900 flex items-center"}
                          >
                            <FiEdit className="mr-1" /> Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(listing._id)}
                            className={theme === 'dark' ? "text-red-400 hover:text-red-600 flex items-center" : "text-red-600 hover:text-red-900 flex items-center"}
                          >
                            <FiTrash2 className="mr-1" /> Delete
                          </button>
                        </div>
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

export default MyListings;