export type DeviceType = 'Windows' | 'Mac' | 'Linux';

export interface Device {
  id: string;
  system_name: string;
  type: DeviceType;
  hdd_capacity: string;
}

export interface DeviceCardProps {
  title: string;
  icon: string;
  osDesc: string;
  hddSize: string;
}