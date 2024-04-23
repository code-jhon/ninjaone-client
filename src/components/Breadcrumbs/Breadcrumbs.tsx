import React from 'react';
import Plus from '../../assets/actionIcons/plus.svg';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
`;

const Text = styled.p`
  color: var(--Black-Black-100, #211F33);
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const ButtonText = styled.span`
  color: #FFF;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 14px; /* 100% */
  letter-spacing: 0em;
  text-align: left;
  text-wrap: nowrap;
`;

const Button = styled.button`
  padding: 0 12px;
  cursor: pointer;
  border-radius: 4px;
  background: #337AB7;
  color: #fff;
  height: 38px;
  width: 121px;

  &:hover {
    background: #2A6E9C;
  }

  &:active {
    background: #1F5A7F;
  }
`;

const Icon = styled.img`
  margin-right: 8px;
  color: #fff;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Breadcrumbs: React.FC = () => {
  // pending: implement the action from context
  const handleButtonClick = () => {
    console.log('Add device button clicked');
  };

  return (
    <Container>
      <Text>Devices</Text>
      <Button onClick={handleButtonClick}>
        <ButtonContainer>
          <Icon src={Plus} alt="add device icon" /> 
          <ButtonText>Add device</ButtonText>
        </ButtonContainer>
      </Button>
    </Container>
  );
};

export default Breadcrumbs;