import ReactMarkdown from "react-markdown"

import Footer from "../../common/Footer/footer"
import Header from "../../common/Header/header"


const LectureView = () => {


  return (
    <>
      <div className="container">
        <div className="row p-4">
          <VimeoViewer />

          <h2 className="mt-5">강의제목</h2>

          <div className="mt">
            <ReactMarkdown children={sampleText}></ReactMarkdown>
          </div>


        </div>
      </div>
    </>
  )
}



const VimeoViewer = () => (
  <>
    <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
      <iframe
        src="https://player.vimeo.com/video/674052803?h=22c57b9398&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        title="Untitled video 4k HDR" />

    </div>
    <script src="https://player.vimeo.com/api/player.js" />
  </>
)


const sampleText: string = `(현재 무료, 빨간 버튼 눌러서 수강신청시 1년 소장가능!)

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




export default LectureView