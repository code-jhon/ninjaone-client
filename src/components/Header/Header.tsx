import React from 'react';
import styled from 'styled-components';
import Logo from '../../assets/logo.svg';

const HeaderContainer = styled.header`
  display: flex;
  background: #002A42;
  height: 50px;
  ;
`;

const Image = styled.img`
  width: 120px;
  margin-left: 24px;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Image src={Logo} alt="Logo" />
    </HeaderContainer>
  );
};

export default Header;