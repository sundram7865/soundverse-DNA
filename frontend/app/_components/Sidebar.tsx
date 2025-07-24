import React from 'react';
import { 
  FaHome, 
  FaSearch, 
  FaMusic, 
  FaPlus, 
  FaHeart,
  FaCompactDisc,
  FaMicrophone
} from 'react-icons/fa';
import Tooltip from './Tooltip';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const router = useRouter();

  const navItems = [
    { icon: <FaHome />, label: 'Home', path: '/' },
    { icon: <FaSearch />, label: 'Explore', path: '/explore' },
    { icon: <FaMusic />, label: 'Library', path: '/library' },
    { icon: <FaCompactDisc />, label: 'My DNA', path: '/my-dna' },
    { icon: <FaMicrophone />, label: 'Artists', path: '/artists' },
    { icon: <FaHeart />, label: 'Favorites', path: '/favorites' }
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-16 bg-soundverse-dark flex flex-col items-center py-6 space-y-8 z-50 border-r border-gray-800">
      {/* Logo */}
      <div 
        className="mb-8 cursor-pointer"
        onClick={() => router.push('/')}
      >
        <svg 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="none" 
          className="text-soundverse-purple"
        >
          <path 
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
            stroke="currentColor" 
            strokeWidth="2"
          />
          <path 
            d="M12 8V16M8 12H16" 
            stroke="currentColor" 
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Navigation Items */}
      {navItems.map((item, index) => (
        <Tooltip key={index} content={item.label}>
          <button
            onClick={() => router.push(item.path)}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 group"
            aria-label={item.label}
          >
            <span className="text-gray-300 group-hover:text-white text-xl">
              {item.icon}
            </span>
          </button>
        </Tooltip>
      ))}

      {/* Separator */}
      <div className="border-t border-gray-700 w-8 mx-auto my-2"></div>

      {/* Create DNA (Fixed at bottom) */}
      <div className="mt-auto">
        <Tooltip content="Create DNA">
          <button 
            onClick={() => router.push('/create-dna')}
            className="p-3 bg-soundverse-purple rounded-full hover:bg-purple-700 transition-colors duration-200 shadow-lg"
            aria-label="Create DNA"
          >
            <FaPlus className="text-white text-lg" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Sidebar;