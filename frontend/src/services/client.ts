import axios, { AxiosError } from "axios";
import { API_URL } from "../constants/url";


const client = axios.create({ baseURL: API_URL })

client.interceptors.response.use(
  response => response,
  (error: AxiosError): Promise<never> => {
    // window.alert("Server error")
    return Promise.reject(error)
  }
)

export default client