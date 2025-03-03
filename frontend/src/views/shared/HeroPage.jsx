import React from "react";
import heroImg from "../../assets/hero_img.png";

function HeroPage() {
  return (
    <div className='flex flex-col md:flex-row items-center justify-center gap-10 py-10 lg:gap-40 lg:py-20'>
      <div className='flex flex-col gap-4 items-center'>
        <h1 className='text-7xl'>ATHEA</h1>
        <button className='h-10 px-5 m-2 text-white transition-colors duration-150 bg-[#2b6cb0] rounded-lg focus:shadow-outline hover:bg-[#2c5282]'>
          Log In
        </button>
      </div>
      <img src={heroImg} alt='Robot holding a flower' />
    </div>
  );
}

export default HeroPage;
