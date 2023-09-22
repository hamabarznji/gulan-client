import axios, { AxiosResponse } from "axios";
const base_url: string = "http://localhost:3001/api/orders";
import axiosInstance from "../../utils/axiosInstance";
class PurchasedService {
  async getOrders() {
    try {
      const response: AxiosResponse = await axiosInstance.get(
        `${base_url}/purchased`
      );
      return response;
    } catch (error) {
      return error;
    }
 
  }
  async getItemsByPurchasedOrderId(id:string) {
    try {
      const response: AxiosResponse = await axiosInstance.get(
        `${base_url}/purchased/${id}/items`
      );
      return response.data
    } catch (error) {
      return error;
    }
 
  }


}

const PurchasedServiceInstance = new PurchasedService();
export default PurchasedServiceInstance;
