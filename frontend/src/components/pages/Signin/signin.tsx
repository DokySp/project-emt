import { PropsWithChildren } from "react"
import Footer from "../../common/Footer/footer"
import Header from "../../common/Header/header"



const cssBdPlaceHolderImg = {
  fontSize: "1.125rem",
  textAnchor: "middle",
  userSelect: "none"
}


interface SigninProps { }

const SigninPage = ({ children }: PropsWithChildren<SigninProps>) => {
  return (
    <>
      <div className="text-center">

        <div className="p-5" />

        <div className="form-signin" style={{ width: "300px", margin: "0 auto" }}>
          <form>
            <img className="m-5" src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />

            <div className="form-floating">
              <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <div className="checkbox mb-5 mt-3">
              {/* <label>
                <input type="checkbox" value="remember-me" /> 로그인 상태 유지하기
              </label> */}
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">로그인</button>

            <button className="btn mt-3" type="submit">회원가입</button>

          </form>
        </div>

        <div className="p-5" />
        <div className="p-5" />

      </div>
    </>
  )
}


export default SigninPage