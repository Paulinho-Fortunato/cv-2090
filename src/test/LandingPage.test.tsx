import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LandingPage } from '../pages/LandingPage';
import { BrowserRouter } from 'react-router-dom';

describe('LandingPage', () => {
  it('renders landing page correctly', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    
    const element = screen.getByText(/CV Builder/i);
    expect(element).toBeTruthy();
  });

  it('has create resume button', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    
    const element = screen.getByText(/Criar Currículo/i);
    expect(element).toBeTruthy();
  });
});
