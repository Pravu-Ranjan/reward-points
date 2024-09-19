import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios');

test('renders Header component', () => {
  render(<App />);
  const headerElement = screen.getByText(/Reward Point/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders loading state initially', () => {
  screen.debug()
  render(<App />);
  const loadingElement = screen.getByText(/loader/i);
  expect(loadingElement).toBeInTheDocument();
});

test('fetches and displays data', async () => {
  axios.get.mockResolvedValue({
    data: {
      error: false,
      data: [ {
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
      }],
      total:2,
      record:1000,
      message: "got your data",
    },
  });

  render(<App />);

  await waitFor(() => {
    const transactionElement = screen.getByText(/K18260/i);
    expect(transactionElement).toBeInTheDocument();
  });
});

test('displays error message on fetch failure', async () => {
  axios.get.mockRejectedValue(new Error('Network Error'));

  render(<App />);

  await waitFor(() => {
    const errorElement = screen.getByText(/No Data found!!!/i);
    expect(errorElement).toBeInTheDocument();
  });
});


