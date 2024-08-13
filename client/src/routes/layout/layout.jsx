import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import './layout.scss';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Layout(){
  return (
    <div className='layout'>
        <Navbar></Navbar>
      <div className="content">
        <Outlet></Outlet>
      </div>
    </div>
  )
}


function RequiredAuth() {
  const {currentUser} = useContext(AuthContext);

  return (
    (!currentUser) ? 
    <Navigate to={'/login'}></Navigate> :
    <div className='layout'>
        <Navbar></Navbar>
      <div className="content">
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export  { Layout, RequiredAuth };