import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeviceCard from '../components/DeviceCard/';
import { MockedDeviceContext, valueObj } from '../utils/mockedContext';
import { DeviceCardProps } from '../interfaces';

describe('DeviceCard', () => {
  it('renders DeviceCard component', () => {
    const device: DeviceCardProps = {
      id: '1',
      title: 'Device 1',
      icon: 'MAC',
      osDesc: 'MAC',
      hddSize: '256 GB',
      onEdit: jest.fn(),
      onDelete: jest.fn(),
    };

    render (
      <MockedDeviceContext.Provider value={valueObj}>
        <DeviceCard {...device} />
      </MockedDeviceContext.Provider>
    )
    const element = screen.getByText('Device 1');
    expect(element).toBeInTheDocument();
  })

  it('renders the icon', () => {
    const device: DeviceCardProps = {
      id: '1',
      title: 'Device 1',
      icon: 'WINDOWS',
      osDesc: 'WINDOWS',
      hddSize: '256 GB',
      onEdit: jest.fn(),
      onDelete: jest.fn(),
    };

    render (
      <MockedDeviceContext.Provider value={valueObj}>
        <DeviceCard {...device} />
      </MockedDeviceContext.Provider>
    )
    const element = screen.getByAltText('Device Icon');
    expect(element).toBeInTheDocument();
  })

  it('renders the OS description', () => {
    const device: DeviceCardProps = {
      id: '1',
      title: 'Device 1',
      icon: 'LINUX',
      osDesc: 'LINUX',
      hddSize: '256 GB',
      onEdit: jest.fn(),
      onDelete: jest.fn(),
    };

    render (
      <MockedDeviceContext.Provider value={valueObj}>
        <DeviceCard {...device} />
      </MockedDeviceContext.Provider>
    )
    const element = screen.getByTestId('OSDesc');
    expect(element).toBeInTheDocument();
  })
});
