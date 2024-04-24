import React from 'react';
import { OptionsMenu } from '../OptionsMenu';
import { DeviceCardProps } from '../../interfaces';
import { Apple, Windows, Linux } from '../../assets/osIcons/';
import styled from 'styled-components';

const DeviceCardContainer = styled.div`
  border-bottom: solid 1px #CBCFD3;
  display: flex;
  padding: 9px 12px 8px;
  height: 52px;
  gap: 4px;
  flex-direction: row;
  justify-content: space-between;

  &:hover {
    background: var(--Black-Black-5, #F4F4F5);
  }
`;

const DeviceCardInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const DeviceCardHeader = styled.div`
  display: flex;
`;

const DeviceIcon = styled.img`
  margin-right: 5px;
  width: 14px;
  height: 16px;
`;

const DeviceTitle = styled.h2`
  color: var(--Black-Black-100, #211F33);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const OsDesc = styled.p`
  color: var(--Black-Black-65, #6E6D7A);
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const DeviceCard: React.FC<DeviceCardProps> = ({
  id,
  title,
  icon,
  osDesc,
  hddSize,
  onEdit,
  onDelete,
}) => {

  const osIcons: { [key: string]: string } = {
    WINDOWS: Windows,
    MAC: Apple,
    LINUX: Linux,
  };

  const osDescCapitalized: string = osDesc.charAt(0).toUpperCase() + osDesc.slice(1).toLowerCase();

  const handleEdit = () => {
    onEdit({ id, system_name: title, type: icon, hdd_capacity: hddSize });
  }

  const handleDelete = () => {
    onDelete({ id, system_name: title, type: icon, hdd_capacity: hddSize});
  }

  return (
    <DeviceCardContainer >
      <DeviceCardInfo>
        <DeviceCardHeader >
          <DeviceIcon src={osIcons[icon]} alt="Device Icon" />
          <DeviceTitle>{title}</DeviceTitle>
        </DeviceCardHeader>
        <div>
          <OsDesc>
            {osDescCapitalized} workstation - {hddSize} GB
          </OsDesc>
        </div>
      </DeviceCardInfo>
      <OptionsMenu handleEdit={handleEdit} handleDelete={handleDelete} />
    </DeviceCardContainer>
  );
};

export default DeviceCard;