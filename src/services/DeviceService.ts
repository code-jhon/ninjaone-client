import axios from 'axios';
import { Device } from '../interfaces';

const API_BASE_URL = 'http://localhost:3000';

interface fetchResponseType {
  data: Device[];
}

interface createResponseType {
  data: Device;
}

interface updateResponseType {
  data: Device;
}

// Fetch all devices
export const fetchDevices = async () => {
  try {
    const response: fetchResponseType = await axios.get(`${API_BASE_URL}/devices`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch devices');
  }
};

// Create a new device
export const createDevice = async (deviceData: Device) => {
  try {
    const response: createResponseType = await axios.post(`${API_BASE_URL}/devices`, deviceData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create device');
  }
};

// Update an existing device
export const updateDevice = async (deviceId: string, deviceData: Device) => {
  try {
    const response: updateResponseType = await axios.put(`${API_BASE_URL}/devices/${deviceId}`, deviceData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update device');
  }
};

// Delete a device
export const deleteDevice = async (deviceId: string) => {
  try {
    await axios.delete(`${API_BASE_URL}/devices/${deviceId}`);
  } catch (error) {
    throw new Error('Failed to delete device');
  }
};