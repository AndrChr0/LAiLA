import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className='flex flex-col items-center justify-center gap-4 py-10'>
      <h1 className='text-4xl'>
        <span className='text-red-500'>404</span> Not Found
      </h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to='/' className='text-blue-500 hover:underline'>
        Go back to the homepage
      </Link>
    </div>
  );
}

export default NotFoundPage;
