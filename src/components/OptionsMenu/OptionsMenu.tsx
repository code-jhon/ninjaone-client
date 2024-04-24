import React, { useState } from 'react';
import { OptionsMenuProps } from '../../interfaces';
import styled from 'styled-components';
import Ellipsis from '../../assets/actionIcons/ellipsis.svg';

const OptionsMenu: React.FC<OptionsMenuProps> = ({handleEdit, handleDelete}) => {
  const [isOpen, setIsOpen] = useState(false);

  const OptionsMenuButton = styled.button`
    border-radius: 4px;
    background: var(--Black-Black-10, #E8E8EA);
    display: flex;
    width: 32px;
    height: 32px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  `;

  const OptionsMenuIcon = styled.img`
  width: 14px;
  `;

  const DropdownMenu = styled.div`
    display: ${isOpen ? 'block' : 'none'};
    position: absolute;
    border-radius: 2px;
    border: 1px solid rgba(72, 68, 105, 0.25);
    background: #FFF;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    width: 120px;
    height: 72px;
    flex-shrink: 0;
    right: 37px;
    margin-top: 4px;
  `;

  const DropdownItem = styled.div`
    color: ${props => props.color || '#000'};
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
    padding: 5px 0 0 12px;
    text-decoration: none;
    display: block;
    height: 30px;
    cursor: pointer;

    &:hover {
      background: #F4F4F5;
    }

    &:active {
      background: #E8E8EA;
    }
  `;

  const handleEditClick = () => {
    handleEdit();
    setIsOpen(false);
  }

  const handleDeleteClick = () => {
    handleDelete();
    setIsOpen(false);
  }

  return (
    <div className="options-menu">
      <OptionsMenuButton className="options-menu-button" onClick={() => setIsOpen(!isOpen)}>
        <OptionsMenuIcon src={Ellipsis} alt="Options" className="options-menu-icon" />
      </OptionsMenuButton>
      <DropdownMenu>
        <DropdownItem color="#211F33" onClick={handleEditClick}>Edit</DropdownItem>
        <DropdownItem color="#D53948" onClick={handleDeleteClick}>Delete</DropdownItem>
      </DropdownMenu>
    </div>
  );
};

export default OptionsMenu;