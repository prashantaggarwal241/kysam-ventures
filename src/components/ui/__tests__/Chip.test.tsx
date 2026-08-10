import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Chip from '../Chip';

describe('Chip', () => {
  it('renders with required props', () => {
    render(<Chip label="React Native" />);
    expect(screen.getByText('React Native')).toBeTruthy();
  });

  it('renders blue tone unselected by default', () => {
    render(<Chip label="Cloud" />);
    expect(screen.getByText('Cloud')).toBeTruthy();
  });

  it('renders blue tone explicitly', () => {
    render(<Chip label="Cloud" tone="blue" />);
    expect(screen.getByText('Cloud')).toBeTruthy();
  });

  it('renders amber tone', () => {
    render(<Chip label="Delhi, India" tone="amber" />);
    expect(screen.getByText('Delhi, India')).toBeTruthy();
  });

  it('renders neutral tone', () => {
    render(<Chip label="Tag" tone="neutral" />);
    expect(screen.getByText('Tag')).toBeTruthy();
  });

  it('renders unselected state by default', () => {
    render(<Chip label="Unselected" tone="blue" />);
    expect(screen.getByText('Unselected')).toBeTruthy();
  });

  it('renders selected state', () => {
    render(<Chip label="Selected" tone="blue" selected />);
    expect(screen.getByText('Selected')).toBeTruthy();
  });

  it('renders amber tone selected', () => {
    render(<Chip label="Amber" tone="amber" selected />);
    expect(screen.getByText('Amber')).toBeTruthy();
  });

  it('renders neutral tone selected', () => {
    render(<Chip label="Neutral" tone="neutral" selected />);
    expect(screen.getByText('Neutral')).toBeTruthy();
  });
});
