import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function Nav({role=""}) {

  const { logout } = useAuth();

  console.log(role);
  
 

  
  return (
  <nav>
    <ul className='flex justify-between p-5 bg-gray-200'>
    <li>
        <Link to='/home'>Home</Link>
      </li>
      {role === "lecturer" ? (
        <li>
          <Link to='/reports'>Reports</Link>
        </li>
      ) : null}
    
     {role === "student" ? (
        <li>
          <Link to='/chatbots'>Chatbots</Link>
        </li>
      ) : null}
    
    {role ? (
        <button
          onClick={()=>logout()}
        >Log Out</button>
      ) : null}
      
     
    </ul>

  </nav>
);
}

export default Nav;
