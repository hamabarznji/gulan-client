
import axios, { AxiosResponse } from 'axios';
const  base_url:string="http://localhost:3001/api/users"
import Cookies from 'js-cookie';
class UserService{

 
    async login(email:string,password:string){
        try{
            const response:AxiosResponse=await axios.post(`http://localhost:3000/api/auth`,{
                email:email,
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

    
    async logout(){
        try{
            const response:AxiosResponse<{token:string}>=await axios.get('http://localhost:3000/api/logout')
            return response.data
        }
        catch(error){
            return error
        }
    }

}


const UserServiceInstance=new UserService()
export default  UserServiceInstance

