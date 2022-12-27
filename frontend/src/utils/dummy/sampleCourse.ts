import { CourseDetailInterface, CourseInterface } from "../../schemas/interfaces";

export const fakeCourse: CourseInterface = {
  idx: 0,
  img: "/images/thumnail1.png",
  name: "C언어 기초",
  is_enroll_granted: true,
  is_due_date_implicit: false,
  is_active: true
}

export const fakeCourseList: Array<CourseInterface> = [
  {
    idx: 0,
    img: "/images/thumnail1.png",
    name: "C언어 기초",
    is_enroll_granted: true,
    is_due_date_implicit: true,
    is_active: true,
  },
  {
    idx: 1,
    img: "/images/thumnail2.png",
    name: "파이썬 기초",
    is_enroll_granted: false,
    is_due_date_implicit: true,
    is_active: true
  },
  {
    idx: 2,
    img: "/images/thumnail3.png",
    name: "인공지능 개념잡기",
    is_enroll_granted: true,
    is_due_date_implicit: false,
    is_active: true
  },
  {
    idx: 3,
    img: "/images/thumnail3.png",
    name: "[폐강] 인공지능 개념잡기",
    is_enroll_granted: true,
    is_due_date_implicit: false,
    is_active: false
  }
]

// let recommandedData = [
//   {
//     "img": "/images/thumnail1.png",
//     "title": "C언어 기초",
//     "author": "홍길동",
//     "context": "프로그래밍의 기초, C언어를 배우고 컴퓨터를 구체적으로 이해해봅니다."
//   },
//   {
//     "img": "/images/thumnail2.png",
//     "title": "파이썬 기초",
//     "author": "홍길동",
//     "context": "프로그래밍의 기초, C언어를 배우고 컴퓨터를 구체적으로 이해해봅니다."
//   },
//   {
//     "img": "/images/thumnail3.png",
//     "title": "인공지능 개념잡기",
//     "author": "홍길동",
//     "context": "프로그래밍의 기초, C언어를 배우고 컴퓨터를 구체적으로 이해해봅니다."
//   }
// ]


export const fakeDetailCourse: CourseDetailInterface = {
  idx: 0,
  img: "/images/thumnail1.png",
  name: "C언어 기초",
  is_enroll_granted: true,
  is_due_date_implicit: false,
  is_active: true,
  classes: [
    {
      idx: 0,
      course_idx: 0,
      vimeo_url: "url",
      name: "1강. 리엑트 시작해보기",
      content: "# 리엑트 설치해보기\n이번 시간에는 리엑트를 설치해보도록 하겠습니다.\n리엑트를 설치하기에 앞서 `npm`이라는 것을 알아볼게요.",
      watch_time: new Date(0),
      due_date: new Date(0),
    },
    {
      idx: 0,
      course_idx: 0,
      vimeo_url: "url",
      name: "2강. create react app",
      content: "# 리엑트  프로젝트 만들기\n이번 시간에는 리엑트를 설치해보도록 하겠습니다.\n리엑트를 설치하기에 앞서 `npm`이라는 것으 알아볼게요.",
      watch_time: new Date(0),
      due_date: new Date(0),
    },
    {
      idx: 0,
      course_idx: 0,
      vimeo_url: "url",
      name: "3강. JSX 알아보기",
      content: "# JSX란?\n이번 시간에는 리엑트를 설치해보도록 하겠습니다.\n리엑트를 설치하기에 앞서 `npm`이라는 것으 알아볼게요.",
      watch_time: new Date(0),
      due_date: new Date(0),
    },
  ],
  subjects: [
    {
      idx: 0,
      course_idx: 0,
      vimeo_url: "",
      name: "1강_ 과제. 직접 설치한 후, 사진 업로드하기",
      content: "직접 설치한 후, 사진을 업로드해봅니다.",
      due_date: new Date("2022-11-30 00:00:00"),
    },
    {
      idx: 0,
      course_idx: 0,
      vimeo_url: "",
      name: "2강_ 과제. 프로젝트 만들고 캡쳐해서 올려보기",
      content: "직접 코드 실행 후, 사진을 업로드해봅니다.",
      due_date: new Date("2022-12-31 00:00:00"),
    }
  ]
}



