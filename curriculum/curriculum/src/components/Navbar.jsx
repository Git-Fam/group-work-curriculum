import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import { auth} from '../firebase';
import { signOut } from 'firebase/auth';

const Navbar = () => {

  const navigate = useNavigate();
  const logout = () => {
        navigate("/");
  };

  return (
      <nav>
        <div className='title'>Typing Express</div>
        <button className='navButton logoutButton' onClick={logout}>Logout</button>
      </nav>
  )
}

export default Navbar;
