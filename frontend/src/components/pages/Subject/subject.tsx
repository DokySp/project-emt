import ReactMarkdown from "react-markdown"

import Footer from "../../common/Footer/footer";
import Header from "../../common/Header/header";
import { PropsWithChildren } from "react";
import sampleMdText from "../../../utils/dummy/sampleMdText";


interface SubjectProps { }

const SubjectPage = ({ children }: PropsWithChildren<SubjectProps>) => {
  return (
    <>

      <div className="container">
        <div className="row p-4">

          <h2 className="mt-5">과제 제목</h2>

          <div className="mt">
            <ReactMarkdown children={sampleMdText}></ReactMarkdown>
          </div>

          <h3 className="mt-5">과제 제출하기</h3>
          <form action="">
            <input type="text" name="" id="" />
          </form>

        </div>
      </div>

    </>
  )
}

export default SubjectPage