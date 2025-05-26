import { useContext, useState } from "react";
import { useLoaderData,Link } from "react-router";
import Swal from "sweetalert2";
import { motion as MOTION } from "framer-motion";
import  { Toaster } from "react-hot-toast";

import { AuthContext } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

const UpdatePost = () => {
    // const { id } = useParams();

    // const navigate = useNavigate();
    const {_id, title, location,rentAmount,roomType,lifestylePreferences,description,contactInfo,availability } = useLoaderData();
    const { currentUser } = useContext(AuthContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { theme } = useTheme();



    const [formData, setFormData] = useState( {
        title: title,
        location: location,
        description: description,
        rentAmount: rentAmount,
        roomType: roomType,
        lifestylePreferences: lifestylePreferences,
        contactInfo: contactInfo,
        availability: availability,
        userName: currentUser?.userName || "",
        userEmail: currentUser?.email || ""
    });


    const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name in formData.lifestylePreferences) {
      setFormData(prev => ({
        ...prev,
        lifestylePreferences: {
          ...prev.lifestylePreferences,
          [name]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };
    console.log(formData)
    console.log(_id)

    const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    fetch(`https://roommate-server-lime.vercel.app/roommate/${_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
        if (data.message === "Group updated successfully") {
            Swal.fire({
                title: "Success!",
                text: "Group updated successfully!",
                icon: "success",
                confirmButtonText: "OK"
            });
        } else {
            Swal.fire({
                title: "Error!",
                text: data.message || "Something went wrong",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    })
    .catch(error => {
        console.error("❌ Update error:", error);
        Swal.fire({
            title: "Error!",
            text: "Failed to update group",
            icon: "error",
            confirmButtonText: "OK"
        });
    });
    setIsSubmitting(false)

    
};



        return (
      <div className={`min-h-screen py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Toaster position="top-center" />
        <div className="max-w-4xl mx-auto px-4">
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
            {/* Header */}
            <div className={`${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-600'} px-6 py-4`}>
              <h1 className="text-2xl font-bold text-white">Update Roommate Listing</h1>
              <p className="text-blue-100">Edit your listing details below</p>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              {/* User Info (Read Only) */}
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Your Name</label>
                  <input
                    type="text"
                    value={currentUser.name}
                    readOnly
                    className={`w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed ${theme === 'dark' ? 'border-gray-700 bg-gray-800 text-gray-300' : 'border-gray-300 bg-gray-100 text-gray-900'}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Your Email</label>
                  <input
                    type="email"
                    value={currentUser.email}
                    readOnly
                    className={`w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed ${theme === 'dark' ? 'border-gray-700 bg-gray-800 text-gray-300' : 'border-gray-300 bg-gray-100 text-gray-900'}`}
                  />
                </div>
              </div>
    
              {/* Listing Details */}
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label htmlFor="title" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                    Listing Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'dark' ? 'border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'}`}
                    placeholder="e.g., Looking for a roommate in NYC"
                  />
                </div>
    
                {/* Location & Rent */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="location" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'dark' ? 'border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'}`}
                      placeholder="City, State"
                    />
                  </div>
                  <div>
                    <label htmlFor="rentAmount" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                      Rent Amount ($) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className={`absolute left-3 top-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>$</span>
                      <input
                        type="number"
                        id="rentAmount"
                        name="rentAmount"
                        value={formData.rentAmount}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className={`w-full pl-8 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'dark' ? 'border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'}`}
                        placeholder="e.g., 1200"
                      />
                    </div>
                  </div>
                </div>
    
                {/* Room Type & Availability */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="roomType" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                      Room Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="roomType"
                      name="roomType"
                      value={formData.roomType}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'dark' ? 'border-gray-700 bg-gray-900 text-gray-100' : 'border-gray-300 bg-white text-gray-900'}`}
                    >
                      <option value="Single">Single Room</option>
                      <option value="Shared">Shared Room</option>
                      <option value="Studio">Studio Apartment</option>
                      <option value="Apartment">Full Apartment</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="availability" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                      Availability <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'dark' ? 'border-gray-700 bg-gray-900 text-gray-100' : 'border-gray-300 bg-white text-gray-900'}`}
                    >
                      <option value="Available">Available</option>
                      <option value="Not Available">Not Available</option>
                      <option value="Soon">Available Soon</option>
                    </select>
                  </div>
                </div>
    
                {/* Lifestyle Preferences */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                    Lifestyle Preferences
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { id: "pets", label: "Pets Friendly" },
                      { id: "smoking", label: "Smoking Allowed" },
                      { id: "nightOwl", label: "Night Owl" },
                      { id: "earlyRiser", label: "Early Riser" },
                      { id: "student", label: "Student" },
                      { id: "professional", label: "Working Professional" }
                    ].map(opt => (
                      <div className="flex items-center" key={opt.id}>
                        <input
                          type="checkbox"
                          id={opt.id}
                          name={opt.id}
                          checked={formData.lifestylePreferences[opt.id]}
                          onChange={handleInputChange}
                          className={`h-4 w-4 text-blue-600 focus:ring-blue-500 rounded ${theme === 'dark' ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-white'}`}
                        />
                        <label htmlFor={opt.id} className={`ml-2 text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                          {opt.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
    
                {/* Description */}
                <div>
                  <label htmlFor="description" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'dark' ? 'border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'}`}
                    placeholder="Tell potential roommates about the place, neighborhood, and what you're looking for..."
                  ></textarea>
                </div>
    
                {/* Contact Info */}
                <div>
                  <label htmlFor="contactInfo" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                    Contact Information <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="contactInfo"
                    name="contactInfo"
                    value={formData.contactInfo}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'dark' ? 'border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'}`}
                    placeholder="Phone number or preferred contact method"
                  />
                  <p className={`mt-1 text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                    This will be displayed publicly on your listing
                  </p>
                </div>
              </div>
    
              {/* Form Actions */}
              <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
                <Link
                  to="/dashboard"
                  className={`px-4 py-2 border rounded-md ${theme === 'dark' ? 'border-gray-700 text-gray-200 bg-gray-800 hover:bg-gray-700' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 rounded-md text-white ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                >
                  {isSubmitting ? 'Updating...' : 'Update Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default UpdatePost;
