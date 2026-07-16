import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingWidget from './BookingWidget';

describe('BookingWidget Math & Interactions', () => {
  const mockListing = {
    pricing: { nights: 5, totalPrice: 28499, freeCancelBefore: '17 October' },
    stats: { guests: 4 }
  };

  it('increments guests correctly up to max limit', () => {
    render(<BookingWidget listing={mockListing} setShowToast={() => {}} />);
    
    // Open the guest picker
    const triggerBtn = screen.getByRole('button', { name: /GUESTS1 guest/i });
    fireEvent.click(triggerBtn);

    // Find the increase button
    const increaseBtn = screen.getByRole('button', { name: /Increase guests/i });
    
    // Initial state is 1 guest, increment to 2
    fireEvent.click(increaseBtn);
    
    // Check if the trigger button text updated
    expect(screen.getByRole('button', { name: /GUESTS2 guests/i })).toBeTruthy();
    
    // Click up to 4 (max)
    fireEvent.click(increaseBtn); // 3
    fireEvent.click(increaseBtn); // 4
    fireEvent.click(increaseBtn); // Try 5 (should be disabled/capped)
    
    // Should cap at 4
    expect(screen.getByRole('button', { name: /GUESTS4 guests/i })).toBeTruthy();
  });
});
