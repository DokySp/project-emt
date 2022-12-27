import { UserInterface } from "../../schemas/interfaces";



export const fakeUser1: UserInterface = {
  idx: 0,
  email: "uhug@naver.com",
  last_name: "도균",
  first_name: "김",
  nickname: "DokySp",
  img: "img",
  issued_at: new Date("2022-10-05 12:23:00"),
  created: new Date("2022-10-01 12:23:00"),
  level: 0,
  is_active: true
}

export const fakeUser2: UserInterface = {
  idx: 0,
  email: "goggiro@korea.go.kr",
  last_name: "재식",
  first_name: "유",
  nickname: "goggiro",
  img: "img",
  issued_at: new Date("2022-11-05 12:23:00"),
  created: new Date("2022-11-01 12:23:00"),
  level: 1,
  is_active: true
}

export const fakeUser3: UserInterface = {
  idx: 0,
  email: "gil.hong@naver.com",
  last_name: "길동",
  first_name: "홍",
  nickname: "GilH.",
  img: "img",
  issued_at: new Date("2022-09-05 12:23:00"),
  created: new Date("2022-09-01 12:23:00"),
  level: 2,
  is_active: true
}