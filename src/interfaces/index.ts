import { ReactNode } from 'react';

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
  onDelete: (device: Device) => void;
}

export interface DeleteFormProps {
  open: boolean;
  onClose: () => void;
  onDelete: (device: string) => void;
  device: Device;
}

export interface OptionsMenuProps {
  handleEdit: () => void;
  handleDelete: () => void;
}

export interface ModalFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (device: Device) => void;
  onEdit?: (id: string, device: Device) => void;
  device?: Device;
}

export interface OverlayProps {
  children: ReactNode;
}

export interface DeviceState {
  devices: Device[];
  device: Device;
  isCreating: boolean;
}

export type Action =
  | { type: 'ADD_DEVICE'; device: Device }
  | { type: 'UPDATE_DEVICE'; id: string; device: Device }
  | { type: 'DELETE_DEVICE'; id: string }
  | { type: 'POST_DEVICE'; device: Device }
  | { type: 'END_POST_DEVICE' };

export interface DeviceContextType {
  devices: Device[];
  dispatch: React.Dispatch<Action>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  filterType: string[];
  setFilterType: React.Dispatch<React.SetStateAction<string[]>>;
  sortOption: { key: 'hdd_capacity' | 'system_name'; order: 'asc' | 'desc' } | null;
  setSortOption: React.Dispatch<React.SetStateAction<{ key: 'hdd_capacity' | 'system_name'; order: 'asc' | 'desc' } | null>>;
  resetFilters: () => void;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}