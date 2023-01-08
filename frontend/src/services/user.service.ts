import { CourseInterface, DivisionInterface, UserInterface } from "../schemas/interfaces";
import client from "./client";

const API_URL: string = "/api/user"

// User
export const getUser = async (props: {idx: number}): Promise<UserInterface> => {
  // AxiosResponse<UserServiceInterface>

  const res = await client.get(API_URL, {params: {idx: props.idx}})
  const result: UserInterface = res.data.result[0]

  result.issued_at = new Date(result.issued_at!)
  result.created = new Date(result.created!)

  return {...res.data.result[0]}
}

export const createUser = async (props: UserInterface): Promise<UserInterface> => {
  const res = await client.post(API_URL, props)
  const result: UserInterface = res.data.result[0]

  result.issued_at = new Date(result.issued_at!)
  result.created = new Date(result.created!)

  return {...res.data.result}
}

export const updateUser = async (props: UserInterface): Promise<boolean> => {
  await client.patch(API_URL, props)
  return true
}

export const deleteUser = async (props: {idx: number}): Promise<boolean> => {
  await client.delete(API_URL, {params: {idx: props.idx}})
  return true
}


// User Division
export const getUserDivision = async (): Promise<Array<DivisionInterface>> => {
  const res = await client.get(`${API_URL}/division`)
  return [...res.data.result]
}

export const addUserDivision = async (props: {idx: number}): Promise<boolean> => {
  await client.post(`${API_URL}/division`, {}, {params: {idx: props.idx}})
  return true
}

export const deleteUserDivision = async (props: {idx: number}): Promise<boolean> => {
  await client.delete(`${API_URL}/division`, {params: {idx: props.idx}})
  return true
}


// User Course
export const getUserCourse = async (): Promise<Array<CourseInterface>> => {
  const res = await client.get(`${API_URL}/course`)
  const result: Array<CourseInterface> = res.data.result

  result.map(item => {
    if(item.started_date === undefined || item.started_date === null){
      item.started_date = undefined
    } else {
      item.started_date = (new Date(item.started_date!))
    }
  })

  res.data.result.map((item: CourseInterface) => {
    item.started_date = (new Date(item.started_date!))
  })
  
  return [...res.data.result]
}

export const addUserCourse = async (props: {idx: number}): Promise<boolean> => {
  await client.post(`${API_URL}/course`, {}, {params: {idx: props.idx}})
  return true
}

export const deleteUserCourse = async (props: {idx: number}): Promise<boolean> => {
  await client.delete(`${API_URL}/course`, {params: {idx: props.idx}})
  return true
}
