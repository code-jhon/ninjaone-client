import React, { createContext, useReducer, useEffect } from 'react';
import { fetchDevices } from '../services/DeviceService';
import { Device } from '../interfaces';

// Define the initial state
const initialState: Device[] = [];

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
const DeviceContext = createContext<{
  devices: Device[];
  dispatch: React.Dispatch<Action>;
}>({
  devices: initialState,
  dispatch: () => undefined,
});

// Create the device provider component
const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [devices, dispatch] = useReducer(reducer, initialState);

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
    devices.length === 0 &&
      void loadDevices().then(() => console.log('Devices loaded'));
  }, []);

  return (
    <DeviceContext.Provider value={{ devices, dispatch }}>
      {children}
    </DeviceContext.Provider>
  );
};

export { DeviceContext, DeviceProvider };