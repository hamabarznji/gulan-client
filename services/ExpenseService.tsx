import axios, { AxiosResponse } from "axios";
const base_url: string = "http://localhost:3001/api";
import axiosInstance from "../utils/axiosInstance";
class ExpenseService {
  async getExpenses() {
    try {
      const response: AxiosResponse = await axiosInstance.get(
        `${base_url}/expenses`
      );
      return response;
    } catch (error) {
      return error;
    }
  }
  async addExpense(data:any) {
    try {
      const response: AxiosResponse = await axiosInstance.post(
        `${base_url}/expenses`,data
      );
      return response;
    } catch (error) {
      return error;
    }
  }
  async updateExpense(data:any) {
    try {
      const response: AxiosResponse = await axiosInstance.patch(
        `${base_url}/expenses`,data
      );
      return response;
    } catch (error) {
      return error;
    }
  }
  async getTopExpenses(data:any) {
    try {
      const response: AxiosResponse = await axiosInstance.get(`${base_url}/expenses/top`)
      return response;
    } catch (error) {
      return error;
    }
  }

  // async addExpense(expense:any):Promise<AxiosResponse<any>>{}

  // async updateExpense(expense:any):Promise<AxiosResponse<any>>{}

  // async deleteExpense(expense:any):Promise<AxiosResponse<any>>{}
}

const ExpenseServiceInstance = new ExpenseService();
export default ExpenseServiceInstance;
