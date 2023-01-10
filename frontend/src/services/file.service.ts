import { FileInterface } from "../schemas/interfaces";
import client from "./client";

const API_URL: string = "/api/file"


// File
const fetchFile = async (props: {url: string, formData: FormData, idx?: number }): Promise<FileInterface> => {
  
  const res = await client({
    method: "put",
    data: props.formData,
    url: `${API_URL}/${props.url}?idx=${props.idx}`,
    headers: {
        "Content-Type": "multipart/form-data",
    },
  })

  return {...res.data.result}
}

export const fetchImageFile = async (props: {formData: FormData}) => await fetchFile({url: "img", formData: props.formData})
export const fetchClassFile = async (props: {idx: number, formData: FormData}) => await fetchFile({url: "classes", formData: props.formData, idx: props.idx})
export const fetchSubjectFile = async (props: {idx: number, formData: FormData}) => await fetchFile({url: "subjects", formData: props.formData, idx: props.idx})
export const fetchSubmitFile = async (props: {idx: number, formData: FormData}) => await fetchFile({url: "submit", formData: props.formData, idx: props.idx})


export const downloadFile = async(props: {file: FileInterface}) => {
  
  const res = await client({
    method: "get",
    url: `${API_URL}/${props.file.uuid}`,
    responseType: 'blob',
  })

  
  const a = document.createElement('a');
  a.target = '_blank';
  a.style.display = 'none';

  const blob = new Blob([res.data], {type: "application/octect-stream"}) // props.file.type
  a.href = window.URL.createObjectURL(blob)
  a.download = props.file.name
  document.body.appendChild(a);
  a.click();

  URL.revokeObjectURL(a.href);
  document.body.removeChild(a);

  return true
}

export const deleteFile = async(props: {idx: number}) => {
  await client.delete(API_URL, {params: {idx: props.idx}})
  return true
}
