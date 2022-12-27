import ReactMarkdown from "react-markdown"

import { dummyVimeoUrl, fakeMarkdownText } from "../../../utils/dummy/dummy"
import { Link, useNavigate } from "react-router-dom"
import VimeoViewer from "../../common/VimeoViewer/vimeoViewer"


const LectureView = () => {

  const navigate = useNavigate()

  let isVimeoUrlExist: boolean = true

  return (
    <>
      <div className="container">
        <div className="row p-4">

          <VimeoViewer url={dummyVimeoUrl} />
          {!isVimeoUrlExist && <div style={{ height: "75px" }} />}

          <h2 className="mt-4">강의제목</h2>
          <h5 style={{ color: "orange" }}>제출기한: null</h5>

          <div className="mt" style={{ padding: "50px 10px 100px" }}>
            <ReactMarkdown children={fakeMarkdownText}></ReactMarkdown>
          </div>

          <button onClick={() => navigate(-1)} type="button" className="btn btn-secondary">
            뒤로가기
          </button>

        </div>
      </div>
    </>
  )
}



export default LectureView