import { useParams } from "react-router";
import { useLoaderData } from "react-router";
import { motion as MOTION } from "framer-motion";
import { useState, useContext } from "react";
import { FiHome, FiDollarSign, FiUser, FiCalendar, FiInfo, FiMail, FiPhone, FiHeart, FiThumbsUp } from "react-icons/fi";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const GroupDetailsID = () => {
    const { id } = useParams();
    const listings = useLoaderData();
    const { currentUser } = useContext(AuthContext);
    const listingDetails = listings.find(listing => String(listing._id) === String(id));
    
    // State for like functionality
    const [likeCount, setLikeCount] = useState(listingDetails?.likes?.length || 0);
    const [hasLiked, setHasLiked] = useState(
        listingDetails?.likes?.includes(currentUser?.email) || false
    );
    const [contactVisible, setContactVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Check if current user is the owner
    const isOwner = currentUser?.email === listingDetails?.userEmail;

    const handleLike = async () => {
    if (isOwner || !currentUser) return;
    
    setIsSubmitting(true);
    
    try {
        const response = await fetch(`http://localhost:3000/roommate/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${currentUser.token}`
            },
            body: JSON.stringify({
                userEmail: currentUser.email,
                action: hasLiked ? 'unlike' : 'like'
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to update like status");
        }

        // Update local state
        setLikeCount(data.likes.length);
        setHasLiked(!hasLiked);
        if (!hasLiked) setContactVisible(true);
        
        Swal.fire({
            title: "Success!",
            text: hasLiked ? "Removed from your interests" : "Added to your interests!",
            icon: "success",
            confirmButtonText: "OK"
        });
    } catch (error) {
        console.error("Error updating like:", error);
        Swal.fire({
            title: "Error!",
            text: error.message || "Failed to update like status",
            icon: "error",
            confirmButtonText: "OK"
        });
    } finally {
        setIsSubmitting(false);
    }
};



    if (!listingDetails) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center text-red-500 text-xl p-6 bg-white rounded-lg shadow-md">
                    Listing not found
                </div>
            </div>
        );
    }

    // Format lifestyle preferences
    const lifestyleTags = [
        listingDetails.lifestylePreferences?.pets ? "Pet Friendly" : "No Pets",
        listingDetails.lifestylePreferences?.smoking ? "Smoking Allowed" : "No Smoking",
        listingDetails.lifestylePreferences?.nightOwl ? "Night Owl" : "",
        listingDetails.lifestylePreferences?.earlyRiser ? "Early Riser" : "",
        listingDetails.lifestylePreferences?.student ? "Student Preferred" : "",
        listingDetails.lifestylePreferences?.professional ? "Professional Preferred" : ""
    ].filter(tag => tag !== "");

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <MOTION.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Header with image */}
                    <div className="relative h-64 w-full bg-gradient-to-r from-blue-500 to-indigo-600">
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <MOTION.h1 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-3xl md:text-4xl font-bold text-white text-center px-4"
                            >
                                {listingDetails.title}
                            </MOTION.h1>
                        </div>
                        
                        {/* Like count display */}
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                            <span className="text-sm font-medium text-indigo-700 flex items-center">
                                <FiHeart className="mr-1" />
                                {likeCount} {likeCount === 1 ? 'person' : 'people'} interested
                            </span>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="p-6 md:p-8">
                        {/* Basic info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <MOTION.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex items-center"
                            >
                                <FiHome className="text-indigo-600 text-xl mr-2" />
                                <div>
                                    <p className="text-sm text-gray-500">Location</p>
                                    <p className="font-medium">{listingDetails.location}</p>
                                </div>
                            </MOTION.div>

                            <MOTION.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="flex items-center"
                            >
                                <FiDollarSign className="text-indigo-600 text-xl mr-2" />
                                <div>
                                    <p className="text-sm text-gray-500">Rent</p>
                                    <p className="font-medium">${listingDetails.rentAmount}/month</p>
                                </div>
                            </MOTION.div>

                            <MOTION.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex items-center"
                            >
                                <FiCalendar className="text-indigo-600 text-xl mr-2" />
                                <div>
                                    <p className="text-sm text-gray-500">Availability</p>
                                    <p className={`font-medium ${
                                        listingDetails.availability === "Available" 
                                            ? "text-green-600" 
                                            : "text-red-600"
                                    }`}>
                                        {listingDetails.availability}
                                    </p>
                                </div>
                            </MOTION.div>
                        </div>

                        {/* Room type and lifestyle tags */}
                        <MOTION.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mb-8"
                        >
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                                    {listingDetails.roomType}
                                </span>
                                {lifestyleTags.map((tag, index) => (
                                    <span 
                                        key={index}
                                        className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </MOTION.div>

                        {/* Description */}
                        <MOTION.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mb-8"
                        >
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Description</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {listingDetails.description || "No description provided."}
                            </p>
                        </MOTION.div>

                        {/* Contact information */}
                        <MOTION.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="bg-gray-50 p-6 rounded-lg mb-6"
                        >
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <FiUser className="text-indigo-600 mr-3" />
                                    <span className="text-gray-700">Posted by: {listingDetails.userEmail || "Not specified"}</span>
                                </div>
                                {currentUser && (
                                    <>
                                        {(contactVisible || isOwner) && (
                                            <div className="flex items-center">
                                                <FiPhone className="text-indigo-600 mr-3" />
                                                <span className="text-gray-700">Phone: {listingDetails.contactInfo || "Not provided"}</span>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </MOTION.div>

                        {/* Action buttons */}
                        <MOTION.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="mt-6 flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            {!currentUser ? (
                                <button 
                                    className="bg-gray-300 text-gray-500 font-medium py-3 px-6 rounded-lg cursor-not-allowed"
                                    disabled
                                >
                                    Log in to show interest
                                </button>
                            ) : (
                                <button 
                                    onClick={handleLike}
                                    disabled={isOwner || isSubmitting}
                                    className={`flex items-center justify-center gap-2 font-medium py-3 px-6 rounded-lg transition duration-300 shadow-md ${
                                        isOwner 
                                            ? "bg-gray-300 cursor-not-allowed text-gray-500"
                                            : hasLiked
                                                ? "bg-green-100 text-green-700 cursor-default"
                                                : isSubmitting
                                                    ? "bg-blue-400 text-white"
                                                    : "bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-lg"
                                    }`}
                                >
                                    {hasLiked ? (
                                        <>
                                            <FiThumbsUp className="text-lg" />
                                            Liked
                                        </>
                                    ) : (
                                        <>
                                            <FiHeart className="text-lg" />
                                            {isSubmitting ? "Processing..." : isOwner ? "Can't like your own" : "I'm Interested"}
                                        </>
                                    )}
                                </button>
                            )}
                            
                            {currentUser && (
                                <a 
                                    href={`mailto:${listingDetails.userEmail}`}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg text-center"
                                >
                                    Contact Now
                                </a>
                            )}
                        </MOTION.div>
                    </div>
                </div>
            </MOTION.div>
        </div>
    );
};

export default GroupDetailsID;