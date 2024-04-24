import React, { useState } from "react";
import { postInvestment } from "../services/api";
import { Fund } from "../interface/Fund";
import { Investment } from "../interface/Investment";

interface InvestFormProps {
  selectedFund: Fund | null;
  onInvest: (investment: Investment) => void;
}

const InvestForm: React.FC<InvestFormProps> = ({ selectedFund, onInvest }) => {
  const [amount, setAmount] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedFund) {
      postInvestment(selectedFund.id, parseFloat(amount))
        .then((res) => {
          setIsSubmitted(true);
          onInvest({
            id: res.data.id,
            amount: parseFloat(amount),
            fundName: selectedFund.name,
          });
          setAmount("");
        })
        .catch((error) => {
          console.error("Failed to invest", error);
          setIsSubmitted(false);
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Invest in {selectedFund?.name}</h2>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <button type="submit">Invest</button>
      </form>
      {isSubmitted && <p>Investment Successful!</p>}
    </>
  );
};

export default InvestForm;
