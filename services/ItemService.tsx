import axios, { AxiosResponse, AxiosError } from "axios";
const base_url: string = "http://localhost:3001/api";
import axiosInstance from "../utils/axiosInstance";

class ItemsService {
  async getItems(): Promise<any> {
    try {
      const response: AxiosResponse = await axiosInstance.get(`${base_url}/items`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get items: ${error.message}`);
    }
  }

  async addItem(data: any): Promise<AxiosResponse | AxiosError> {
    try {
      const response: AxiosResponse = await axiosInstance.post(`${base_url}/items/add`, data);
      return response;
    } catch (error) {
      throw new Error(`Failed to add item: ${error.message}`);
    }
  }

  async getItemById(id: string): Promise<any> {
    try {
      const response: AxiosResponse = await axiosInstance.get(`${base_url}/items/${id}/purchased`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get item by ID: ${error.message}`);
    }
  }

  async getItemInfo(): Promise<any> {
    try {
      const response: AxiosResponse = await axiosInstance.get(`${base_url}/items/info`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get item info: ${error.message}`);
    }
  }
}

const ItemsServiceInstance = new ItemsService();
export default ItemsServiceInstance;
