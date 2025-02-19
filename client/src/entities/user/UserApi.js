import { axiosInstance } from '../../shared/lib/axiosinstance';

export default class UserApi {
  static async refreshTokens() {
    const response = await axiosInstance.get('/auth/refreshTokens');
    console.log(response);
    return response.data;
  }

  static async signUp(userData) {
    const { data } = await axiosInstance.post('/auth/signUp', userData);
    return data;
  }

  static async signIn(userData) {
    const { data } = await axiosInstance.post('/auth/signIn', userData);
    return data;
  }

  static async signOut() {
    const { data } = await axiosInstance.get('/auth/signOut');
    return data;
  }
}
