import { Link, useNavigate } from "react-router-dom";
import { PropsWithChildren, useEffect, useState } from "react";
import { fakeCourseRecommendList } from "../../../constants/dummy/sampleCourse";
import { dummyBanner1, fakeReviewData } from "../../../constants/dummy/dummy";
import StorageManager from "../../../utils/storage.manager";
import { createUser, deleteUser, getUser, updateUser } from "../../../services/user.service";
import { Button, Col, Row } from "react-bootstrap";
import Routing from "../../routing.path";
import { CourseInterface } from "../../../schemas/interfaces";
import { getCourseRecommend } from "../../../services/course.service";
import CourseItem from "../../common/CourseItem/course.item";



const additionalData = [
  {
    title: "info@emt.com",
    content: "강의 등록 및 기타 문의사항"
  },
  {
    title: "각 강의 별 QnA 페이지",
    content: "강의 관련 문의사항"
  }
]



interface HomeProps { }

const HomePage = ({ children }: PropsWithChildren<HomeProps>) => {

  const navigate = useNavigate()

  const [recommendList, setRecommendList] = useState<Array<CourseInterface>>([])

  useEffect(() => {

    getCourseRecommend().then((res) => {
      setRecommendList([...res])
    })

    return () => {
      setRecommendList([])
    }
  }, [])



  return <>

    <div className='container mb-5 mt-3'>

      <img className="Home-img-Banner rounded" alt="Banner" src={dummyBanner1} />

      <Button onClick={() => navigate(Routing.ApiTest.path)}>API TEST</Button>

      <h3 className="mb-3 mt-5">추천 강좌</h3>

      <Row>

        {recommendList.map((value, idx) => {
          return (
            <Col className='md-4 p-4' key={idx} style={{ textAlign: "start" }}>
              <CourseItem value={value} />
            </Col>
          )
        })}

        {recommendList.length === 0 && <Col className='m-5 p-5'>로딩중</Col>}

      </Row>

      <div className="row mt-5 mb-5 ms-1 me-1" style={{ textAlign: "center" }}>
        <Link to={"/course/list"}>
          <button type="button" className="btn btn-secondary">모든 강좌 보기</button>
        </Link>
      </div>


      <hr />


      <h3 className="mb-3 mt-5">수강 후기</h3>
      <div className='container mb-5'>

        <div className="row mb-2">
          {
            fakeReviewData.map((item, idx) => {
              return (
                <div className="col-md-4" key={idx}>
                  <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className="col p-4 d-flex flex-column position-static">
                      <strong className="d-inline-block mb-2 text-primary">
                        {
                          (() => {
                            let result = ""
                            for (let i = 0; i < item.starRate; i++) result += "⭐️"
                            return result
                          })()
                        }
                      </strong>
                      <h4 className="mb-0">{item.title}</h4>
                      <div className="mb-1 text-muted">{item.date}</div>
                      <p className="card-text mb-auto">{item.detail}</p>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>


      <hr />


      <h3 className="mb-3 mt-5">강의 관련 문의</h3>
      <div className='container mb-5'>

        <div className="row mb-2">

          {
            additionalData.map((item, idx) => {
              return (
                <div className="col-md-4" key={idx}>
                  <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className="col p-4 d-flex flex-column position-static">
                      <h4 className="mb-0">{item.title}</h4>
                      <div className="mb-1 text-muted">{item.content}</div>
                    </div>
                  </div>
                </div>
              )
            })
          }

        </div>
      </div>
    </div>

  </>;
}


export default HomePage