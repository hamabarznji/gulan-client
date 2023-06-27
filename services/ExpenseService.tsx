import axios, { AxiosResponse } from "axios";
const base_url: string = "http://localhost:3001/api";
import axiosInstance from "../utils/axiosInstance";
class ExpenseService {
  async getExpenses() {
    try {
      const response: AxiosResponse = await axiosInstance.get(
        `${base_url}/expenses`
      );
      console.log({response});
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
