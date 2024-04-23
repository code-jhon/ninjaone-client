import React, { createContext, useReducer, useEffect, useState } from 'react';
import { fetchDevices } from '../services/DeviceService';
import { Device } from '../interfaces';

// Define the initial state
const initialState: Device[] = [];
interface DeviceContextType {
  devices: Device[];
  dispatch: React.Dispatch<Action>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setFilterType: React.Dispatch<React.SetStateAction<string[]>>;
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
  setSearchTerm: () => undefined,
  setFilterType: () => undefined
});

// Create the device provider component
const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [devices, dispatch] = useReducer(reducer, initialState);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string[]>([]);
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
    setFilteredDevices(
      devices.filter(device =>
        device.system_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterType.length > 0 ? filterType.includes(device.type) : true)
      )
    );
  }, [devices, searchTerm, filterType]);

  return (
    <DeviceContext.Provider value={{ devices: filteredDevices, dispatch, setSearchTerm, setFilterType }}>
      {children}
    </DeviceContext.Provider>
  );
};

export { DeviceContext, DeviceProvider };