import "./App.css";
import Header from "./components/header/header";
import Body from "./components/body/body";
import Footer from "./components/footer/footer";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { FcDeleteDatabase, FcEngineering } from "react-icons/fc";

function App() {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(5);
  const [transactionData, setTransactionData] = useState([]);
  const [apiError, seApiError] = useState(true);
  const [loader, setLoader] = useState(true);
  const setDataLimit = (data) => {
    setLimit(data);
  };
  const setDataPage = (data) => {
    setPage(data);
  };
 
  const fetchTransaction = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/rewardapp/getreward`,
        {
          params: { page: page, limit: limit },
        }
      );
      if (response.data.error) {
        seApiError(true)
        setLoader(false)
      } else {
        seApiError(false)
        setLoader(false)
        setTransactionData(response.data.data);
        setPageCount(response.data.record / limit);
      }
    } catch (error) {
      setLoader(false)
      seApiError(true)
      console.error("Error fetching data:", error);
    }
  },[limit, page]);

  useEffect(() => {
    fetchTransaction();
  }, [fetchTransaction]);

  return (
    <div className="App">
      <Header />
      {loader ? (
        <div className="App-logo mx-auto">
          <FcEngineering size={200} title="loader"/>
        </div>
      ) : apiError ? (
        <div className="mx-auto p-5">
          <h3>No Data found!!!</h3> <FcDeleteDatabase size={80} />
        </div>
      ) : (
        <>
          <Body
            transactionData={transactionData}
            setTransactionData={setTransactionData}
            limit={limit}
            setDataLimit={setDataLimit}
          />
          <Footer pageCount={pageCount} setDataPage={setDataPage} />
        </>
      )}
    </div>
  );
}

export default App;
