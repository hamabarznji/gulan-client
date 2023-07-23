import axios, { AxiosResponse } from "axios";
const base_url: string = "http://localhost:3001/api";
import axiosInstance from "../utils/axiosInstance";
class ItemCategoriesService {
  async getItemCategories() {
    try {
      const response: AxiosResponse = await axiosInstance.get(
        `${base_url}/items/categories`
      );
      return response.data
    } catch (error) {
      return error;
    }
  }
  

}

const ItemCategoriesServiceInstance = new ItemCategoriesService();
export default ItemCategoriesServiceInstance;
