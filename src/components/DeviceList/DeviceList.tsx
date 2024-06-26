import { useContext, useState } from 'react';
import DeviceCard from '../DeviceCard';
import { DeviceContext } from '../../contexts/DeviceContext';
import { Device } from '../../interfaces/';
import ModalForm from '../Form/';
import ModalDelete from '../ModalDelete';
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
  const { devices, isModalOpen, setIsModalOpen, dispatch, isDeleteModalOpen, setIsDeleteModalOpen } = useContext(DeviceContext);
  const [device, setDevice] = useState<Device>({
    id: '',
    system_name: '',
    type: '',
    hdd_capacity: '',
  });

  const onEdit = (device: Device) => {
    setDevice(device);
    setIsModalOpen(true);
  }

  const onDelete = (device: Device) => {
    setDevice(device);
    setIsDeleteModalOpen(true);
  }

  const deviceCards = devices.map((device: Device, index: number) => (
    <DeviceCard
      key={index}
      id={device.id}
      title={device.system_name}
      icon={device.type}
      osDesc={device.type}
      hddSize={device.hdd_capacity.toString()}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  ));

  const onClose = () => {
    setIsModalOpen(false);
    setDevice({
      id: '',
      system_name: '',
      type: '',
      hdd_capacity: '',
    });
  };

  const onDeleteClose = () => {
    setIsDeleteModalOpen(false);
    setDevice({
      id: '',
      system_name: '',
      type: '',
      hdd_capacity: '',
    });
  }

  const onSubmit = (device: Device) => {
    dispatch({ type: 'POST_DEVICE', device: device });
  };

  const onEditDevice = (id: string, device: Device) => {
    dispatch({ type: 'UPDATE_DEVICE', id, device });
  };

  const onDeleteDevice = (id: string) => {
    dispatch({ type: 'DELETE_DEVICE', id });
  };

  return (
    <DeviceListContainer>
      <ModalForm open={isModalOpen} onClose={onClose} onSubmit={onSubmit} onEdit={onEditDevice} device={device} />
      <ModalDelete open={isDeleteModalOpen} onClose={onDeleteClose} onDelete={onDeleteDevice} device={device} />
      <TitleContainer>
        <Title>Device</Title>
      </TitleContainer>
      {deviceCards}
    </DeviceListContainer>
  );
};

export default DeviceList;