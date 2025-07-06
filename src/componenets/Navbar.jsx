import React, { useEffect, useState } from 'react'; // Import useState
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import { removeUser } from '../utils/userSlice';
import { removeFeed } from '../utils/feedSlice';
import { removeConnections } from '../utils/connectionSlice';
import { removeRequests } from '../utils/requests';

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const requests = useSelector((state) => state.requests);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + 'auth/logout', {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
      dispatch(removeConnections());
      dispatch(removeRequests());
      navigate('/login');
    } catch (err) {
      console.error(err);
      //TODO: maybe redirect to error page 
    }
  };

  return (
    <nav className="bg-gradient-to-r from-red-700 to-black text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-2 py-3 flex justify-between items-center">
        <Link to="/feed" className="flex items-center space-x-3">
          <img src="/main_logo.png" alt="logo" className="w-10 h-10" />
          <span className="text-2xl font-bold text-white tracking-tight">
            Source Mates
          </span>
        </Link>

        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-sm hidden sm:inline">Welcome, {user.firstName}</span>

           
            <div className="relative">
             
              <div
                className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-red-600 cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
              >
                <img src={user.photoURL || "./default_profile_pic.png"} alt="User Avatar" className="w-full h-full object-cover" />
              </div>

             
              {isDropdownOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-20"> 
                  <li>
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/connections" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}> 
                      Connections
                    </Link>
                  </li>
                  <li>
                    <Link to="/requests" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}> 
                      Requests {requests?.length > 0 && <span className="text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5 ml-1"> {requests.length} </span>}
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsDropdownOpen(false); 
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;