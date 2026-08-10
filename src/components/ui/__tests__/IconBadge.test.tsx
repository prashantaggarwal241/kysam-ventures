import React from 'react';
import { render, screen } from '@testing-library/react-native';
import IconBadge from '../IconBadge';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

describe('IconBadge', () => {
  it('renders with required props', () => {
    render(<IconBadge iconName="star-outline" />);
    expect(screen.getByTestId('icon-badge')).toBeTruthy();
  });

  it('renders blue tone by default', () => {
    render(<IconBadge iconName="briefcase-outline" />);
    expect(screen.getByTestId('icon-badge')).toBeTruthy();
  });

  it('renders blue tone explicitly', () => {
    render(<IconBadge iconName="briefcase-outline" tone="blue" />);
    expect(screen.getByTestId('icon-badge')).toBeTruthy();
  });

  it('renders amber tone', () => {
    render(<IconBadge iconName="flash-outline" tone="amber" />);
    expect(screen.getByTestId('icon-badge')).toBeTruthy();
  });

  it('renders sm size with correct dimensions', () => {
    render(<IconBadge iconName="star-outline" size="sm" />);
    const badge = screen.getByTestId('icon-badge');
    expect(badge.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ width: 32, height: 32, borderRadius: 16 }),
      ]),
    );
  });

  it('renders md size by default with correct dimensions', () => {
    render(<IconBadge iconName="star-outline" />);
    const badge = screen.getByTestId('icon-badge');
    expect(badge.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ width: 44, height: 44, borderRadius: 22 }),
      ]),
    );
  });

  it('renders lg size with correct dimensions', () => {
    render(<IconBadge iconName="star-outline" size="lg" />);
    const badge = screen.getByTestId('icon-badge');
    expect(badge.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ width: 56, height: 56, borderRadius: 28 }),
      ]),
    );
  });

  it('has accessibilityRole image', () => {
    render(<IconBadge iconName="star-outline" />);
    expect(screen.getByTestId('icon-badge').props.accessibilityRole).toBe('image');
  });
});
