import React from "react";
import { Container, Col, Row, Table, Dropdown } from "react-bootstrap";
import { FcFilledFilter } from "react-icons/fc";

function Body({ transactionData,setTransactionData,limit, setDataLimit }) {

    const setDataLimitForPage = (data) => {
        setDataLimit(data)
    }

    const calculateRewardPoints = (amount) => {
        let points = 0
        switch (amount > 0) {
            case (amount < 50):
              points = 0;
              break;
            case (amount >= 50 && amount <= 100):
              points = (amount - 50) * 1;
              break;
            case (amount > 100):
              points = (amount - 100) * 2 + 50;
              break;
            default:
              points = 0;
          }
        return parseInt(points)
    }
    const showRewardPoint = (transaction) => {
        setTransactionData(prevData =>
           prevData.map(item =>
              item.transactionID === transaction.transactionID
                ? { ...item, reward: calculateRewardPoints(item.transactionAmt) }
                : item
            )
          );
    }

  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col md={11}>
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
                  <td onClick={()=>showRewardPoint(data)}>{key + 1}</td>
                  <td onClick={()=>showRewardPoint(data)}>{data.customerID}</td>
                  <td onClick={()=>showRewardPoint(data)}>{data.transactionID}</td>
                  <td onClick={()=>showRewardPoint(data)}>{new Date(data.transactionDate).toLocaleString()}</td>
                  <td onClick={()=>showRewardPoint(data)}>{data.transactionAmt}</td>
                  <td>{data?.reward}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col md={1}>
          <Dropdown>
            <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
              <FcFilledFilter size={20}/> {limit}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={()=>setDataLimitForPage(5)}>5</Dropdown.Item>
              <Dropdown.Item onClick={()=>setDataLimitForPage(10)}>10</Dropdown.Item>
              <Dropdown.Item onClick={()=>setDataLimitForPage(20)}>20</Dropdown.Item>
              <Dropdown.Item onClick={()=>setDataLimitForPage(50)}>50</Dropdown.Item>
              <Dropdown.Item onClick={()=>setDataLimitForPage(100)}>100</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </Container>
  );
}

export default Body;
