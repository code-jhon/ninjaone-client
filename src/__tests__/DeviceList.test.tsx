import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeviceList from '../components/DeviceList';
import { MockedDeviceContext, valueObj } from '../utils/mockedContext';

describe('DeviceList', () => {
  it('renders DeviceList component', () => {
    render (
      <MockedDeviceContext.Provider value={valueObj}>
        <DeviceList />
      </MockedDeviceContext.Provider>
    )
    const element = screen.getByText('Device');
    expect(element).toBeInTheDocument();
  })
});