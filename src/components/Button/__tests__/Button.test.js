import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';

import Button from '../Button';
import { BUTTON_VARS } from '../constants';

const mockId = 'buttonMockId';
const mockIdSecond = 'secondMockId';
const mockButtonText = 'Button mock text';
const mockSize = 'sm';
const defaultColorSchemeClasses = 'button primary md';
const mockColorSchemeClass = 'button secondary md';
const mockOnClick = jest.fn();
const mockOnBlur = jest.fn();

describe('button component tests', () => {
  afterEach(cleanup);

  it('component renders successfully', () => {
    const { getByTestId } = render(<Button id={mockId} />);
    expect(getByTestId(mockId)).toBeInTheDocument();
  });

  it('renders text correctly', () => {
    const { getByText } = render(<Button id={mockId} buttonText={mockButtonText} />);
    expect(getByText(mockButtonText)).toBeInTheDocument();
  });

  it('button is not disabled if prop is not passed', () => {
    const { getByTestId } = render(<Button id={mockId} />);
    expect(getByTestId(mockId)).not.toHaveAttribute('disabled');
  });

  it('renders with default input size', () => {
    const { getByTestId } = render(<Button id={mockId} />);
    expect(getByTestId(mockId)).toHaveClass(BUTTON_VARS.defaultInputSize);
  });

  it('renders with custom input size', () => {
    const { getByTestId } = render(<Button id={mockId} size={mockSize} />);
    expect(getByTestId(mockId)).toHaveClass(mockSize);
  });

  it('renders with default color scheme - primary', () => {
    const { getByTestId } = render(<Button id={mockId} />);
    expect(getByTestId(mockId)).toHaveClass(defaultColorSchemeClasses);
  });

  it('renders with custom color scheme - secondary', () => {
    const { getByTestId } = render(
      <Button id={mockId} colorScheme={BUTTON_VARS.colorSchemes.secondary.toLowerCase()} />
    );
    expect(getByTestId(mockId)).toHaveClass(mockColorSchemeClass);
  });

  it('is disabled when prop is passed', () => {
    const { getByTestId } = render(<Button id={mockId} disabled />);
    expect(getByTestId(mockId)).toHaveAttribute('disabled');
  });

  it('renders with default button type - button', () => {
    const { getByTestId } = render(<Button id={mockId} />);
    expect(getByTestId(mockId).type).toBe(BUTTON_VARS.defaultType);
  });

  it('renders with given button type - submit', () => {
    const { getByTestId } = render(<Button id={mockId} buttonType={BUTTON_VARS.types.submit} />);
    expect(getByTestId(mockId).type).toBe(BUTTON_VARS.types.submit);
  });

  it('onClick method calls the onChange passed as prop', () => {
    const { getByTestId } = render(<Button id={mockId} onClick={mockOnClick} />);
    getByTestId(mockId).click();
    expect(mockOnClick.mock.calls).toHaveLength(1);
  });

  it('onBlur method is called correctly', () => {
    const { getByTestId } = render(
      <>
        <Button id={mockId} onBlur={mockOnBlur} />
        <Button id={mockIdSecond} />
      </>
    );
    getByTestId(mockId).focus();
    getByTestId(mockIdSecond).focus();
    expect(mockOnBlur.mock.calls).toHaveLength(1);
  });
});
