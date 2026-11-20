import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 36 }) => {
  return (
    <img
      src="/serverdeck-logo.jpg"
      alt="ServerDeck"
      className={`shrink-0 rounded-lg object-cover ${className}`}
      style={{ width: size, height: size }}
    />
  );
};

export default Logo;
