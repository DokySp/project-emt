import { SubjectCreateInterface, SubjectInterface, SubjectUpdateInterface } from "../schemas/interfaces";
import client from "./client";

const API_URL: string = "/api/subjects"


// Subject
export const getSubject = async (props: {idx: number}): Promise<SubjectInterface> => {
  const res = await client.get(API_URL, (props !== undefined ) ? {params: {idx: props.idx}} : undefined)
  const result: SubjectInterface = res.data.result[0]
  result.due_date = new Date(result.due_date!)
  return {...result}
}

export const createSubject = async (props: SubjectCreateInterface): Promise<SubjectInterface> => {
  const res = await client.post(API_URL, props)
  const result: SubjectInterface = res.data.result
  result.due_date = new Date(result.due_date!)
  return {...result}
}

export const updateSubject = async (props: SubjectUpdateInterface): Promise<boolean> => {
  await client.patch(API_URL, props, {params: {idx: props.idx}})
  return true
}

export const deleteSubject = async (props: {idx: number}): Promise<boolean> => {
  await client.delete(API_URL, {params: {idx: props.idx}})
  return true
}
