// import axios from "axios";
import { axiosInstance } from '../../shared/lib/axiosinstance';

export class BookApi {


  static async getAll(){
    const response = await axiosInstance.get('/books')
    console.log('!!!!!!!!!!!',response.data)
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

  static async getById(id){
    const {data} = await axiosInstance.get(`/books/${id}`)
    return data
  }

  static async delete(id) {
    const { data } = await axiosInstance.delete(`/books/${id}`);
    return data;
  }

    //изменить одну
    static async update(id, inputs) {
      const { data } = await axiosInstance.put(`/books/${id}`, inputs);
      return data;
    }
}
