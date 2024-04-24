import React from 'react';
import Header from './components/Header/';
import Breadcrumbs from './components/Breadcrumbs';
import Filters from './components/Filters';
import DeviceList from './components/DeviceList';
import styled from 'styled-components';

// Define the styled components
const Container = styled.div`
  padding: 0 24px;
`;

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <Breadcrumbs />
        <Filters />
        <DeviceList />
      </Container>
    </>
  );
};

export default App;
