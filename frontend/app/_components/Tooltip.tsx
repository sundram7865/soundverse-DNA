import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip = ({ 
  content, 
  children, 
  position = 'right' 
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2'
  };

  return (
    <div className="relative flex justify-center">
      <div
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="flex items-center justify-center"
      >
        {children}
      </div>
      {visible && (
        <div
          className={`absolute ${positionClasses[position]} px-3 py-1.5 text-sm text-white bg-gray-900 rounded-md whitespace-nowrap z-50 shadow-xl`}
        >
          {content}
          <div className={`absolute w-2 h-2 bg-gray-900 rotate-45 ${position === 'right' ? '-left-1' : position === 'left' ? '-right-1' : position === 'top' ? '-bottom-1' : '-top-1'}`}></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;