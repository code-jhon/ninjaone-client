import React from 'react';
import Logo from '../../assets/logo.svg';

const Header: React.FC = () => {
  return (
    <header>
      <img src={Logo} alt="Image" className="left-aligned h-50" />
    </header>
  );
};

export default Header;