import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {/* Spinner */}
      <svg
        className="custom-spinner"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        ></circle>
      </svg>
      <p className="loader-text">Fetching Records...</p>
    </div>
  );
};

export default Loader;
