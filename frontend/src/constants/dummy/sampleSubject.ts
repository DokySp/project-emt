import { SubjectInterface } from "../../schemas/interfaces";
import { dummyThumnail1, dummyThumnail2 } from "./dummy";


export const fakeSubject1: SubjectInterface = {
  idx: 0,
  course_idx: 0,
  vimeo_url: dummyThumnail1,
  name: "1강_ 과제. 직접 설치한 후, 사진 업로드하기",
  content: "직접 설치한 후, 사진을 업로드해봅니다.",
  due_date: new Date("2022-11-30 00:00:00"),
  files: [
    {
      idx: 0,
      uuid: "uuid",
      fid: "fid",
      name: "파일 이름 1",
      size: 0,
      type: "image/png",
    },
    {
      idx: 0,
      uuid: "uuid",
      fid: "fid",
      name: "파일 이름 2",
      size: 0,
      type: "image/png",
    }
  ]
}

export const fakeSubject2: SubjectInterface = {
  idx: 1,
  course_idx: 0,
  vimeo_url: dummyThumnail2,
  name: "2강_ 과제. 프로젝트 만들고 캡쳐해서 올려보기",
  content: "직접 코드 실행 후, 사진을 업로드해봅니다.",
  due_date: new Date("2022-12-31 00:00:00"),
  files: [
    {
      idx: 0,
      uuid: "uuid",
      fid: "fid",
      name: "파일 이름 1",
      size: 0,
      type: "image/png",
    },
    {
      idx: 0,
      uuid: "uuid",
      fid: "fid",
      name: "파일 이름 2",
      size: 0,
      type: "image/png",
    }
  ]
}
