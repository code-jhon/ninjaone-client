export type DeviceType = 'WINDOWS' | 'MAC' | 'LINUX' | '';

export interface Device {
  id: string;
  system_name: string;
  type: DeviceType;
  hdd_capacity: string;
}

export interface DeviceCardProps {
  id: string;
  title: string;
  icon: DeviceType;
  osDesc: DeviceType;
  hddSize: string;
  onEdit: (device: Device) => void;
}
