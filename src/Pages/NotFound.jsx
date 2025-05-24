import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <img
        src="https://i.ibb.co/zV1p6drw/image.png"
        alt="Not Found"
        className="w-96 h-auto"
      />
      <h2 className="text-2xl font-semibold mt-4">Oops! Page not found.</h2>
    </div>
  );
};

export default NotFound;
