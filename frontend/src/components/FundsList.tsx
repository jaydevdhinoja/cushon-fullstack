import React, { useEffect, useState } from "react";
import { getFunds } from "../services/api";
import { Fund } from "../interface/Fund";

interface Props {
  onSelectFund: (fund: Fund) => void;
}

const FundsList: React.FC<Props> = ({ onSelectFund }) => {
  const [funds, setFunds] = useState<Fund[]>([]);
  const [selectedFundId, setSelectedFundId] = useState<string>("");

  useEffect(() => {
    getFunds()
      .then((response) => {
        setFunds(response.data);
        if (response.data.length > 0) {
          setSelectedFundId(response.data[0].id.toString());
          onSelectFund(response.data[0]);
        }
      })
      .catch((error) => console.error("Failed to fetch funds", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = event.target.value;
    setSelectedFundId(selectedId);
    const fund = funds.find((f) => f.id.toString() === selectedId);
    if (fund) {
      onSelectFund(fund);
    }
  };

  return (
    <div>
      <h2>Select a Fund</h2>
      <select value={selectedFundId} onChange={handleSelectionChange}>
        {funds.map((fund) => (
          <option key={fund.id} value={fund.id}>
            {fund.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FundsList;
