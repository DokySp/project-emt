import { SubjectInterface } from "../../schemas/interfaces";


export const fakeSubject: SubjectInterface = {
  idx: 0,
  course_idx: 0,
  vimeo_url: "url",
  name: "1강_ 과제. 직접 설치한 후, 사진 업로드하기",
  content: "직접 설치한 후, 사진을 업로드해봅니다.",
  due_date: new Date("2022-11-30 00:00:00"),
  files: [
    {
      idx: 0,
      uuid: "uuid",
      fid: "fid",
      name: "파일 이름 1",
      size: 0
    },
    {
      idx: 0,
      uuid: "uuid",
      fid: "fid",
      name: "파일 이름 2",
      size: 0
    }
  ]
}