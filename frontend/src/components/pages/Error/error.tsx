import { CSSProperties, PropsWithChildren } from "react"

interface ErrorProps { }

const ErrorPage = ({ children }: PropsWithChildren<ErrorProps>) => {

  return (
    <div>
      <div style={{ textAlign: "center", margin: "100px 0px 100px" } as CSSProperties}>
        <div>404</div>
        <div>페이지를 찾을 수 없습니다</div>
      </div>
    </div>
  )
}

export default ErrorPage