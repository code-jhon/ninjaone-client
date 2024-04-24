import React, { createContext, useReducer, useEffect, useState } from 'react';
import { fetchDevices } from '../services/DeviceService';
import { Device } from '../interfaces';

// Define the initial state
const initialState: Device[] = [];
interface DeviceContextType {
  devices: Device[];
  dispatch: React.Dispatch<Action>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  filterType: string[];
  setFilterType: React.Dispatch<React.SetStateAction<string[]>>;
  sortOption: { key: 'hdd_capacity' | 'system_name'; order: 'asc' | 'desc' } | null;
  setSortOption: React.Dispatch<React.SetStateAction<{ key: 'hdd_capacity' | 'system_name'; order: 'asc' | 'desc' } | null>>;
  resetFilters: () => void;
}

// Define the available actions for the reducer
type Action =
  | { type: 'ADD_DEVICE'; device: Device }
  | { type: 'UPDATE_DEVICE'; id: string; device: Device }
  | { type: 'DELETE_DEVICE'; id: string };

// Define the reducer function
const reducer = (state: Device[], action: Action): Device[] => {
  switch (action.type) {
    case 'ADD_DEVICE':
      return [...state, action.device];
    case 'UPDATE_DEVICE':
      return state.map(device =>
        device.id === action.id ? action.device : device
      );
    case 'DELETE_DEVICE':
      return state.filter(device => device.id !== action.id);
    default:
      return state;
  }
};

// Create the device context
const DeviceContext = createContext<DeviceContextType>({
  devices: [],
  dispatch: () => undefined,
  searchTerm: '',
  setSearchTerm: () => undefined,
  filterType: [],
  setFilterType: () => undefined,
  sortOption: null,
  setSortOption: () => undefined,
  resetFilters: () => undefined
});

// Create the device provider component
const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [devices, dispatch] = useReducer(reducer, initialState);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string[]>(['WINDOWS', 'MAC', 'LINUX']);
  const [sortOption, setSortOption] = useState<{ key: 'hdd_capacity' | 'system_name'; order: 'asc' | 'desc' } | null>(null);
  const [filteredDevices, setFilteredDevices] = useState(devices);

  useEffect(() => {
    const loadDevices = async () => {
      try {
        const initialDevices = await fetchDevices();
        initialDevices.forEach((device: Device) => { 
          dispatch({ type: 'ADD_DEVICE', device });
        });
      } catch (error) {
        // Handle the error here
        console.error(error);
      }
    };
    
    void loadDevices().then(() => console.log('Devices loaded'));
  }, []);

  useEffect(() => {
    const result = devices.filter(device =>
      device.system_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType.length > 0 ? filterType.includes(device.type) : true)
    );

    if (sortOption) {
      result.sort((a, b) => {
        if (sortOption.key === 'hdd_capacity') {
          const aValue = Number(a.hdd_capacity);
          const bValue = Number(b.hdd_capacity);
          return sortOption.order === 'asc' ? aValue - bValue : bValue - aValue;
        } else {
          return sortOption.order === 'asc'
            ? a.system_name.localeCompare(b.system_name)
            : b.system_name.localeCompare(a.system_name);
        }
      });
    }

    setFilteredDevices(result);
  }, [devices, searchTerm, filterType, sortOption]);

  const resetFilters = () => {
    setSearchTerm('');
    setFilterType(['WINDOWS', 'MAC', 'LINUX']);
    setSortOption(null);
  };

  const ProviderObj = {
    devices: filteredDevices,
    dispatch,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    sortOption,
    setSortOption,
    resetFilters
  }

  return (
    <DeviceContext.Provider value={{ ...ProviderObj }}>
      {children}
    </DeviceContext.Provider>
  );
};

export { DeviceContext, DeviceProvider };