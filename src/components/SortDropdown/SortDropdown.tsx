import React, { useState, useContext, useEffect } from 'react';
import { DeviceContext } from '../../contexts/DeviceContext';
import Caret from '../../assets/actionIcons/caret.svg';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  padding: 11px 12px;
  margin: 0 8px;
  border: solid 1px #ccc;
  border-radius: 4px;
  width: 291px;
  height: 38px;
  cursor: pointer;

  &:hover .content-container {
    display: block;
  }
`;

const DropdownButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover .caret-icon{
    transform: rotate(180deg);
    transition: transform 0.3s;
  }
`;

const ButtonText = styled.div`
  height: 16px;
  color: var(--Black-Black-100, #211F33);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 114.286% */
  width: 100%;
`;

const ItemText = styled.div`
  height: 16px;
  color: var(--Black-Black-100, #211F33);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 114.286% */
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin-left: 12px;
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #fff;
  min-width: 155px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px;
  width: 100%;
  left: 0;
  top: 38px;
  z-index: 1;
`;

const Item = styled.div`
  display: flex;
  margin-bottom: 8px;

  &:hover {
    background-color: #f7f7f7;
  }
`;

const SortDropdown: React.FC = () => {
  const { sortOption, setSortOption } = useContext(DeviceContext);
  const [sortBy, setSortBy] = useState<string>('');

  useEffect(() => {
    if (!sortOption) {
      setSortBy('')
    }
  }, [sortOption, setSortOption]);


  const handleSortChange = (key: 'hdd_capacity' | 'system_name', order: 'asc' | 'desc') => {
    setSortOption({ key, order });
    setSortBy(`${key === 'hdd_capacity' ? 'HDD Capacity' : 'System Name'} (${order === 'asc' ? 'Ascending' : 'Descending'})`);
  };

  return (
    <DropdownContainer >
      <DropdownButton>
        <ButtonText>Sort by: {sortBy}</ButtonText>
        <ImageContainer>
          <img src={Caret} alt="dropdown icon" className='caret-icon' />
        </ImageContainer>
      </DropdownButton>
      <DropdownContent className='content-container'>
        <Item onClick={() => handleSortChange('hdd_capacity', 'asc')}>
          <ItemText>HDD Capacity (Ascending)</ItemText>
        </Item>
        <Item onClick={() => handleSortChange('hdd_capacity', 'desc')}>
          <ItemText>HDD Capacity (Descending)</ItemText>
        </Item>
        <Item onClick={() => handleSortChange('system_name', 'asc')}>
          <ItemText>Name (Ascending)</ItemText>
        </Item>
        <Item onClick={() => handleSortChange('system_name', 'desc')}>
          <ItemText>Name (Descending)</ItemText>
        </Item>
      </DropdownContent>
    </DropdownContainer>
  );
};

export default SortDropdown;