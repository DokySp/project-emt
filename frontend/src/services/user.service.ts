import client from "./client";


interface UserServiceInterface {
  
}

export const doSignin = async (props: {email: string, password: string}): Promise<UserServiceInterface> => {
  // AxiosResponse<UserServiceInterface>

  // const res = await client.get(`/api/user`, {})
  // const res = await client.post(`/api/user`, {})
  // const res = await client.patch(`/api/user`, {})
  // const res = await client.delete(`/api/user`, {})

  // const res = await client.get(`/api/user/division`, {})
  // const res = await client.post(`/api/user/division`, {})
  // const res = await client.delete(`/api/user/division`, {})

  // const res = await client.get(`/api/user/course`, {})
  // const res = await client.post(`/api/user/course`, {})
  // const res = await client.delete(`/api/user/course`, {})

  return {}
  
}