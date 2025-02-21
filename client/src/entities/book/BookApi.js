// import axios from "axios";
import { axiosInstance } from "../../shared/lib/axiosinstance";


export class BookApi {

  static async getAll(){
    const response = await axiosInstance.get('/books')
    return response.data.data
  }

  static async create(inputs){
    try {
      const {data} = await axiosInstance.post('/books', inputs)
      return data
    } catch (error) {
      console.error('ОШИБКА ТУТ', error)
			throw error
    }

    
  }

  static async delete(id){
    const {data} = await axiosInstance.delete(`/books/${id}`)
    return data
  }
}