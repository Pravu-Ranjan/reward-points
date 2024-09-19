import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Body from './body';

const mockTransactionData = [
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

const mockSetTransactionData = jest.fn();
const mockSetDataLimit = jest.fn();

afterEach(cleanup);

describe('Body Component', () => {
  test('renders without crashing', () => {
    render(
      <Body
        transactionData={mockTransactionData}
        setTransactionData={mockSetTransactionData}
        limit={10}
        setDataLimit={mockSetDataLimit}
      />
    );

    expect(screen.getByText(/Calculation of reward is as follows/i)).toBeInTheDocument();
  });

  test('calculates reward points correctly', () => {
    render(
      <Body
        transactionData={mockTransactionData}
        setTransactionData={mockSetTransactionData}
        limit={10}
        setDataLimit={mockSetDataLimit}
      />
    );

    const input = screen.getByPlaceholderText(/Put your transaction amount/i);
    const button = screen.getByRole('button', { name: /click here to calculate your reward point/i });

    fireEvent.change(input, { target: { value: '120' } });
    fireEvent.click(button);

    expect(screen.getByText(/Points:/)).toHaveTextContent('Points:90');
  });

  test('shows reward points for transactions on table row click', () => {
    render(
      <Body
        transactionData={mockTransactionData}
        setTransactionData={mockSetTransactionData}
        limit={10}
        setDataLimit={mockSetDataLimit}
      />
    );

    const firstRow = screen.getByText('TRANS00001');
    fireEvent.click(firstRow);
   
    const expectedResult = [
      {
        customerID: "K18260",
        transactionID: "TRANS00001",
        transactionDate: "2024-03-01T15:42:00.609Z",
        transactionAmt: "821.18",
        reward: 1492,
      },
      {
        customerID: "A70074",
        transactionID: "TRANS00002",
        transactionDate: "2024-06-23T13:02:38.276Z",
        transactionAmt: "72.78",
        reward: 0,
      },
    ]
   expect(mockSetTransactionData).toHaveBeenCalledWith(expectedResult);
  });
});
