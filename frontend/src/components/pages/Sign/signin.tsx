import { PropsWithChildren } from "react"
import Footer from "../../common/Footer/footer"
import Header from "../../common/Header/header"
import { dummyLogo1 } from "../../../utils/dummy/dummy"
import { useNavigate } from "react-router-dom"



const cssBdPlaceHolderImg = {
  fontSize: "1.125rem",
  textAnchor: "middle",
  userSelect: "none"
}


interface SigninProps { }

const SigninPage = ({ }: SigninProps) => {

  const navigate = useNavigate()

  return (
    <>
      <div className="text-center">

        <div className="p-5" />

        <div className="form-signin" style={{ width: "300px", margin: "0 auto" }}>
          <form>
            <img className="m-5" src={dummyLogo1} alt="logo" height="100" />

            <div className="form-floating mt-5">
              <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mt-2">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary mt-5" type="submit">로그인</button>

            <button onClick={() => navigate("/signup/term")} className="btn mt-3" type="submit">회원가입</button>

          </form>
        </div>

        <div className="p-5" />
        <div className="p-5" />

      </div>
    </>
  )
}


export default SigninPage