import  { AxiosResponse, AxiosError } from "axios";
import axiosInstance from "../utils/axiosInstance";
import base_url from './url';
class SizeService {
  async getSizes() {
    try {
      const response: AxiosResponse = await axiosInstance.get(
        `${base_url}/items/sizes`
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
  async addSize(data: any) {
    try {
      const response: AxiosResponse = await axiosInstance.post(
        `${base_url}/items/sizes`,
        data
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateSize(data:any){
    try{
        const response:AxiosResponse=await axiosInstance.patch(`${base_url}/items/sizes/${data.id}`,data)
        return response
    }
    catch(error){
        return error
    }

}
}

const SizesServiceInstance = new SizeService();
export default SizesServiceInstance;
