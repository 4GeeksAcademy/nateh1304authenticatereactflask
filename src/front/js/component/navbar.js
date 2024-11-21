import React from "react";
import { Link, useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate(); 
  const token = localStorage.getItem("authToken");

  const handleLogout = () => {
    
    localStorage.removeItem("authToken");

   
    navigate("/login");  
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/signup">Signup</Link> 
        </li>
        <li>
          <Link to="/login">Login</Link>  
        </li>
        {token && (
          <>
            <li>
              <Link to="/private">Private</Link>  
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>  
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

