import { JsonObjectExpression } from "typescript"


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
  idx?: number,
  is_active?: boolean,

  sub_name?: string,
  description?: string,
  created_by?: number,
  created_by_name?: string,

  img?: string,
  name?: string,
  is_enroll_granted?: boolean,
  is_due_date_implicit?: boolean,

  started_date? : Date,
}

export interface CourseCreateInterface extends CourseInterface{

  sub_name: string,
  description: string,
  created_by: number,

  img: string,
  name: string,
  is_enroll_granted: boolean,
  is_due_date_implicit: boolean,

}

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
  idx?: number,
  course_idx?: number,

  section_idx?: number,
  order_idx?: number,

  vimeo_url?: string,
  name?: string,
  content?: string,
  watch_time?: Date,
  due_date?:  Date,

  files?: Array<FileInterface>,
}

export interface ClassCreateInterface extends ClassInterface {
  course_idx: number,
  section_idx: number,
  order_idx: number,
  due_date:  Date,
}

export interface ClassUpdateInterface extends ClassInterface {
  idx: number,
}

/**
 * ## 과제
 */
export interface SubjectInterface {
  idx?: number,
  course_idx?: number,

  section_idx?: number,
  order_idx?: number,

  vimeo_url?: string,
  name?: string,
  content?: string,
  due_date?: Date,
  files?: Array<FileInterface>,
}

export interface SubjectCreateInterface extends SubjectInterface{
  course_idx: number,
  section_idx: number,
  order_idx: number,
  due_date: Date,
}

export interface SubjectUpdateInterface extends SubjectInterface{
  idx: number,
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
