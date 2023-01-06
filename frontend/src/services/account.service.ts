import client from "./client";

const API_URL: string = "/api/eid"

interface AccountServiceInterface {
  token: string
}

export const doSignin = async (props: {email: string, password: string}): Promise<AccountServiceInterface> => {
  // AxiosResponse<AccountInterface>

  const res = await client.post(`${API_URL}/signin`, {
    ea: props.email,
    pk: props.password,
  })

  return res.data.result
  
}