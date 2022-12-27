import { CourseDetailInterface, CourseInterface } from "../../schemas/interfaces";
import { dummyThumnail1, dummyThumnail2, dummyThumnail3, dummyVimeoUrl } from "./dummy";

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
    img: dummyThumnail1,
    name: "C언어 기초",
    is_enroll_granted: true,
    is_due_date_implicit: true,
    is_active: true,
  },
  {
    idx: 1,
    img: dummyThumnail2,
    name: "파이썬 기초",
    is_enroll_granted: false,
    is_due_date_implicit: true,
    is_active: true
  },
  {
    idx: 2,
    img: dummyThumnail3,
    name: "인공지능 개념잡기",
    is_enroll_granted: true,
    is_due_date_implicit: false,
    is_active: true
  },
  {
    idx: 3,
    img: dummyThumnail3,
    name: "[폐강] 인공지능 개념잡기",
    is_enroll_granted: true,
    is_due_date_implicit: false,
    is_active: false
  },
  {
    idx: 4,
    img: dummyThumnail2,
    name: "파이썬 심화",
    is_enroll_granted: false,
    is_due_date_implicit: true,
    is_active: true
  },
  {
    idx: 5,
    img: dummyThumnail3,
    name: "Computer Vision",
    is_enroll_granted: true,
    is_due_date_implicit: false,
    is_active: true
  },
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

/**
 * 가장 최근 강의 3개를 FE에서 useEffect로 정리해서 보여줌
 */
export const fakeCourseRecommendList: Array<CourseInterface> = [
  {
    idx: 0,
    img: dummyThumnail1,
    name: "C언어 기초",
    is_enroll_granted: true,
    is_due_date_implicit: true,
    is_active: true,
  },
  {
    idx: 1,
    img: dummyThumnail2,
    name: "파이썬 기초",
    is_enroll_granted: false,
    is_due_date_implicit: true,
    is_active: true
  },
  {
    idx: 2,
    img: dummyThumnail3,
    name: "인공지능 개념잡기",
    is_enroll_granted: true,
    is_due_date_implicit: false,
    is_active: true
  }
]



export const fakeDetailCourse: CourseDetailInterface = {
  idx: 0,
  img: dummyThumnail1,
  name: "C언어 기초",
  is_enroll_granted: true,
  is_due_date_implicit: false,
  is_active: true,
  classes: [
    {
      idx: 0,
      course_idx: 0,
      vimeo_url: dummyVimeoUrl,
      name: "1강. 리엑트 시작해보기",
      content: "# 리엑트 설치해보기\n이번 시간에는 리엑트를 설치해보도록 하겠습니다.\n리엑트를 설치하기에 앞서 `npm`이라는 것을 알아볼게요.",
      watch_time: new Date(0),
      due_date: new Date(0),
    },
    {
      idx: 1,
      course_idx: 0,
      vimeo_url: dummyVimeoUrl,
      name: "2강. create react app",
      content: "# 리엑트  프로젝트 만들기\n이번 시간에는 리엑트를 설치해보도록 하겠습니다.\n리엑트를 설치하기에 앞서 `npm`이라는 것으 알아볼게요.",
      watch_time: new Date(0),
      due_date: new Date(0),
    },
    {
      idx: 2,
      course_idx: 0,
      vimeo_url: dummyVimeoUrl,
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
      idx: 1,
      course_idx: 0,
      vimeo_url: dummyVimeoUrl,
      name: "2강_ 과제. 프로젝트 만들고 캡쳐해서 올려보기",
      content: "직접 코드 실행 후, 사진을 업로드해봅니다.",
      due_date: new Date("2022-12-31 00:00:00"),
    }
  ]
}



