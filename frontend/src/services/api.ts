import axios from "axios";

const baseURL = "http://localhost:3001";

export const getFunds = () => {
  return axios.get(`${baseURL}/funds`);
};

export const postInvestment = (fundId: number, amount: number) => {
  return axios.post(`${baseURL}/invest`, { fundId, amount });
};
