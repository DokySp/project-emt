import { ChatDataInterface, SubmitCreateInterface, SubmitInterface, SubmitUpdateInterface } from "../schemas/interfaces";
import client from "./client";

const API_URL: string = "/api/submit"



// Submit
export const getSubmit = async (props: {idx: number}): Promise<SubmitInterface> => {
  const res = await client.get(API_URL, {params: {idx: props.idx}})
  const result: SubmitInterface = res.data.result[0]

  // 날짜
  result.submitted_time = new Date(result.submitted_time!)
  result.return_time = new Date(result.return_time!)

  // 채팅 데이터
  if(result.comments !== null && result.comments !== undefined){
    result.comments = JSON.parse(result.comments!.toString())
  } else {
    result.comments = []
  }

  return {...result}
}

//

export const getSubmitBySubject = async (props: {idx: number}) => {
  const res = await client.get(`${API_URL}/bys`, {params: {idx: props.idx}})
  const result: SubmitInterface = res.data.result[0]

  // 날짜
  result.submitted_time = new Date(result.submitted_time!)
  result.return_time = new Date(result.return_time!)

  // 채팅 데이터
  if(result.comments !== null && result.comments !== undefined){
    result.comments = JSON.parse(result.comments!.toString())
  } else {
    result.comments = []
  }

  return {...result}
}

export const getSubmitBySubjectAll = async (props: {idx: number}) => {
  const res = await client.get(`${API_URL}/bys/all`, {params: {idx: props.idx}})
  const result: Array<SubmitInterface> = res.data.result

  result.map(item => {
    // 날짜
    item.submitted_time = new Date(item.submitted_time!)
    item.return_time = new Date(item.return_time!)

    // 채팅 데이터
    if(item.comments !== null && item.comments !== undefined){
      item.comments = JSON.parse(item.comments!.toString())
    } else {
      item.comments = []
    }
  })

  return [...result]
}

//
//
//

export const createSubmit = async (props: SubmitCreateInterface): Promise<SubmitInterface> => {
  
  const data: any = {...props}
  data.comments = JSON.stringify(props.comments)

  const res = await client.post(API_URL, data)
  const result: SubmitInterface = res.data.result

  // 날짜
  result.submitted_time = new Date(result.submitted_time!)
  result.return_time = new Date(result.return_time!)

  // 채팅 데이터
  if(result.comments !== null && result.comments !== undefined){
    result.comments = JSON.parse(result.comments!.toString())
  } else {
    result.comments = []
  }

  return {...result}
}

export const updateSubmit = async (props: SubmitUpdateInterface): Promise<boolean> => {

  const data: any = {...props}
  data.comments = JSON.stringify(props.comments)

  await client.patch(API_URL, data, {params: {idx: props.idx}})
  return true
}

export const deleteSubmit = async (props: {idx: number}): Promise<boolean> => {
  await client.delete(API_URL, {params: {idx: props.idx}})
  return true
}
