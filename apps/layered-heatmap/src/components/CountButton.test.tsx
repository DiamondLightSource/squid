import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CountButton } from './CountButton';

describe('CountButton', () => {
  it('renders correctly and increments count on click', () => {
    render(<CountButton />);
    const button = screen.getByRole('button', { name: /count is 0/i });

    // Initial render shows count is 0
    expect(button).toHaveTextContent('count is 0');

    // Simulate click event
    fireEvent.click(button);
    
    // After one click, count should be 1
    expect(button).toHaveTextContent('count is 1');

    // Simulate another click
    fireEvent.click(button);
    
    // After second click, count should be 2
    expect(button).toHaveTextContent('count is 2');
  });
});
