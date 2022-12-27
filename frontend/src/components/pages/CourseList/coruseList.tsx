import { PropsWithChildren } from "react"
import { fakeCourseList } from "../../../utils/dummy/sampleCourse"
import { Link } from "react-router-dom"


interface CourseListProps { }

const CourseListPage = ({ children }: PropsWithChildren<CourseListProps>) => {

  return (
    <div className='container mb-5 mt-3'>

      <h3 className="mb-3 mt-5">추천 강좌</h3>

      <div className='row'>

        {fakeCourseList.map((value, idx) => {
          return (

            <div className='col-md-4 p-4'>
              <Link to={"/course"}>
                <img src={value.img} alt={value.name} width="100%" className="rounded" />
                <h4 className="mt-3">{value.name}</h4>
              </Link>
            </div>

          )
        })}
      </div>

    </div>
  )
}

export default CourseListPage