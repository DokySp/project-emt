import { Link } from "react-router-dom";
import { PropsWithChildren } from "react";
import { fakeCourseRecommendList } from "../../../utils/dummy/sampleCourse";
import { dummyBanner1, fakeReviewData } from "../../../utils/dummy/dummy";



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
  return <>

    <div className='container mb-5 mt-3'>

      <img className="Home-img-Banner rounded" alt="Banner" src={dummyBanner1} />

      <h3 className="mb-3 mt-5">추천 강좌</h3>

      <div className='row'>

        {fakeCourseRecommendList.map((value, idx) => {
          return (

            <div className='col-md-4 p-4'>
              <Link to={"/course"}>
                <img src={value.img} alt={value.name} width="100%" className="rounded" />
                <h4 className="mt-3">{value.name}</h4>
                {/* <div className="mb-1 text-muted">{value.author}</div> */}
                {/* <p className="card-text mb-auto">{value.context}</p> */}
              </Link>
            </div>

          )
        })}
      </div>

      <div className="row mt-5 mb-5 ms-1 me-1">
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
                <div className="col-md-4">
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
                <div className="col-md-4">
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