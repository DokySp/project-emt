import { PropsWithChildren } from "react"


interface MyCourseProps { }

const MyCoursePage = ({ children }: PropsWithChildren<MyCourseProps>) => {

  return (
    <div>
      My Course Page
    </div>
  )
}

export default MyCoursePage