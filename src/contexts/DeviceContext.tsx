import React, { createContext, useReducer, useEffect, useState } from 'react';
import { fetchDevices, createDevice } from '../services/DeviceService';
import { Device, DeviceState, DeviceContextType, Action } from '../interfaces';



// Define the initial state
const initialState: DeviceState = {
  devices: [],
  device: {
    id: '',
    system_name: '',
    type: '',
    hdd_capacity: '',
  },
  isCreating: false,
};

// Define the reducer function
const reducer = (state: DeviceState, action: Action): DeviceState => {
  switch (action.type) {
    case 'ADD_DEVICE':
      return { ...state, devices: [...state.devices, action.device] };
    case 'UPDATE_DEVICE':
      return {
        ...state,
        devices: state.devices.map(device =>
          device.id === action.id ? action.device : device
        ),
      };
    case 'DELETE_DEVICE':
      return {
        ...state,
        devices: state.devices.filter(device => device.id !== action.id),
      };
    case 'POST_DEVICE':
      return {
        ...state,
        device: action.device,
        isCreating: true,
      };
    case 'END_POST_DEVICE':
      return {
        ...state,
        isCreating: false,
      };
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
  resetFilters: () => undefined,
  isModalOpen: false,
  setIsModalOpen: () => undefined,
  isDeleteModalOpen: false,
  setIsDeleteModalOpen: () => undefined,
});

// Create the device provider component
const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string[]>(['WINDOWS', 'MAC', 'LINUX']);
  const [sortOption, setSortOption] = useState<{ key: 'hdd_capacity' | 'system_name'; order: 'asc' | 'desc' } | null>(null);
  const [filteredDevices, setFilteredDevices] = useState(state.devices);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

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
    const result = state.devices.filter(device =>
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
  }, [state, searchTerm, filterType, sortOption]);

  useEffect(() => {
    const postDevice = async () => {
      try {
        const response = await createDevice(state.device);
        if (response) dispatch({ type: 'ADD_DEVICE', device: state.device });
      } catch (error) {
        // Handle the error here
        console.error(error);
      }
    }

    if (state.isCreating) {
      void postDevice().then(() => dispatch({ type: 'END_POST_DEVICE' }));
    }

  }, [state.isCreating, state.device]);

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
    resetFilters,
    isModalOpen,
    setIsModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen
  }

  return (
    <DeviceContext.Provider value={{ ...ProviderObj }}>
      {children}
    </DeviceContext.Provider>
  );
};

export { DeviceContext, DeviceProvider };