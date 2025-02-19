import axios from 'axios';

//TODO - создаем экземпляр axios
export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API}`, //? - все запросы летят на /api
  headers: { 'Content-Type': 'application/json' }, //? - все запросы летят с указанием типа контента
  withCredentials: true, //? - все запросы включают куки
});

//* переменная для хранения кратковременного токена
let accessToken = '';

//* функция для перезаписи кратковременного токена
export function setAccessToken(token) {
  accessToken = token;
}

//* Перехватчик запросов: в каждый запрос добавляет HTTP заголовок Authorization, значением заголовка будет кратковременный токен
axiosInstance.interceptors.request.use((config) => {
  if (!config.headers.authorization) {
    config.headers.authorization = `Bearer ${accessToken}`;
  }
  return config;
});

//* Перехватчик ответов:
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    //? запомнили информацию о прошлом запросе
    const prevRequest = error.config;
    //?  проверяем статус и проверка на первичность запроса, если попали внутрь, значит токен протух и нам нужна новая пара
    if (error.response.status === 403 && !prevRequest.sent) {
      //? делаем запрос на пару токенов
      const response = await axiosInstance.get('/auth/refreshTokens');
      //? достаем токен из ответа
      setAccessToken(response.data.accessToken);
      //? и создаем новый ключ и sent для проверки первичности
      prevRequest.sent = true;
      //? устанавливаем заголовки
      prevRequest.headers.authorization = `Bearer ${accessToken}`;
      //? делаем повторный запрос
      return axiosInstance(prevRequest);
    }
    return Promise.reject(error);
  }
);
