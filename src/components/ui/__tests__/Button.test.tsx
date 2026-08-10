import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import Button from '../Button';

describe('Button', () => {
  it('renders with required props', () => {
    render(<Button label="Get in touch" onPress={() => {}} />);
    expect(screen.getByText('Get in touch')).toBeTruthy();
  });

  it('has accessibilityRole button', () => {
    render(<Button label="Submit" onPress={() => {}} />);
    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('fires onPress when tapped', () => {
    const onPress = jest.fn();
    render(<Button label="Submit" onPress={onPress} />);
    fireEvent.press(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('defaults accessibilityLabel to label', () => {
    render(<Button label="Submit" onPress={() => {}} />);
    expect(screen.getByLabelText('Submit')).toBeTruthy();
  });

  it('uses accessibilityLabel prop when provided', () => {
    render(
      <Button label="Submit" onPress={() => {}} accessibilityLabel="Send enquiry form" />,
    );
    expect(screen.getByLabelText('Send enquiry form')).toBeTruthy();
  });

  it('sets disabled accessibilityState when disabled', () => {
    render(<Button label="Submit" onPress={() => {}} disabled />);
    expect(screen.getByRole('button').props.accessibilityState).toEqual({ disabled: true });
  });

  it('renders primary variant by default', () => {
    render(<Button label="Primary" onPress={() => {}} />);
    expect(screen.getByText('Primary')).toBeTruthy();
  });

  it('renders secondary variant', () => {
    render(<Button label="Cancel" onPress={() => {}} variant="secondary" />);
    expect(screen.getByText('Cancel')).toBeTruthy();
  });
});
