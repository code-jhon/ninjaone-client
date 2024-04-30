import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedDeviceContext, valueObj } from '../utils/mockedContext';
import Breadcrumbs from '../components/Breadcrumbs/';

describe('Breadcrumbs', () => {
  it('renders Breadcrumbs component', () => {
    render (
      <MockedDeviceContext.Provider value={valueObj}>
        <Breadcrumbs />
      </MockedDeviceContext.Provider>
    )
    const element = screen.getByText('Devices');
    expect(element).toBeInTheDocument();
  })

  it('renders the icon', () => {
    render (
      <MockedDeviceContext.Provider value={valueObj}>
        <Breadcrumbs />
      </MockedDeviceContext.Provider>
    )
    const element = screen.getByAltText('add device icon');
    expect(element).toBeInTheDocument();
  })
});
