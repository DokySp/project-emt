import { ClassCreateInterface, ClassInterface, ClassUpdateInterface } from "../schemas/interfaces";
import client from "./client";

const API_URL: string = "/api/classes"


// Class
export const getClass = async (props: {idx: number}): Promise<ClassInterface> => {
  const res = await client.get(API_URL, (props !== undefined ) ? {params: {idx: props.idx}} : undefined)
  const result: ClassInterface = res.data.result[0]

  result.watch_time = new Date(result.watch_time!)
  result.due_date = new Date(result.due_date!)

  return {...res.data.result[0]}
}

export const createClass = async (props: ClassCreateInterface): Promise<ClassInterface> => {
  const res = await client.post(API_URL, props)
  const result: ClassInterface = res.data.result

  result.watch_time = new Date(result.watch_time!)
  result.due_date = new Date(result.due_date!)

  return {...result}
}

export const updateClass = async (props: ClassUpdateInterface): Promise<boolean> => {
  await client.patch(API_URL, props, {params: {idx: props.idx}})
  return true
}

export const deleteClass = async (props: {idx: number}): Promise<boolean> => {
  await client.delete(API_URL, {params: {idx: props.idx}})
  return true
}
