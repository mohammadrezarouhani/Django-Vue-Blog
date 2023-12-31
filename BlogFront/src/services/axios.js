import axios from 'axios';
import { baseURL } from './baseUrl';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import routers from '../routers/index'


const axiosInstance = axios.create({
  baseURL: baseURL,
})

axiosInstance.interceptors.request.use(async req => {

  let accessToken = window.localStorage.getItem('accessToken')
  req.headers.Authorization = `JWT ${accessToken}`;

  const token = jwt_decode(accessToken)
  const isExpired = dayjs.unix(token.exp).diff(dayjs()) < 1
  if (!isExpired) return req

  await axios.post(`${baseURL}/auth/token/jwt/refresh/`, {
    'refresh': window.localStorage.getItem('refreshToken')
  }).then(response => {
    accessToken = response.data.access
    req.headers.Authorization = `JWT ${response.data.access}`
  }).catch(error => {
    routers.push('/login')
    window.localStorage.setItem('isAuthenticated', false)
  })

  return req
})


export default axiosInstance