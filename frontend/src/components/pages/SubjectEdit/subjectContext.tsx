import { NavigateFunction } from "react-router-dom"



interface SubjectContextProps {
  isCreateNotEdit: boolean,
  navigate: NavigateFunction,
}


const SubjectContext = (props: SubjectContextProps) => {

  return (
    <>
      <h2 className="mt-5">과제 {props.isCreateNotEdit ? "생성하기" : "수정하기"}</h2>

      <div style={{ height: "50px" }} />

      <div className="mb-3">
        <label form="exampleInputEmail1" className="form-label">과제 제목</label>
        <input className="form-control" id="exampleFormControlTextarea1" />
      </div>

      <div className="mb-3">
        <label form="exampleInputEmail1" className="form-label">Vimeo 링크 (없다면 공란)</label>
        <input className="form-control" id="exampleFormControlTextarea1" />
      </div>

      <div className="mb-3">
        <label form="exampleInputEmail1" className="form-label">과제 설명 (마크다운으로 작성)</label>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows={0} style={{ height: "300px" }} />
      </div>

      <div className="mb-3">
        <label form="exampleInputEmail1" className="form-label">과제 완료 시, 생활기록부 기록 내용 (추후 지원)</label>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows={0} style={{ height: "75px" }} disabled />
      </div>

      <div className="mb-3">
        <label form="exampleInputEmail1" className="form-label">파일 첨부 (여러 개 첨부 가능)</label>
        <input className="form-control" type="file" id="formFileMultiple" multiple />
      </div>

      <button type="button" className="btn btn-primary" style={{ margin: "50px 0 0" }} >
        {props.isCreateNotEdit ? "생성하기" : "수정하기"}
      </button>
      <button onClick={() => props.navigate(-1)} type="button" className="btn btn-secondary" style={{ margin: "10px 0 0" }}>
        뒤로가기
      </button>
    </>
  )
}

export default SubjectContext