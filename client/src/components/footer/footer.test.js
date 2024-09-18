import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Footer from './footer';

test('renders pagination items correctly', () => {
  render(<Footer pageCount={10} setDataPage={jest.fn()} />);
  expect(screen.getByText('1')).toBeInTheDocument();
  expect(screen.getByText('2')).toBeInTheDocument();
  expect(screen.getByText('10')).toBeInTheDocument();
});

test('calls setDataPage with correct page number', () => {
  const setDataPageMock = jest.fn();
  render(<Footer pageCount={10} setDataPage={setDataPageMock} />);

  fireEvent.click(screen.getByText('1'));
  expect(setDataPageMock).toHaveBeenCalledWith(1);

  fireEvent.click(screen.getByText('2'));
  expect(setDataPageMock).toHaveBeenCalledWith(2);

  fireEvent.click(screen.getByText('10'));
  expect(setDataPageMock).toHaveBeenCalledWith(10);
});

test('navigates to the first page', () => {
  render(<Footer pageCount={10} setDataPage={jest.fn()} />);
  fireEvent.click(screen.getByText('First'))
  expect(screen.getByText('Previous').closest('li')).toHaveClass('disabled');
});

test('navigates to the last page', () => {
  render(<Footer pageCount={10} setDataPage={jest.fn()} />);
  fireEvent.click(screen.getByText('Last'));
  expect(screen.getByText('Next').closest('li')).toHaveClass('page-item')
});

test('increments and decrements page number correctly', () => {
  render(<Footer pageCount={10} setDataPage={jest.fn()} />);

  fireEvent.click(screen.getByText('Next'));
  expect(screen.getByText('2')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Previous'));
  expect(screen.getByText('1')).toBeInTheDocument();
});
