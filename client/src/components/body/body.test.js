import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Body from './body';

const sampleTransactionData = [
    {
        customerID: "K18260",
        transactionID: "TRANS00001",
        transactionDate: "2024-03-01T15:42:00.609Z",
        transactionAmt: "821.18",
        reward: 0,
      },
      {
        customerID: "A70074",
        transactionID: "TRANS00002",
        transactionDate: "2024-06-23T13:02:38.276Z",
        transactionAmt: "72.78",
        reward: 0,
      },
];

test('Initial Render', () => {
  render(<Body transactionData={sampleTransactionData} setTransactionData={() => {}} limit={10} setDataLimit={() => {}} />);
  expect(screen.getByPlaceholderText('Put your transaction amount')).toBeInTheDocument();
  expect(screen.getByText('Customer ID')).toBeInTheDocument();
  expect(screen.getByText('Transaction ID')).toBeInTheDocument();
  expect(screen.getByText('Date')).toBeInTheDocument();
  expect(screen.getByText('Amount')).toBeInTheDocument();
  expect(screen.getByText('Points')).toBeInTheDocument();
  expect(screen.getByText('10')).toBeInTheDocument();
});

test('Calculate Reward Points', () => {
  render(<Body transactionData={sampleTransactionData} setTransactionData={() => {}} limit={10} setDataLimit={() => {}} />);
  fireEvent.change(screen.getByPlaceholderText('Put your transaction amount'), { target: { value: '150' } });
  fireEvent.click(screen.getByRole('button', { name: /click here to calculate your reward point/i }));
  expect(screen.getByText('Points:')).toHaveTextContent('Points:150');
});

test('Boundary Values for Reward Points', () => {
    render(<Body transactionData={sampleTransactionData} setTransactionData={() => {}} limit={10} setDataLimit={() => {}} />);
    fireEvent.change(screen.getByPlaceholderText('Put your transaction amount'), { target: { value: '50' } });
    fireEvent.click(screen.getByRole('button', { name: /click here to calculate your reward point/i }));
    expect(screen.getByText('Points:')).toHaveTextContent('Points:0');
  
    fireEvent.change(screen.getByPlaceholderText('Put your transaction amount'), { target: { value: '100' } });
    fireEvent.click(screen.getByRole('button', { name: /click here to calculate your reward point/i }));
    expect(screen.getByText('Points:')).toHaveTextContent('Points:50');
  });

  test('Accessibility Check', () => {
    render(<Body transactionData={sampleTransactionData} setTransactionData={() => {}} limit={10} setDataLimit={() => {}} />);
    expect(screen.getByPlaceholderText('Put your transaction amount')).toHaveAttribute('aria-label', 'put your reward point');
    expect(screen.getByRole('button', { name: /click here to calculate your reward point/i })).toHaveAttribute('aria-label', 'click here to calculate your reward point');
  });
  
test('Change Data Limit', () => {
  const setDataLimit = jest.fn();
  render(<Body transactionData={sampleTransactionData} setTransactionData={() => {}} limit={10} setDataLimit={setDataLimit} />);
  fireEvent.click(screen.getByText('10'));
  fireEvent.click(screen.getByText('20'));
  expect(setDataLimit).toHaveBeenCalledWith(20);
});
