import { ChatDataInterface, SendFrom } from "../../components/pages/SubjectEdit/Chat/chat"

export const dummyBanner1:string = "/dummy/img/banner1.png"
export const dummyBanner2:string = "/dummy/img/banner2.png"
export const dummyThumnail1:string = "/dummy/img/thumnail1.png"
export const dummyThumnail2:string = "/dummy/img/thumnail2.png"
export const dummyThumnail3:string = "/dummy/img/thumnail3.png"
export const dummyUser1:string = "/dummy/img/user1.png"
export const dummyUser2:string = "/dummy/img/user2.png"
export const dummyUser3:string = "/dummy/img/user3.png"
export const dummyUser4:string = "/dummy/img/user4.png"

export const dummyLogo1:string = "/dummy/img/logo1.png"
export const dummyLogo2:string = "/dummy/img/logo2.png"



export const dummyVimeoUrl: string = "https://player.vimeo.com/video/674052803?h=22c57b9398&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"



export const fakeReviewData = [
  {
    starRate: 5,
    title: "참신한 구성, 플립러닝",
    date: "Nov 12",
    detail: "This is a wider card with supporting text below as a natural lead-in to additional content.",
  },
  {
    starRate: 5,
    title: "실제 강의를 듣는 느낌이에요",
    date: "Nov 12",
    detail: "This is a wider card with supporting text below as a natural lead-in to additional content.",
  },
  {
    starRate: 4,
    title: "실제 강의를 듣는 느낌이에요",
    date: "Nov 12",
    detail: "This is a wider card with supporting text below as a natural lead-in to additional content.",
  }
]



export const fakeMarkdownText: string = `(현재 무료, 빨간 버튼 눌러서 수강신청시 1년 소장가능!)

아직도
- 서점에서 파이썬 책사서
- 50페이지 열심히 따라하다가
- 지루해져서 새탭열고 유튜브도 잠깐보고
- 문법예제 풀기귀찮아서 답부터 보고

그러고 있으면 개발은 언제할겁니까.



문법 졸업하고 빨리 데이터분석이든 크롤러든 머신러닝이든 재밌는거 만들어보라고

누구보다 빠르게 배우는 파이썬 기초 문법강의를 준비했습니다.

빠르게 30분만에 취미 개발자들을 위한 기초 파이썬 문법 내용을 짧게 정리해드립니다.





#### 배울 내용 (총 6강)

- 개발환경 셋팅
- 숫자와 문자
- 변수
- 리스트
- 딕셔너리
- if
- for
- 함수와 파라미터







#### 특징 1 :

이번 강의도 문법만 나열해주는 불친절한 강의가 아닙니다.

배운 문법을 1.언제 사용하고, 코드를 2. 어떻게 짜야할지 알려드립니다.

스스로 코드 잘 짜는 사람이 되고 싶다면 한번 들어보도록 합시다.



#### 특징 2 :

목표 수강생은 코딩이 완전 처음인 분들이며

파이썬 프로그래밍이 이런거구나 라고 소개해드리는게 목표인 짧은 강의입니다.

파이썬 책들에 있는 쓸데없고 지엽적인 내용들은 듣다보면 잠이와서 제거했으므로

실용 프로그래밍에 필요한 기초 핵심내용들만 빠르게 배우실 수 있습니다.




`



export const fakeMarkdownTextSmall: string = `아직도
- 서점에서 파이썬 책사서
- 50페이지 열심히 따라하다가
- 지루해져서 새탭열고 유튜브도 잠깐보고
- 문법예제 풀기귀찮아서 답부터 보고

그러고 있으면 개발은 언제할겁니까.



문법 졸업하고 빨리 데이터분석이든 크롤러든 머신러닝이든 재밌는거 만들어보라고

누구보다 빠르게 배우는 파이썬 기초 문법강의를 준비했습니다.

빠르게 30분만에 취미 개발자들을 위한 기초 파이썬 문법 내용을 짧게 정리해드립니다.
`





export const fakeChatData: Array<ChatDataInterface> = [
  {
    sendFrom: SendFrom.TRAINEE,
    time: new Date("2022-11-11 12:00:12"),
    message: "과제 제출했습니다!!"
  },
  {
    sendFrom: SendFrom.TRAINER,
    time: new Date("2022-11-11 13:00:12"),
    message: "이 부분 다시 확인해보세요~"
  },
  {
    sendFrom: SendFrom.TRAINEE,
    time: new Date("2022-11-11 14:00:12"),
    message: "다시 제출했습니다!!"
  },
]

