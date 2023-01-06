import { JsonObjectExpression } from "typescript"

/**
 * ## Token
 */
export interface TokenInterface {
  idx: number,
  iat: Date,
  exp: Date,
}

/**
 * ## 사용자
 */
export interface UserInterface {
  idx?: number,
  issued_at?: Date,
  created?: Date,

  pw?: string,

  email?: string,
  level?: number,
  is_active?: boolean,

  last_name?: string,
  first_name?: string,
  nickname?: string,
  img?: string,
}

/**
 * ## 그룹
 */
export interface DivisionInterface {
  idx: number,
  name: string,
}

//
//
//

/**
 * ## 코스
 */
export interface CourseInterface {
  idx: number,
  img: string,
  name: string,
  is_active: boolean,
  is_enroll_granted: boolean,
  is_due_date_implicit: boolean,

  // 일단은 class, subject 이름을 기준으로 정렬
  // order: Array<CourseOrderInterface>,
}

// export interface CourseOrderInterface {
//   sid: number,
//   name: string,
//   order: Array<string>,
// }

/**
 * ## 코스 세부정보
 */
export interface CourseDetailInterface extends CourseInterface {
  classes: Array<ClassInterface>,
  subjects: Array<SubjectInterface>,
}

//
//
//

/**
 * ## 수업
 */
export interface ClassInterface {
  idx: number,
  course_idx: number,
  vimeo_url: string,
  name: string,
  content: string,
  watch_time: Date,
  due_date:  Date,
  files?: Array<FileInterface>,
}

/**
 * ## 과제
 */
export interface SubjectInterface {
  idx: number,
  course_idx: number,
  vimeo_url: string,
  name: string,
  content: string,
  due_date: Date,
  files?: Array<FileInterface>,
}

/**
 * ## 과제 제출
 */
export interface SubmitInterface {
  idx: number,
  subjects_idx: number,
  user_idx: number,
  status: number,
  score: number,
  report: string,
  comments: string,
  return_time: Date,
  submitted_time: Date,
  files: Array<FileInterface>,
}

//
//
//

/**
 * ## 파일
 */
export interface FileInterface {
  idx: number,
  uuid: string,
  fid: string,
  name: string,
  size: number,
  // is_public: boolean
}
