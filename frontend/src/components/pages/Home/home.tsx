import Header from "../../common/Header/header";
import { Image } from 'react-bootstrap'
import Footer from "../../common/Footer/footer";
import { Link } from "react-router-dom";
import { PropsWithChildren } from "react";



let recommandedData = [
  {
    "img": "http://localhost:3000/images/thumnail1.png",
    "title": "C언어 기초",
    "author": "홍길동",
    "context": "프로그래밍의 기초, C언어를 배우고 컴퓨터를 구체적으로 이해해봅니다."
  },
  {
    "img": "http://localhost:3000/images/thumnail2.png",
    "title": "파이썬 기초",
    "author": "홍길동",
    "context": "프로그래밍의 기초, C언어를 배우고 컴퓨터를 구체적으로 이해해봅니다."
  },
  {
    "img": "http://localhost:3000/images/thumnail3.png",
    "title": "인공지능 개념잡기",
    "author": "홍길동",
    "context": "프로그래밍의 기초, C언어를 배우고 컴퓨터를 구체적으로 이해해봅니다."
  }
]

interface HomeProps { }

const HomePage = ({ children }: PropsWithChildren<HomeProps>) => {
  return <>

    <div className='container mb-5 mt-3'>

      <img className="Home-img-Banner rounded" alt="Banner" src="/images/banner2.png" />

      <h3 className="mb-3 mt-5">추천 강좌</h3>

      <div className='row'>

        {recommandedData.map((value, idx) => {
          return (

            <div className='col-md-4 p-4'>
              <Link to={"/course"}>
                <img src={value.img} alt={value.title} width="100%" className="rounded" />
                <h4 className="mt-4">{value.title}</h4>
                <div className="mb-1 text-muted">{value.author}</div>
                <p className="card-text mb-auto">{value.context}</p>
              </Link>
            </div>

          )
        })}
      </div>

      <div className="row mt-5 mb-5 ms-1 me-1">
        <button type="button" className="btn btn-secondary">모든 강좌 보기</button>
      </div>

      <hr />

      <h3 className="mb-3 mt-5">수강 후기</h3>



      <div className='container mb-5'>

        <div className="row mb-2">
          <div className="col-md-4">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-primary">⭐️⭐️⭐️⭐️⭐️</strong>
                <h4 className="mb-0">참신한 구성, 플립러닝</h4>
                <div className="mb-1 text-muted">Nov 12</div>
                <p className="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-primary">⭐️⭐️⭐️⭐️⭐️</strong>
                <h4 className="mb-0">실제 강의를 듣는 느낌이에요</h4>
                <div className="mb-1 text-muted">Nov 12</div>
                <p className="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-primary">⭐️⭐️⭐️⭐️⭐️</strong>
                <h4 className="mb-0">실제 강의를 듣는 느낌이에요</h4>
                <div className="mb-1 text-muted">Nov 12</div>
                <p className="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
              </div>
            </div>
          </div>

        </div>
      </div>


      <hr />

      <h3 className="mb-3 mt-5">강의 관련 문의</h3>
      <div className='container mb-5'>

        <div className="row mb-2">
          <div className="col-md-4">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <h4 className="mb-0">info@emt.com</h4>
                <div className="mb-1 text-muted">강의 등록 및 기타 문의사항</div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <h4 className="mb-0">각 강의 별 QnA 페이지</h4>
                <div className="mb-1 text-muted">강의 관련 문의사항</div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>

  </>;
}


export default HomePage