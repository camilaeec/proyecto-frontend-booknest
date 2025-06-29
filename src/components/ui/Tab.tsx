// components/ui/Tab.tsx
import React from 'react';

interface TabProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ children, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-medium text-sm focus:outline-none ${
        active 
          ? 'border-b-2 border-booknest-accent text-booknest-accent' 
          : 'text-booknest-light-gray hover:text-booknest-accent'
      }`}
    >
      {children}
    </button>
  );
};

export default Tab;