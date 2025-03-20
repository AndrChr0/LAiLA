import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import instance from "../utils/axiosInstance";
import { GetConfig } from "../utils/GetConfig";

function Nav({ role = "" }) {
  const profileMenu = useRef(null);
  const [userDetails, setUserDetails] = useState({});
  const { logout, token } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

useEffect(() => {
  instance.get("/api/auth/user", GetConfig(token))
    .then((response) => {
      setUserDetails(response.data);
    })
    .catch((error) => {
      console.error("Failed to get user", error);
    });
}, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileMenu.current && !profileMenu.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className='border-b border-gray-200 mb-4'>
      <ul className='flex justify-between  p-5 bg-white px-[5dvw] font-semibold text-sm'>
        <div className='flex gap-4 md:gap-8 items-center'>
          <Link to='/home'>
            <img className='h-8' src='/athea_logo_svg.svg' alt='athea logo' />
          </Link>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "hover:text-black border-b border-black"
                  : "hover:text-gray-600"
              }
              to='/home'
            >
              Home
            </NavLink>
          </li>
          {role === "lecturer" ? (
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "hover:text-black border-b border-black"
                    : "hover:text-gray-600"
                }
                to='/reports'
              >
                Reports
              </NavLink>
            </li>
          ) : null}

          {role === "student" ? (
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "hover:text-black border-b border-black"
                    : "hover:text-gray-600"
                }
                to='/chatbots'
              >
                Chatbots
              </NavLink>
            </li>
          ) : null}
        </div>
        {role ? (
          <>
            <button
              className='hover:text-gray-600 hover:cursor-pointer'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <FaRegUser size={25} />
            </button>

            {isMenuOpen ? (
              <div
                ref={profileMenu}
                className='absolute bg-white border border-gray-200 rounded-md p-2 right-10 top-15'
              >
                {userDetails?.first_name && userDetails?.last_name && userDetails?.email ?(
                  <>
                  <div className='font-normal'>
                    {userDetails.first_name} {userDetails.last_name}
                  </div>
                  <div className='font-light'>{userDetails.email}</div>
                  </>
                ) : (
                  <div className='font-light'>Ola Nordmann</div>
                )}
                <button
                  className='flex items-center gap-1 hover:text-gray-600 hover:cursor-pointer'
                  onClick={() => logout()}
                >
                  Log out
                  <IoIosLogOut size={20} />
                </button>
              </div>
            ) : null}
          </>
        ) : null}
      </ul>
    </nav>
  );
}

export default Nav;
