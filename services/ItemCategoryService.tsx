import{ AxiosResponse } from "axios";
import base_url from '../url';
import axiosInstance from "../utils/axiosInstance";
class ItemCategoriesService {
  async getItemCategories() {
    try {
      const response: AxiosResponse = await axiosInstance.get(
        `${base_url}/items/categories`
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
  async addItemCategory(data: any) {
    try {
      const response: AxiosResponse = await axiosInstance.post(
        `${base_url}/items/categories`,
        data
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateCategory(data:any){
    try{
        const response:AxiosResponse=await axiosInstance.patch(`${base_url}/items/categories/${data.id}`,data)
        return response
    }
    catch(error){
        return error
    }

}
}

const ItemCategoriesServiceInstance = new ItemCategoriesService();
export default ItemCategoriesServiceInstance;
