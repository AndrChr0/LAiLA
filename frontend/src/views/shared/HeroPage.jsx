import React from "react";
import heroImg from "../../assets/hero_img.png";

function HeroPage() {
  return (
    <div className='flex flex-col items-center justify-center gap-10 py-10 md:flex-row lg:gap-40 lg:py-20'>
      <div className='flex flex-col items-center gap-4'>
        <h1 className='text-7xl'>ATHEA</h1>
        <button onClick={() => window.location.href = "/login"} className='h-10 px-5 m-2 text-white transition-colors duration-150 bg-[#2b6cb0] rounded-lg focus:shadow-outline hover:bg-[#2c5282]'>
          Log In
        </button>
      </div>
      <img src={heroImg} alt='Robot holding a flower' />
    </div>
  );
}

export default HeroPage;
