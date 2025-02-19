import { axiosInstance } from '../../shared/lib/axiosinstance';

export class TaskApi {
  static async getAll() {
    const { data } = await axiosInstance.get('/tasks');
    return data;
  }

  static async getById(id) {
    const { data } = await axiosInstance.get(`/tasks/${id}`);
    return data;
  }

  static async create(inputs) {
    const { data } = await axiosInstance.post('/tasks', inputs);
    return data;
  }

  static async delete(id) {
    const { data } = await axiosInstance.delete(`/tasks/${id}`);
    return data;
  }
}
