# Project Emt

### TO-DO

- [ ] 마크다운 관련 기능 추가
  - `react-markdown`
  - https://www.npmjs.com/package/react-markdown
  - https://velog.io/@alskt0419/React-markdown-렌더링-시켜보기
  - https://parkjeongwoong.github.io/articles/Develop/3
  - https://clip-code.tistory.com/entry/React-react-markdown-렌더링-리액트-마크다운-로드하기

// "@types/jest": "^27.4.0",
// "@types/node": "^16.18.11",
// "@types/react": "^17.0.39",
// "@types/react-dom": "^17.0.11",

### UTC 시간 관련
- 사용자의 시스템 시간에 따라 알아서 변경된다
- 즉, 시스템의 설정에 따라 Date() 내에서 알아서 처리하는 것으로 Z값을 변경하기는 어려워 보인다.
- Database에 저장하고 가져올 때 timezone이 깨지지 않는지 검사하면 될듯하다.
  - 되도록이면 강제로 바꾸지 않도록 하기 위함 (ex> KST 9시간을 그냥 빼버리는 등)

#### 문제 해결
- 서버에서 가져온 시간
  - 서버에 저장 시, 자동으로 GMT+0 에 맞춰 저장
  - 가져올 때 한국 표준시 적용된 시간으로 넘어옴 (UTC+9)
  - 이를 그대로 Date에 넣으면 한국 표준시에 -9시간 된 값이 저장됨!
    - 따라서 가져올 때, 타임존을 더해야 함! (한국 timezoneOffset == -9시간)
    - 서버에서 작업해서 넘겨주기
- 해결... sequlize 설정 오류였다.. ㅠㅜ
  - 이런 임시방편 잘못된 매뉴얼을 따르지 말자...
  - https://velog.io/@kaitlin_k/nodejs-%ED%83%80%EC%9E%84%EC%A1%B4-%EC%84%A4%EC%A0%95
