import React, { useEffect, useState } from "react";
import FundsList from "./components/FundsList";
import InvestForm from "./components/InvestForm";
import InvestmentList from "./components/InvestmentList";
import { Investment } from "./interface/Investment";
import { getInvestments } from "./services/api";
import "./styles/main.scss";

const App: React.FC = () => {
  const [selectedFund, setSelectedFund] = useState(null);
  const [investments, setInvestments] = useState<Investment[]>([]);

  //get existing investments
  useEffect(() => {
    getInvestments()
      .then((response) => {
        setInvestments(response.data);
      })
      .catch((error) => console.error("Error fetching investments:", error));
  }, []);

  // add the new investment to the existing state
  const addInvestment = (investment: Investment) => {
    setInvestments((prevInvestments) => [...prevInvestments, investment]);
  };

  const handleSelectFund = (fund: any) => {
    setSelectedFund(fund);
  };

  return (
    <div className="app">
      <div className="container">
        <FundsList onSelectFund={handleSelectFund} />
        {selectedFund && (
          <InvestForm selectedFund={selectedFund} onInvest={addInvestment} />
        )}
        <InvestmentList investments={investments} />
      </div>
    </div>
  );
};

export default App;
