
import axios, { AxiosResponse } from 'axios';
const  base_url:string="http://localhost:3001/api"
import Cookies from 'js-cookie';
import axiosInstance from '../utils/axiosInstance';

class UserService{

 
    async login(username:string,password:string){
        try{
            const response:AxiosResponse=await axios.post(`http://localhost:3000/api/auth`,{
                username:username,
                password:password
            },)
            Cookies.set('token',response?.data?.user?.token)
            return {
                status:response?.data?.status,
                token:response?.data?.user?.token
            }
        }
        catch(error){
            // return error?.response?.data?.status
            return error
        }

    }
    async getUsers(){
        try{
            const response:AxiosResponse=await axiosInstance.get(`${base_url}/users`,)
            return response
        }
        catch(error){
            return error
        }

    }

    async addUser(data:any){
        try{
            const response:AxiosResponse=await axiosInstance.post(`${base_url}/users`,data)
            return response
        }
        catch(error){
            return error
        }

    }

    async updateUser(data:any){
        try{
            const response:AxiosResponse=await axiosInstance.patch(`${base_url}/users/${data.id}`,data)
            return response
        }
        catch(error){
            return error
        }

    }
    async logout(){
        try{
            const response:AxiosResponse<{token:string}>=await axios.get('http://localhost:3000/api/logout')
            return response.data
        }
        catch(error){
            return error
        }
    }
    async getSession(){
        try{
            const response:AxiosResponse<any>=await axios.get('http://localhost:3000/api/get-session')
            return response
        }
        catch(error){
            return error
        }
    }

}


const UserServiceInstance=new UserService()
export default  UserServiceInstance

