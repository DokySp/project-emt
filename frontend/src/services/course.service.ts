import { ClassInterface, CourseCreateInterface, CourseDetailInterface, CourseInterface, CourseUpdateInterface, UserInterface } from "../schemas/interfaces";
import client from "./client";

const API_URL: string = "/api/course"

// Course
export const getCourse = async (props?: {idx: number}): Promise<Array<CourseInterface>> => {
  const res = await client.get(API_URL, (props !== undefined ) ? {params: {idx: props.idx}} : undefined)
  return [...res.data.result]
}

export const getCourseDetail = async (props: {idx: number}): Promise<CourseDetailInterface> => {
  const res = await client.get(`${API_URL}/detail`, {params: {idx: props.idx}})
  const result: CourseDetailInterface = res.data.result

  result.classes.map((item: ClassInterface) => {
    item.due_date = (new Date(item.due_date!))
    item.watch_time = (new Date(item.watch_time!))
  })
  result.subjects.map((item: ClassInterface) => {
    item.due_date = (new Date(item.due_date!))
  })
  
  return {...result}
}

export const getCourseRecommend = async (): Promise<Array<CourseInterface>> => {
  const res = await client.get(`${API_URL}/recommend`)
  return [...res.data.result]
}

export const getCourseUser = async (props: {idx: number}): Promise<Array<UserInterface>> => {
  const res = await client.get(`${API_URL}/user`, {params: {idx: props.idx}})
  return [...res.data.result]
}


export const createCourse = async (props: CourseCreateInterface): Promise<CourseInterface> => {
  const res = await client.post(API_URL, props)
  return {...res.data.result}
}

export const updateCourse = async (props: CourseUpdateInterface): Promise<boolean> => {
  await client.patch(API_URL, props, {params: {idx: props.idx}})
  return true
}

export const deleteCourse = async (props: {idx: number}): Promise<boolean> => {
  await client.delete(API_URL, {params: {idx: props.idx}})
  return true
}

export const deactivateCourse = async (props: {idx: number}): Promise<boolean> => {
  const data: CourseUpdateInterface = {
    idx: props.idx,
    is_enroll_granted: false,
    is_active: false,
  } 
  console.log(data)
  await client.patch(API_URL, data, {params: {idx: data.idx}})
  return true
}
