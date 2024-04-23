import React from 'react';
import Header from './components/Header/';
import Breadcrumbs from './components/Breadcrumbs';
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
        <DeviceList />
      </Container>
    </>
  );
};

export default App;
