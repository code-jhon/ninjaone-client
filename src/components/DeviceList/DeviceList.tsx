import { useContext } from 'react';
import DeviceCard from '../DeviceCard';
import { DeviceContext } from '../../contexts/DeviceContext';
import { Device } from '../../interfaces/';
import styled from 'styled-components';

const DeviceListContainer = styled.div`
  flex-shrink: 0;
`;

const Title = styled.span`
  color: var(--Black-Black-100, #211F33);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  `;
  
  const TitleContainer = styled.div`
  border-bottom: solid 1px #CBCFD3;
  width: 100%;
  padding: 7px 12px;
`;

const DeviceList: React.FC = () => {
  const { devices } = useContext(DeviceContext);
  
  const deviceCards = devices.map((device: Device, index: number) => (
    <DeviceCard
      key={index}
      title={device.system_name}
      icon={device.type}
      osDesc={device.type}
      hddSize={device.hdd_capacity}
    />
  ));

  return (
    <DeviceListContainer>
      <TitleContainer>
        <Title>Device</Title>
      </TitleContainer>
      {deviceCards}
    </DeviceListContainer>
  );
};

export default DeviceList;