import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/Header';

describe('Header', () => {
  it('renders without crashing', () => {
    render(<Header />);
  });

  it('displays the logo', () => {
    const { getByAltText } = render(<Header />);
    const logo = getByAltText('Logo');
    expect(logo).toBeInTheDocument();
  });

  it('has the correct background color', () => {
    const { container } = render(<Header />);
    const headerContainer = container.firstChild;
    expect(headerContainer).toHaveStyle('background: #002A42');
  });

  it('has the correct height', () => {
    const { container } = render(<Header />);
    const headerContainer = container.firstChild;
    expect(headerContainer).toHaveStyle('height: 50px');
  });
});
