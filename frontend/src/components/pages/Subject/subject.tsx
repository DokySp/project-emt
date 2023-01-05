import ReactMarkdown from "react-markdown"

import { PropsWithChildren } from "react";
import { dummyVimeoUrl, fakeMarkdownText } from "../../../constants/dummy/dummy";
import { useNavigate } from "react-router-dom";
import { SubjectInterface } from "../../../schemas/interfaces";
import VimeoViewer from "../../common/VimeoViewer/vimeoViewer";



interface SubjectProps { } // extends SubjectInterface

const SubjectPage = (props: PropsWithChildren<SubjectProps>) => {

  const navigate = useNavigate()

  let isVimeoUrlExist: boolean = false

  return (
    <>

      <div className="container">
        <div className="row p-4">

          {isVimeoUrlExist && <VimeoViewer url={dummyVimeoUrl} />}
          {!isVimeoUrlExist && <div style={{ height: "75px" }} />}

          <h2 className="mt-4">과제 제목</h2>
          <h5 style={{ color: "orange" }}>제출기한: null</h5>

          <div className="mt" style={{ padding: "50px 10px 100px" }}>
            <ReactMarkdown children={fakeMarkdownText}></ReactMarkdown>
          </div>


          <hr />


          <h3 className="mt-5">과제 제출하기</h3>


          <div className="mb-3">
            <label form="exampleInputEmail1" className="form-label">내용 작성하기</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows={0} style={{ height: "300px" }} />
            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
          </div>
          <div className="mb-3">
            <label form="exampleInputEmail1" className="form-label">파일 첨부 (여러 개 첨부 가능)</label>
            <input className="form-control" type="file" id="formFileMultiple" multiple />
          </div>

          <button type="button" className="btn btn-primary" style={{ margin: "50px 0 0" }} >
            제출하기
          </button>
          <button onClick={() => navigate(-1)} type="button" className="btn btn-secondary" style={{ margin: "10px 0 0" }}>
            뒤로가기
          </button>

        </div>
      </div>

    </>
  )
}

export default SubjectPage