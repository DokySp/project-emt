import axios, { AxiosError } from "axios";
import { API_URL } from "../constants/url";
// import QueryString from "qs";
// client.defaults.paramsSerializer = params => QueryString.stringify(params)


const client = axios.create({ baseURL: API_URL })

export const setClientAuthorizationHeader = (props: {token: string}) => {
  client.defaults.headers.common["Authorization"] = `Bearer ${props.token}`
}

export const removeClientAuthorizationHeader = () => {
  delete client.defaults.headers.common["Authorization"]
}

client.interceptors.response.use(
  response => response,
  (error: AxiosError): Promise<never> => {
    // window.alert("Server error")
    return Promise.reject(error)
  }
)

export default client