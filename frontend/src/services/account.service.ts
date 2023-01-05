import client from "./client";


interface AccountServiceInterface {
  token: string
}

export const doSignin = async (props: {email: string, password: string}): Promise<AccountServiceInterface> => {
  // AxiosResponse<AccountInterface>

  const res = await client.post(`/api/eid/signin`, {
    ea: props.email,
    pk: props.password,
  })

  return res.data.result
  
}