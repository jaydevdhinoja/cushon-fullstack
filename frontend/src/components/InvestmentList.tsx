import React from "react";
import { Investment } from "../interface/Investment";

interface InvestmentListProps {
  investments: Investment[];
}

const InvestmentList: React.FC<InvestmentListProps> = ({ investments }) => {
  return (
    <div>
      <h2>Invested Funds</h2>
      <table>
        <thead>
          <tr>
            <th>Fund Name</th>
            <th>Amount Invested</th>
          </tr>
        </thead>
        <tbody>
          {investments.map((investment) => (
            <tr key={investment.id}>
              <td>{investment.fundName}</td>
              <td>£{investment.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvestmentList;
