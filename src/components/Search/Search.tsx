import React, { useState, useEffect, useContext } from 'react';
import { DeviceContext } from '../../contexts/DeviceContext';
import IconSearch from '../../assets/actionIcons/search.svg'
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 270px;
  height: 38px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
`;

const SearchIcon = styled.img`
  margin: 8px 8px 9px 12px;
`;

const Search: React.FC = () => {
  const [search, setSearch] = useState('');
  const { setSearchTerm } = useContext(DeviceContext);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }

  useEffect(() => {
    setSearchTerm(search);
  }, [search, setSearchTerm]);

  return (
    <SearchContainer>
      <SearchIcon src={IconSearch} />
      <SearchInput type="text" placeholder="Search" onChange={handleSearch} value={search} />
    </SearchContainer>
  );
};

export default Search;