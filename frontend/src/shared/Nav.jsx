import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function Nav({ role = "" }) {
  const { logout } = useAuth();

  console.log(role);

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
          <button
            className='hover:text-gray-600 hover:cursor-pointer'
            onClick={() => logout()}
          >
            Log Out
          </button>
        ) : null}
      </ul>
    </nav>
  );
}

export default Nav;
