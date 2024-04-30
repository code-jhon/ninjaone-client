import { createContext } from 'react';
import { DeviceContextType, Device } from '../interfaces';
import MockedResponse from './mockedDevices.json'

const MockedDeviceContext = createContext<DeviceContextType>({
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

const valueObj = {
  devices: MockedResponse as Device[],
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
};

export { MockedDeviceContext, valueObj };