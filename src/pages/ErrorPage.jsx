import React from "react";
import { useLocation } from "react-router-dom";
import {Link} from "react-router-dom";

const ErrorPage = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    const message = params.get("message");
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-red-600">Error {code}</h1>
        <p className="mt-4 text-lg text-gray-700">{message}</p>
        <Link to='/home'>
          <button 
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </Link>
      </div>
    );
  };

export default ErrorPage;
