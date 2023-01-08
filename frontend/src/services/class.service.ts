import { ClassInterface, CourseCreateInterface } from "../schemas/interfaces";
import client from "./client";

const API_URL: string = "/api/classes"

// TODO: 테스트 필요

// Class
export const getClass = async (props?: {idx: number}): Promise<Array<ClassInterface>> => {
  const res = await client.get(API_URL, (props !== undefined ) ? {params: {idx: props.idx}} : undefined)
  return [...res.data.result]
}

export const createClass = async (props: CourseCreateInterface): Promise<ClassInterface> => {
  const res = await client.post(API_URL, props)
  return {...res.data.result}
}

export const updateClass = async (props: ClassInterface): Promise<boolean> => {
  await client.patch(API_URL, props, {params: {idx: props.idx}})
  return true
}

export const deleteClass = async (props: {idx: number}): Promise<boolean> => {
  await client.delete(API_URL, {params: {idx: props.idx}})
  return true
}
