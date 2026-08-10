import React from 'react';
import { render, screen } from '@testing-library/react-native';
import SectionLabel from '../SectionLabel';

describe('SectionLabel', () => {
  it('renders children text', () => {
    render(<SectionLabel>Services</SectionLabel>);
    expect(screen.getByText('Services')).toBeTruthy();
  });

  it('renders different text content', () => {
    render(<SectionLabel>Why KySam</SectionLabel>);
    expect(screen.getByText('Why KySam')).toBeTruthy();
  });

  it('renders Expertise label', () => {
    render(<SectionLabel>Expertise</SectionLabel>);
    expect(screen.getByText('Expertise')).toBeTruthy();
  });
});
