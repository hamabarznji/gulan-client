import { AxiosResponse } from "axios";
const base_url: string = "http://localhost:3001/api";
import axiosInstance from "../utils/axiosInstance";
class VendorsService {
  async getVendors() {
    try {
      const response: AxiosResponse = await axiosInstance.get(
        `${base_url}/items/vendors`
      );
      return response.data
    } catch (error) {
      return error;
    }
  }
  

}

const VendorsServiceInstance = new VendorsService();
export default VendorsServiceInstance;
