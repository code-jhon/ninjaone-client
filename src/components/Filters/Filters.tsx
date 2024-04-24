import React from 'react';
import { Search } from '../Search';
import { FilterDropdown } from '../FilterDropdown';
import { SortDropdown } from '../SortDropdown';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 38px;
  margin-bottom: 16px;
`;

const Filters: React.FC = () => {
  return (
    <Container>
      <Search />
      <FilterDropdown />
      <SortDropdown />
    </Container>
  );
};

export default Filters;