import Footer from "../components/footer"
import Header from "../components/header"

function UserView(): JSX.Element {
  return (
    <>
      <Header />
      <div className="container">




        <div className="row p-4 mt-5 justify-content-center">

          <div className="col-4 pe-3 text-end" >
            <img className="rounded-circle " src="http://localhost:3000/images/thumnail3.png" width="100px" />
          </div>
          <div className="col-4 pt-1 me-5 align-self-center" >
            <strong className="d-inline-block mt-2 text-primary">수강생</strong>
            <h3 className="mb-0">김 도균</h3>
            <div className="mb-1 text-muted">uhug@naver.com</div>
          </div>

        </div>


        <div className="row p-4 justify-content-center">

          <div className="col-sm-4 mt-4">
            <div className="list-group">

              <ListItem />
              <ListItem />
              <ListItem />
              <ListItem />


            </div>
          </div>
          <div className="col-sm-4 mt-4">
            <div className="list-group">
              <ListItem />
              <ListItem />
              <ListItem />
            </div>
          </div>

        </div>

      </div>

      <Footer />
    </>
  )
}


const ListItem = () => (
  <>
    <a href="#" className="list-group-item list-group-item-action p-4">
      <div className="row">
        <img className="col-auto" src="/icons/tmp.png" alt="" />
        <span className="col align-self-end h4 pb-1">계정</span>
      </div>
    </a>
  </>
)

// <a className="list-group-item list-group-item-action disabled">A disabled link item</a>




export default UserView