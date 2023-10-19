import { AxiosResponse } from "axios";
const base_url: string = "http://localhost:3001/api";
import axiosInstance from "../utils/axiosInstance";
class ColorsService {
  async getColors() {
    try {
      const response: AxiosResponse = await axiosInstance.get(
        `${base_url}/items/colors`
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
  async addCOlor(data: any) {
    try {
      const response: AxiosResponse = await axiosInstance.post(
        `${base_url}/items/colors`,
        data
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateColor(data:any){
    try{
        const response:AxiosResponse=await axiosInstance.patch(`${base_url}/items/colors/${data.id}`,data)
        return response
    }
    catch(error){
        return error
    }

}
}

const ColorsServiceInstance = new ColorsService();
export default ColorsServiceInstance;
