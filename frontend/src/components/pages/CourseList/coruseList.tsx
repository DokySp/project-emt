import { PropsWithChildren } from "react"


interface CourseListProps { }

const CourseListPage = ({ children }: PropsWithChildren<CourseListProps>) => {

  return (
    <div>
      My Course Page
    </div>
  )
}

export default CourseListPage