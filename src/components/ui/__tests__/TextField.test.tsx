import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import TextField from '../TextField';

describe('TextField', () => {
  it('renders with required props', () => {
    render(<TextField label="Full name" value="" onChangeText={() => {}} />);
    expect(screen.getByText('Full name')).toBeTruthy();
  });

  it('sets accessibilityLabel to label value', () => {
    render(<TextField label="Email address" value="" onChangeText={() => {}} />);
    expect(screen.getByLabelText('Email address')).toBeTruthy();
  });

  it('calls onChangeText when the user types', () => {
    const onChangeText = jest.fn();
    render(<TextField label="Name" value="" onChangeText={onChangeText} />);
    fireEvent.changeText(screen.getByLabelText('Name'), 'Priya');
    expect(onChangeText).toHaveBeenCalledWith('Priya');
  });

  it('shows error text when error prop is provided', () => {
    render(
      <TextField
        label="Email"
        value="bad-value"
        onChangeText={() => {}}
        error="Enter a valid email address"
      />,
    );
    expect(screen.getByText('Enter a valid email address')).toBeTruthy();
  });

  it('sets accessibilityHint to error message', () => {
    render(
      <TextField
        label="Email"
        value=""
        onChangeText={() => {}}
        error="Invalid email"
      />,
    );
    expect(screen.getByLabelText('Email').props.accessibilityHint).toBe('Invalid email');
  });

  it('does not render error text when error is not provided', () => {
    render(<TextField label="Name" value="" onChangeText={() => {}} />);
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('shows required indicator when required is true', () => {
    render(<TextField label="Name" value="" onChangeText={() => {}} required />);
    expect(screen.getByTestId('required-indicator')).toBeTruthy();
  });

  it('does not show required indicator when required is false', () => {
    render(<TextField label="Name" value="" onChangeText={() => {}} />);
    expect(screen.queryByTestId('required-indicator')).toBeNull();
  });

  it('sets accessibilityRequired when required is true', () => {
    render(<TextField label="Name" value="" onChangeText={() => {}} required />);
    expect(screen.getByLabelText('Name').props.accessibilityRequired).toBe(true);
  });

  it('renders as multiline when multiline is true', () => {
    render(<TextField label="Message" value="" onChangeText={() => {}} multiline />);
    expect(screen.getByLabelText('Message').props.multiline).toBe(true);
  });
});
