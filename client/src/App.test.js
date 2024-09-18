import { render, screen } from '@testing-library/react';
import App from './App';


jest.mock('axios');

test('renders Header component', () => {
  render(<App />);
  const headerElement = screen.getByText(/Reward Point/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders loading state initially', () => {
  render(<App />);
  const loadingElement = screen.getByRole('img', { name: /engineering/i });
  expect(loadingElement).toBeInTheDocument();
});

test('fetches and displays data', async () => {
  axios.get.mockResolvedValue({
    data: {
      error: false,
      data: [{ id: 1, name: 'Transaction 1' }],
      record: 1,
    },
  });

  render(<App />);

  await waitFor(() => {
    const transactionElement = screen.getByText(/Transaction 1/i);
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

test('changes page on pagination click', async () => {
  axios.get.mockResolvedValue({
    data: {
      error: false,
      data: [{ id: 1, name: 'Transaction 1' }],
      record: 1,
    },
  });

  render(<App />);

  const nextPageButton = screen.getByRole('button', { name: /Next/i });
  fireEvent.click(nextPageButton);

  await waitFor(() => {
    const transactionElement = screen.getByText(/Transaction 1/i);
    expect(transactionElement).toBeInTheDocument();
  });
});

