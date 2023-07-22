import axios, { AxiosResponse } from "axios";
const base_url: string = "http://localhost:3001/api";
import axiosInstance from "../utils/axiosInstance";
class ItemsService {
  async getItems() {
    try {
      const response: AxiosResponse = await axiosInstance.get(
        `${base_url}/items`
      );
      return response.data
    } catch (error) {
      return error;
    }
  }
  

}

const ItemsServiceInstance = new ItemsService();
export default ItemsServiceInstance;
