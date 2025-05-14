import React from "react";

export default function Footer() {
  return (
    <footer className='flex flex-col items-center justify-center gap-4 py-6 mt-20 text-sm text-gray-600 border-t border-gray-300'>
      <div className='flex items-center gap-6'>
        <a href='https://www.ntnu.no/studier/bwu' target='_blank'>
          <img src='/standard_logo_ntnu.png' alt='NTNU logo' className='h-7' />
        </a>
        <p className='font-medium text-gray-700'>NTNU Gjøvik - Bachelor Project Group 10</p>
      </div>
      <p className='text-xs'>&copy; 2025 NTNU Gjøvik. All rights reserved.</p>
    </footer>
  );
}
