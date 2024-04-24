import React, { useContext } from 'react';
import { DeviceContext } from '../../contexts/DeviceContext';
import Refresh from '../../assets/actionIcons/refresh.svg';
import styled from 'styled-components';

const Container = styled.div`
  display: relative;
  right: 0;
  margin-left: auto;
`;

const Button = styled.button`
  color: #211F33;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:active {
    transform: rotate(360deg);
    transition: transform 0.3s;
  }
`;

const ResetFilters: React.FC = () => {
  const { resetFilters } = useContext(DeviceContext);
  return (
    <Container>
      <Button onClick={resetFilters}>
        <img src={Refresh} alt="Reset Filters" title="Reset Filters" />
      </Button>
    </Container>
  );
};

export default ResetFilters;