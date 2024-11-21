import React, { useEffect, useState, useContext} from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext";

export function Private() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { store, actions } = useContext(Context);


  useEffect(() => {
    const token = localStorage.getItem("authToken");
    actions.private() 

  
  }, []);



  return (
    
    <div>
      <h2>Private Dashboard</h2>
      <p>Welcome to the private section!</p>
    </div>
  );
}
