import axios from 'axios';
import { clearStore } from '../features/user/userSlice';
import { getUserFromLocalStorage } from './localStorage';

const customFetch = axios.create({
  baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit',
  // 我们自己添加axios 请求 都是跟这个create 有关 所以 要开梯子  包括注册和登录 也会用到这个fetch
  // baseURL: 'https://localhost:3000'
});

customFetch.interceptors.request.use((config) => {
  // 请求拦截器作用是在发出请求时，拦截下用户的请求，执行完一系列处理再发送出去（像添加cookie、token，请求头等）
  // 添加header

  // 这样 customfetch的每个指令都可以加上一个header
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers.common['Authorization'] = `Bearer ${user.token}`;
  }
  return config;
});

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  // 已经登出了  没有授权了
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};

export default customFetch;
