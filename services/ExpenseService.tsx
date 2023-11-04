import  { AxiosResponse } from "axios";
import base_url from '../url';
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
  async getExpensesSummary() {
    try {
      const response: AxiosResponse = await axiosInstance.get(
        `${base_url}/expenses/summary_report`
      );
      return response.data
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
  async getTopExpenses() {
    try {
      const response: AxiosResponse = await axiosInstance.get(`${base_url}/expenses/top`)
      return response.data
    } catch (error) {
      return error;
    }
  }
  async getExpenseCategories() {
    try {
      const response: AxiosResponse = await axiosInstance.get(`${base_url}/expenses/categories`)
      return response.data
    } catch (error) {
      return error;
    }
  }

}

const ExpenseServiceInstance = new ExpenseService();
export default ExpenseServiceInstance;
