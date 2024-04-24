import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

export const getFunds = () => axios.get(`${baseURL}/funds`);
export const getInvestments = () => axios.get(`${baseURL}/investments`);
export const postInvestment = (fundId: number, amount: number) =>
  axios.post(`${baseURL}/invest`, { fundId, amount });
