import axios, { AxiosResponse, AxiosError } from "axios";
const base_url: string = "http://localhost:3001/api";
import axiosInstance from "../utils/axiosInstance";

class SellOrderService {
  async getSellOrders(): Promise<any> {
    try {
      const response: AxiosResponse = await axiosInstance.get(
        `${base_url}/orders/sell`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get sell orders: ${error.message}`);
    }
  }
  async createSellOrders(data: any): Promise<any> {
    try {
      const response: AxiosResponse = await axiosInstance.post(
        `${base_url}/orders/sell/create`,
        data
      );
      console.log(response);
      return response.status;
    } catch (error) {
      throw new Error(`Failed to get items: ${error.message}`);
    }
  }
}

const SellOrderServiceInstance = new SellOrderService();
export default SellOrderServiceInstance;
