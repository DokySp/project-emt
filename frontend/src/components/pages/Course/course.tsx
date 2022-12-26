import { Link } from "react-router-dom";
import Footer from "../../common/Footer/footer";
import Header from "../../common/Header/header";
import { PropsWithChildren } from "react";

interface CourseProps { }

const CoursePage = ({ children }: PropsWithChildren<CourseProps>) => {
  return <>
    <div className="container">

      <div className="row p-4">
        <div className="col-sm-4" >
          <img className="img-fluid rounded" src="http://localhost:3000/images/thumnail3.png" width="100%" />
        </div>

        <div className="col-sm-8 pt-1 align-self-center" >
          <strong className="d-inline-block mt-2 text-primary">World</strong>
          <h3 className="mb-0">인공지능 개념잡기</h3>
          <div className="mb-1 text-muted">유재식, 김도균</div>
          <p className="card-text mb-auto">프로그래밍의 기초, C언어를 배우고 컴퓨터를 구체적으로 이해해봅니다.</p>
          <button type="button" className="btn btn-primary mt-3">수강하기</button>
        </div>
      </div>


      <div className="row p-4">
        <ol className="list-group list-group-numbered">

          <br /><br /><h3>Chapter 1. 인공지능 알아보기</h3><br />
          <ListItem title={"1강"} content={"인공지능 알아보기"} />
          <ListItem title={"2강"} content={"인공지능 알아보기"} />
          <ListItem title={"3강"} content={"인공지능 알아보기"} />
          <ListItem title={"4강"} content={"인공지능 알아보기"} />
          <ListItem title={"과제"} content={"인공지능 알아보기"} />

          <br /><br /><h3>Chapter 2. 인공지능 알아보기</h3><br />
          <ListItem title={"5강"} content={"인공지능 알아보기"} />
          <ListItem title={"6강"} content={"인공지능 알아보기"} />
          <ListItem title={"7강"} content={"인공지능 알아보기"} />
          <ListItem title={"과제"} content={"인공지능 알아보기"} />

          <br /><br /><h3>Chapter 3. 인공지능 알아보기</h3><br />
          <ListItem title={"8강"} content={"인공지능 알아보기"} />
          <ListItem title={"9강"} content={"인공지능 알아보기"} />
          <ListItem title={"10강"} content={"인공지능 알아보기"} />
          <ListItem title={"11강"} content={"인공지능 알아보기"} />
          <ListItem title={"과제"} content={"인공지능 알아보기"} />


        </ol>
      </div>

    </div>
  </>;
}


const ListItem = (props: { title: string, content: string }) => {
  return (
    <div className="list-group-item d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto">
        <div className="fw-bold">{props.title}</div>
        {props.content}
      </div>

      <div className="mt-1">
        <Link to={"/lecture"}>
          <button type="button" className="btn btn-secondary">영상</button>
        </Link>
      </div>

    </div>
  )
}


export default CoursePage