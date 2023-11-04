import  { AxiosResponse, AxiosError } from "axios";
import axiosInstance from "../utils/axiosInstance";
import base_url from './url';
class VendorsService {
  async getVendors() {
    try {
      const response: AxiosResponse = await axiosInstance.get(
        `${base_url}/items/vendors`
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
  async addVendor(data: any) {
    try {
      const response: AxiosResponse = await axiosInstance.post(
        `${base_url}/items/vendors`,
        data
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateVendor(data:any){
    try{
        const response:AxiosResponse=await axiosInstance.patch(`${base_url}/items/vendors/${data.id}`,data)
        return response
    }
    catch(error){
        return error
    }

}
}

const VendorsServiceInstance = new VendorsService();
export default VendorsServiceInstance;
