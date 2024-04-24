import React from 'react';
import { OverlayProps } from '../../interfaces';
import styled from 'styled-components';

const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(33, 31, 51, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Overlay: React.FC<OverlayProps> = ({ children }) => {
  return <OverlayContainer>{children}</OverlayContainer>;
};

export default Overlay;
