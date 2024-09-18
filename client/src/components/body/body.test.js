import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Body from "./body"; // Adjust the import path as necessary

describe("Body Component", () => {
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

  const setTransactionDataMock = jest.fn();
  const setDataLimitMock = jest.fn();

  console.log(setTransactionDataMock.mock.calls, "jkhkjj");

  beforeEach(() => {
    setTransactionDataMock.mockClear();
    setDataLimitMock.mockClear();
    render(
      <Body
        transactionData={mockTransactionData}
        setTransactionData={setTransactionDataMock}
        limit={10}
        setDataLimit={setDataLimitMock}
      />
    );
  });

  test("renders transaction data correctly", () => {
    expect(screen.getByText("K18260")).toBeInTheDocument();
    expect(screen.getByText("A70074")).toBeInTheDocument();
    expect(screen.getByText("$ 821.18")).toBeInTheDocument();
    expect(screen.getByText("$ 72.78")).toBeInTheDocument();
  });

  test("calculates reward points correctly", () => {
    fireEvent.change(
      screen.getByPlaceholderText("Put your transaction amount"),
      {
        target: { value: "150" },
      }
    );
    fireEvent.click(
      screen.getByRole("button", {
        name: /click here to calculate your reward point/i,
      })
    );
    expect(screen.getByText("Points:")).toBeInTheDocument();
    expect(screen.getByText("150")).toBeInTheDocument();
  });

  test("updates transaction data with reward points", () => {
    
    fireEvent.click(screen.getByText("1"));
    expect(setTransactionDataMock).toHaveBeenCalledWith([
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
        reward: 22,
      },
    ]);
  });

  test("changes data limit correctly", () => {
    fireEvent.click(screen.getByText("10"));
    fireEvent.click(screen.getByText("20"));
    expect(setDataLimitMock).toHaveBeenCalledWith(20);
  });
});
