import React from 'react';
import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import Card from '../Card';

describe('Card', () => {
  it('renders children with default surface variant', () => {
    render(
      <Card>
        <Text>Card content</Text>
      </Card>,
    );
    expect(screen.getByText('Card content')).toBeTruthy();
  });

  it('renders surface variant explicitly', () => {
    render(
      <Card variant="surface">
        <Text>Surface</Text>
      </Card>,
    );
    expect(screen.getByText('Surface')).toBeTruthy();
  });

  it('renders tinted variant', () => {
    render(
      <Card variant="tinted">
        <Text>Tinted</Text>
      </Card>,
    );
    expect(screen.getByText('Tinted')).toBeTruthy();
  });

  it('renders filled variant', () => {
    render(
      <Card variant="filled">
        <Text>Filled</Text>
      </Card>,
    );
    expect(screen.getByText('Filled')).toBeTruthy();
  });

  it('applies optional style override', () => {
    render(
      <Card style={{ margin: 8 }}>
        <Text>Styled</Text>
      </Card>,
    );
    expect(screen.getByText('Styled')).toBeTruthy();
  });

  it('renders multiple children', () => {
    render(
      <Card>
        <Text>Title</Text>
        <Text>Body</Text>
      </Card>,
    );
    expect(screen.getByText('Title')).toBeTruthy();
    expect(screen.getByText('Body')).toBeTruthy();
  });
});
