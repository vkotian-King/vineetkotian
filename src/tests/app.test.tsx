import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../app/App';

afterEach(() => cleanup());
function renderAt(path: string) { return render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>); }

describe('personal portfolio routes and interactions', () => {
  it('renders the portfolio home and its project links', () => {
    renderAt('/');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/operational.*systems that work/i);
    expect(screen.getByRole('link', { name: /explore selected work/i })).toHaveAttribute('href', '/work');
  });
  it.each(['/work', '/projects', '/approach', '/writing', '/direction', '/credentials', '/contact'])('loads %s directly', path => {
    renderAt(path);
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
  it('filters the project archive by category', async () => {
    renderAt('/work');
    await userEvent.click(screen.getByRole('button', { name: /operations/i }));
    expect(screen.getByRole('heading', { name: 'Automated DevOps Intelligence Report' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Security Vulnerability Scanning Pipeline' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'AirWise' })).not.toBeInTheDocument();
  });
  it('expands project outcomes accessibly', async () => {
    renderAt('/work');
    const disclosure = screen.getAllByText(/see outcomes/i)[0].closest('summary');
    expect(disclosure).not.toBeNull();
    await userEvent.click(disclosure!);
    expect(disclosure!.parentElement).toHaveAttribute('open');
  });
  it('opens and closes the mobile navigation with Escape', async () => {
    renderAt('/');
    const toggle = screen.getByRole('button', { name: /menu/i });
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
  it('shows the not found page for unknown paths', () => {
    renderAt('/not-a-page');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/wrong.*turn/i);
  });
});
