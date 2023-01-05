import { ClassInterface } from "../../schemas/interfaces";
import { dummyVimeoUrl } from "./dummy";

export const fakeClass: ClassInterface = {
  idx: 0,
  course_idx: 0,
  vimeo_url: dummyVimeoUrl,
  name: "1강. 리엑트 시작해보기",
  content: "# 리엑트 설치해보기\n이번 시간에는 리엑트를 설치해보도록 하겠습니다.\n리엑트를 설치하기에 앞서 `npm`이라는 것으 알아볼게요.",
  watch_time: new Date(0),
  due_date: new Date(0),
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
