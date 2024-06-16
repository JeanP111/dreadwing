import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from './Navigation'; // Import dostosowany do struktury folderów
import { defaultRoutes } from '../../Routes';

describe('Navigation component', () => {
  test('renders all navigation links', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <Navigation />
      </MemoryRouter>
    );

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Help/i)).toBeInTheDocument();
    expect(screen.getByText(/Registration/i)).toBeInTheDocument();
    expect(screen.getByText(/Snake/i)).toBeInTheDocument();
    expect(screen.getByText(/Star Wars/i)).toBeInTheDocument();
  });

  test('applies selected class based on current path', () => {
    render(
      <MemoryRouter initialEntries={['/help']}>
        <Navigation />
      </MemoryRouter>
    );

    expect(screen.getByText(/Help/i)).toHaveClass('selected');
    expect(screen.getByText(/Home/i)).not.toHaveClass('selected');
  });

  test('renders registration submenu links', () => {
    render(
      <MemoryRouter initialEntries={['/registration']}>
        <Navigation />
      </MemoryRouter>
    );

    expect(screen.getByText(/Translator/i)).toBeInTheDocument();
    expect(screen.getByText(/Dos/i)).toBeInTheDocument();
    expect(screen.getByText(/Image Canvas/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact Form/i)).toBeInTheDocument();
  });
});
