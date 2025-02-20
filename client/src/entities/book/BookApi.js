// import axios from "axios";
import { axiosInstance } from "../../shared/lib/axiosinstance";


export class BookApi {

  static async getAll(){
    const {data} = axiosInstance.get('/books')
    return data
  }

  static async create(inputs){

    
    const {data} = await axiosInstance.post('/books', inputs)
    console.log("=====>>",data);
    
    return data
  }

  static async delete(id){
    const {data} = await axiosInstance.delete(`/books/${id}`)
    return data
  }
}