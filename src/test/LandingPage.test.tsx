import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { LandingPage } from '../pages/LandingPage';
import { BrowserRouter } from 'react-router-dom';

describe('LandingPage', () => {
  it('renders landing page correctly', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    
    const element = within(screen.getByRole('banner')).getByText('CV Builder');
    expect(element).toBeTruthy();
  });

  it('has create resume button', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    
    const element = screen.getByRole('link', { name: 'Criar Currículo Grátis' });
    expect(element).toBeTruthy();
  });
});
