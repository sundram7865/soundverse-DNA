import React, { useState } from 'react';
import { FaBell, FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Tooltip from './Tooltip';

const TopBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="fixed top-0 left-16 right-0 h-16 bg-soundverse-dark/90 backdrop-blur-md flex items-center justify-between px-6 z-40 border-b border-gray-800">
      {/* Search Bar (Optional) */}
      <div className="hidden md:block w-1/3">
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-800 text-sm rounded-full px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-soundverse-purple"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-4">
        <Tooltip content="Notifications">
          <button className="p-2 rounded-full hover:bg-gray-800 transition-colors relative">
            <FaBell className="text-gray-300 hover:text-white text-lg" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </Tooltip>

        <div className="relative">
          <Tooltip content="Account">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 hover:bg-gray-800 rounded-full p-1 pr-3 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-soundverse-purple flex items-center justify-center">
                <FaUserCircle className="text-white text-xl" />
              </div>
            </button>
          </Tooltip>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-xl z-50 border border-gray-700 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-700">
                <p className="text-sm font-medium text-white">username@soundverse</p>
              </div>
              <div className="py-1">
                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                  <FaUserCircle className="mr-3" /> Profile
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                  <FaCog className="mr-3" /> Settings
                </a>
              </div>
              <div className="py-1 border-t border-gray-700">
                <a href="#" className="flex items-center px-4 py-2 text-sm text-red-400 hover:bg-gray-700">
                  <FaSignOutAlt className="mr-3" /> Sign Out
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;