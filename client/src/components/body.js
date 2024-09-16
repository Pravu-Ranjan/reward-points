import React, { useState } from "react";
import {
  Container,
  Col,
  Row,
  Table,
  Dropdown,
  Form,
  Button,
} from "react-bootstrap";
import { FcCalculator, FcFilledFilter } from "react-icons/fc";
import { PiNumberCircleOneDuotone, PiNumberCircleThreeDuotone, PiNumberCircleTwoDuotone } from "react-icons/pi";

function Body({ transactionData, setTransactionData, limit, setDataLimit }) {
  const [rewardPoint, setRewardPoint] = useState({
    inputedTransactionValue: 0,
    rewardedPoints: 0,
  });
  const setDataLimitForPage = (data) => {
    setDataLimit(data);
  };

  const calculateRewardPoints = (amount) => {
    let points = 0;
    switch (amount > 0) {
      case amount < 50:
        points = 0;
        break;
      case amount >= 50 && amount <= 100:
        points = (amount - 50) * 1;
        break;
      case amount > 100:
        points = (amount - 100) * 2 + 50;
        break;
      default:
        points = 0;
    }
    setRewardPoint((prevState) => ({
      ...prevState,
      rewardedPoints: parseInt(points),
    }));
    return parseInt(points);
  };

  const onChnageRewardPoint = (event) => {
    setRewardPoint((prevState) => ({
      ...prevState,
      inputedTransactionValue: parseInt(event.target.value),
    }));
  };

  const showRewardPoint = (transaction) => {
    setTransactionData((prevData) =>
      prevData.map((item) =>
        item.transactionID === transaction.transactionID
          ? { ...item, reward: calculateRewardPoints(item.transactionAmt) }
          : item
      )
    );
  };

  return (
    <Container className="mt-3" fluid="md">
      <Row className="justify-content-evenly">
        <Col sm={6}>
          <h6 className="text-start mb-0">
            Calculation of reward is as follows:-
          </h6>
          <p className="text-start fst-italic">
          <PiNumberCircleOneDuotone size={20}/>{" "}If the transaction is above $100, Customer recieve 2 points.
            <br />
            <PiNumberCircleTwoDuotone size={20}/>{" "}1 Point for every dollar spent between $50 to $100
            <br />
            <PiNumberCircleThreeDuotone size={20}/>{" "}If the transaction value is less than $50 then no points were
            assigned.
          </p>
        </Col>
        <Col sm={6}>
          <h6 className="text-start">Calculate your reward points</h6>
          <Col sm={12} className="d-flex justify-content-between gap-3">
            <Form.Control
              type="number"
              placeholder="Put your transaction amount"
              aria-label="transactionAmt"
              onChange={(event) => onChnageRewardPoint(event)}
            />
            <Button
              variant="outline-success"
              onClick={() =>
                calculateRewardPoints(rewardPoint.inputedTransactionValue)
              }
              className={
                rewardPoint.inputedTransactionValue === 0 ? "disabled" : "show"
              }
            >
              <FcCalculator size={30}/>
            </Button>
          </Col>
          <p className="text-start mt-2">Points:{rewardPoint.rewardedPoints}</p>
        </Col>
        <Col sm={6}></Col>
      </Row>
      <Row className="justify-content-around flex-wrap-reverse">
        <Col sm={10}>
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>Sl No.</th>
                <th>Customer ID</th>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {transactionData?.map((data, key) => (
                <tr key={key}>
                  <td onClick={() => showRewardPoint(data)}>{key + 1}</td>
                  <td onClick={() => showRewardPoint(data)}>
                    {data.customerID}
                  </td>
                  <td onClick={() => showRewardPoint(data)}>
                    {data.transactionID}
                  </td>
                  <td onClick={() => showRewardPoint(data)}>
                    {new Date(data.transactionDate).toLocaleString()}
                  </td>
                  <td onClick={() => showRewardPoint(data)}>
                    {data.transactionAmt}
                  </td>
                  <td>{data?.reward}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col sm={2}>
          <Dropdown>
            <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
              <FcFilledFilter size={20} /> {limit}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setDataLimitForPage(5)}>
                5
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setDataLimitForPage(10)}>
                10
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setDataLimitForPage(20)}>
                20
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setDataLimitForPage(50)}>
                50
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setDataLimitForPage(100)}>
                100
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col sm={12}>
          <h6 className="text-start text-info">
            Click! anywhere on the table except points column to show the points
            for the respective transaction
          </h6>
        </Col>
      </Row>
    </Container>
  );
}

export default Body;
