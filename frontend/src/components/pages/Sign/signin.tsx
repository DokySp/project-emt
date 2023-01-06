import { useDispatch, useSelector } from "react-redux"
import { dummyLogo1 } from "../../../constants/dummy/dummy"
import { useNavigate } from "react-router-dom"
import { FloatingLabel, Form } from "react-bootstrap"
import { FieldError, useForm } from "react-hook-form"
import { asyncSigninFetch } from "../../../store/session.slice"
import { AppDispatch, RootState } from "../../../store/store"
import { useEffect } from "react"
import regex from "../../../utils/regex"
import Routing from "../../routing.path"
import { getUser } from "../../../services/user.service"
import { asyncUserFetch } from "../../../store/user.slice"



const SigninPage = () => {

  // navigation
  const navigate = useNavigate()

  // redux
  const dispatch = useDispatch<AppDispatch>()
  const session = useSelector((state: RootState) => state.session)


  // 로그인 상태인 경우, 다시 홈으로 돌려보냄
  useEffect(() => {
    if (session.isSignin === true && session.isSigninProcessing === false && session.token.length !== 0) {
      navigate(Routing.Root.path)
    }
  }, [navigate, session.isSignin, session.isSigninProcessing, session.token.length])


  // form 관리
  interface InputValue {
    email: string,
    password: string,
  }

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<InputValue>();

  // // react-bootstrap form validation 관리
  interface FormValidationInterface {
    isValid: boolean,
    isInvalid: boolean,
  }

  const formValidationIntercepter = (error: FieldError | undefined): FormValidationInterface => {

    switch (error?.type) {
      case "required": error.message = "내용을 입력해주세요"; break;
      case "pattern": error.message = "올바르지 않은 형식입니다."; break;
    }

    if (error) {
      return {
        isValid: false,
        isInvalid: true,
      }
    } else {
      return {
        isValid: false,
        isInvalid: false,
      }
    }
  }

  // // submit 호출 시
  const onSubmit = handleSubmit(async (data: InputValue) => {
    await dispatch(asyncSigninFetch({ ...data }))
    await dispatch(asyncUserFetch({ token: session.token }))
  });

  // // form 경고 관리
  useEffect(() => {
    if (session.isSignin && !session.isSigninProcessing) {
      // 로그인 성공 시, 이전 페이지로 되돌아감
      navigate(-2)

    } else if (!session.isSignin && !session.isSigninProcessing) {
      setError("password", {
        type: "invalid",
        message: "계정 정보가 올바르지 않습니다."
      })
    }
  }, [session.isSigninProcessing])

  // // form 경고 초기화
  useEffect(() => {
    clearErrors("password")
  }, [])



  return (
    <>
      <div className="text-center">

        <div className="p-5" />

        <div className="form-signin" style={{ width: "300px", margin: "0 auto" }}>
          <img className="m-5" src={dummyLogo1} alt="logo" height="100" />

          <Form noValidate onSubmit={onSubmit}>

            {errors.email && <div className="mt-4 mb-1 text-danger">{errors.email?.message}</div>}
            {!errors.email && <div className="mt-4 mb-1" style={{ fontSize: ".875em", }}>&nbsp;</div>}

            {/* 이메일 주소 입력 */}
            <FloatingLabel
              controlId="floatingInput1"
              label="이메일 주소"
              className="mt-1"
            >
              <Form.Control
                required
                type="email"
                placeholder="name@example.com"
                defaultValue=""
                {...formValidationIntercepter(errors.email)}
                {...register("email", {
                  required: true,
                  // pattern: regex.email,
                })}
              />
            </FloatingLabel>

            {/* 비밀번호 입력 */}
            <FloatingLabel
              controlId="floatingInput2"
              label="비밀번호"
              className="mt-2"
            >
              <Form.Control
                required
                type="password"
                placeholder="Password"
                defaultValue=""
                {...formValidationIntercepter(errors.password)}
                {...register("password", {
                  required: true,
                  // pattern: passwordRegex,
                })}
              />



              {errors.password && <div className="mt-1 mb-1 text-danger">{errors.password?.message}</div>}
              {!errors.password && <div className="mb-1 mt-1" style={{ fontSize: ".875em", }}>&nbsp;</div>}

            </FloatingLabel>

            {/* 로그인 버튼 */}
            <button disabled={session.isSigninProcessing} className="w-100 btn btn-lg btn-primary mt-4" type="submit" >로그인</button>

            {/* </Form.Group> */}
          </Form>

          <button onClick={() => navigate(Routing.Signup.Term.path)} className="btn mt-3" type="submit">회원가입</button>

        </div>

        <div className="p-5" />
        <div className="p-5" />

      </div>
    </>
  )
}


export default SigninPage
