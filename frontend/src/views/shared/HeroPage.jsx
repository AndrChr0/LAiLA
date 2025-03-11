import React from "react";
import heroImg from "../../assets/hero_img.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function HeroPage() {
  const { userRole } = useAuth();

  const navigate = useNavigate();

  return (
    <>
      {/* <a
        href='https://www.ntnu.no/studier/bwu'
        target='_blank'
        rel='noreferrer'
      >
        <img
          src='/standard_logo_ntnu.png'
          alt='NTNU logo'
          className='h-10 absolute pt-4'
        />
      </a> */}
      <div className='flex flex-col items-center justify-center gap-10 py-10 md:flex-row lg:gap-40 lg:py-20'>
        <div className='flex flex-col items-center gap-4'>
          <div className='flex items-center gap-2'>
            <img
              src='/athea_logo_svg.svg'
              alt='athea logo of a flower'
              className='h-16'
            />{" "}
            <h1 className='text-7xl'> ATHEA</h1>
          </div>
          {!userRole && (
            <button
              onClick={() => navigate("/login")}
              className='h-10 px-5 m-2 text-white transition-colors duration-150 bg-[#2b6cb0] rounded-lg focus:shadow-outline hover:bg-[#2c5282]'
            >
              Log In
            </button>
          )}
        </div>
        <img src={heroImg} alt='Robot holding a flower' />
      </div>
    </>
  );
}

export default HeroPage;
