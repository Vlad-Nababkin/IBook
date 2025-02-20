// import axios from "axios";
import { axiosInstance } from "../../shared/lib/axiosinstance";


export class BookApi {

  static async getAll(){
    const {data} = axiosInstance.get('/books')
    return data
  }

  static async create(inputs){
    const {data} = await axiosInstance.post('/books', inputs)
    return data
  }
}