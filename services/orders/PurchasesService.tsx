import  { AxiosResponse } from "axios";
import axiosInstance from "../../utils/axiosInstance";
import base_url from '../../url';
class PurchasedService {
  async getOrders() {
    try {
      const response: AxiosResponse = await axiosInstance.get(
        `${base_url}/orders/purchased`
      );
      return response;
    } catch (error) {
      return error;
    }
 
  }
  async getItemsByPurchasedOrderId(id:string) {
    try {
      const response: AxiosResponse = await axiosInstance.get(
        `${base_url}/orders/purchased/${id}/items`
      );
      return response.data
    } catch (error) {
      return error;
    }
 
  }


}

const PurchasedServiceInstance = new PurchasedService();
export default PurchasedServiceInstance;
