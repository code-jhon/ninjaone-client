import React, { useState, useContext } from 'react';
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
  width: 155px;
  height: 38px;
  cursor: pointer;
`;

const DropdownButton = styled.div`
  display: flex;
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
  width: 120px;
`;

const CheckBoxText = styled.div`
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

const CheckboxLabel = styled.label`
  display: flex;
  margin-bottom: 8px;
`;

const CheckboxInput = styled.input`
  margin-right: 8px;
  color: var(--Black-Black-100, #211F33);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
`;

const FilterDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setFilterType } = useContext(DeviceContext);
  const [checkedTypes, setCheckedTypes] = useState<string[]>(['WINDOWS', 'MAC', 'LINUX']);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    let updatedCheckedTypes = [...checkedTypes];
  
    if (name === 'all') {
      if (checked) {
        updatedCheckedTypes = ['WINDOWS', 'MAC', 'LINUX'];
      } else {
        updatedCheckedTypes = [];
      }
    } else {
      if (checked) {
        updatedCheckedTypes = [...updatedCheckedTypes, name.toUpperCase()];
      } else {
        updatedCheckedTypes = updatedCheckedTypes.filter(type => type !== name.toUpperCase());
      }
    }
  
    setCheckedTypes(updatedCheckedTypes);
    setFilterType(updatedCheckedTypes);
  };

  const isChecked = {
    windows: checkedTypes.includes('WINDOWS'),
    mac: checkedTypes.includes('MAC'),
    linux: checkedTypes.includes('LINUX')
  }

  const filterStatus = checkedTypes.length === 3 ? 'All' : `(${checkedTypes.length})`;

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>
        <ButtonText>Device type: {filterStatus}</ButtonText>
        <ImageContainer>
          <img src={Caret} alt="dropdown icon" className='caret-icon' />
        </ImageContainer>
      </DropdownButton>
      {isOpen && (
        <DropdownContent>
          <CheckboxLabel>
            <CheckboxInput type="checkbox" name="all" onChange={handleCheckboxChange} />
            <CheckBoxText>All</CheckBoxText>
          </CheckboxLabel>
          <CheckboxLabel>
            <CheckboxInput type="checkbox" checked={isChecked.windows} name="windows" onChange={handleCheckboxChange} />
            <CheckBoxText>Windows</CheckBoxText>
          </CheckboxLabel>
          <CheckboxLabel>
            <CheckboxInput type="checkbox" checked={isChecked.mac} name="mac" onChange={handleCheckboxChange} />
            <CheckBoxText>Mac</CheckBoxText>
          </CheckboxLabel>
          <CheckboxLabel>
            <CheckboxInput type="checkbox" checked={isChecked.linux} name="linux" onChange={handleCheckboxChange} />
            <CheckBoxText>Linux</CheckBoxText>
          </CheckboxLabel>
        </DropdownContent>
      )}
    </DropdownContainer>
  );
};

export default FilterDropdown;