import { CourseInterface, DivisionInterface, UserInterface } from "../schemas/interfaces";
import client from "./client";

const API_URL: string = "/api/user"

// User
export const getUser = async (props: {idx: number}): Promise<UserInterface> => {
  // AxiosResponse<UserServiceInterface>

  const res = await client.get(API_URL, {params: {idx: props.idx}})
  return {...res.data.result[0]}
}

export const createUser = async (props: UserInterface): Promise<UserInterface> => {
  const res = await client.post(API_URL, props)
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

  // is_active boolean 타입 수정
  const resModified = [...res.data.result]
  resModified.map((item) => {
    item.is_active = item.is_active.data[0] === 1
  })
  
  return [...resModified]
}

export const addUserCourse = async (props: {idx: number}): Promise<boolean> => {
  await client.post(`${API_URL}/course`, {}, {params: {idx: props.idx}})
  return true
}

export const deleteUserCourse = async (props: {idx: number}): Promise<boolean> => {
  await client.delete(`${API_URL}/course`, {params: {idx: props.idx}})
  return true
}
