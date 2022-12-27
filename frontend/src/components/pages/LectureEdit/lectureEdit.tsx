import { PropsWithChildren } from "react"
import { useNavigate } from "react-router-dom"


interface LectureEditProps { }

const LectureEditPage = ({ children }: PropsWithChildren<LectureEditProps>) => {

  let isCreateNotEdit: boolean = true

  const navigate = useNavigate()

  return (
    <>
      <div className="container">
        <div className="row p-4">

          <h2 className="mt-5">강의 {isCreateNotEdit ? "생성하기" : "수정하기"}</h2>

          <div style={{ height: "50px" }} />

          <div className="mb-3">
            <label form="exampleInputEmail1" className="form-label">강의 제목</label>
            <input className="form-control" id="exampleFormControlTextarea1" />
          </div>

          <div className="mb-3">
            <label form="exampleInputEmail1" className="form-label">Vimeo 링크 (없다면 공란)</label>
            <input className="form-control" id="exampleFormControlTextarea1" />
            <div id="emailHelp" className="form-text">Zoom, Webex, Google Meet는 향후 지원 예정</div>
          </div>

          <div className="mb-3">
            <label form="exampleInputEmail1" className="form-label">강의 설명 (마크다운으로 작성)</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows={0} style={{ height: "300px" }} />
          </div>

          <div className="mb-3">
            <label form="exampleInputEmail1" className="form-label">파일 첨부 (여러 개 첨부 가능)</label>
            <input className="form-control" type="file" id="formFileMultiple" multiple />
          </div>

          <button type="button" className="btn btn-primary" style={{ margin: "50px 0 0" }} >
            {isCreateNotEdit ? "생성하기" : "수정하기"}
          </button>
          <button onClick={() => navigate(-1)} type="button" className="btn btn-secondary" style={{ margin: "10px 0 0" }}>
            뒤로가기
          </button>

        </div>
      </div>
    </>
  )
}

export default LectureEditPage