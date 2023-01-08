import { ReactElement } from "react"
import AccountPage from "./pages/Account/account"
import CoursePage from "./pages/Course/course"
import CourseListPage from "./pages/CourseList/coruseList"
import ErrorPage from "./pages/Error/error"
import HomePage from "./pages/Home/home"
import LecturePage from "./pages/Lecture/lecture"
import LectureEditPage from "./pages/LectureEdit/lectureEdit"
import SignupDone from "./pages/Sign/Signup/signupDone"
import SignupFormPage from "./pages/Sign/Signup/signupForm"
import SignupTermPage from "./pages/Sign/Signup/signupTerm"
import SigninPage from "./pages/Sign/signin"
import SigninPendingPage from "./pages/Sign/signinPending"
import SubjectPage from "./pages/Subject/subject"
import SubjectEditPage from "./pages/SubjectEdit/subjectEdit"
import SubjectEvaluationPage from "./pages/SubjectEdit/subjectEvaluation"
import { Route } from "react-router-dom"
import ApiTestPage from "./pages/Test/apiTest"


// var params 생성기
const variableParams = (param: string) => (idx?: number) => idx === undefined ? `${param}/:var` : `${param}/${idx}`


// 라우팅 자동 생성기
export const generateRoutes = (route: any, queue: Array<ReactElement>) => {
  const keys = Object.keys(route)

  // route 있는 경우 패스 추가
  if (keys.indexOf("path") !== -1 && keys.indexOf("Component") !== -1) {
    if (typeof route.path === 'function') {
      queue.push(<Route key={0} path={route.path()} element={<route.Component />} />)
    } else {
      queue.push(<Route key={0} path={route.path} element={<route.Component />} />)
    }
  }
  // 하위 컴포넌트로 재귀
  for (let i of keys) {
    if (i !== "path" && i !== "Component") {
      generateRoutes(route[i], queue)
    }
  }
}


// 라우팅 관리
const Routing = {

  Root: {
    path: "/",
    Component: HomePage,
  },


  Course: {

    ByIdx: {
      path: variableParams("/course"),
      Component: CoursePage,
    },

    /**
     * ### 특정 사용자의 수강 리스트 
     * - idx 없으면 전체 강의 목록 띄우기
     */
    List: {

      path: "/course/list",
      Component: CourseListPage,

      ByIdx: {
        path: variableParams("/course/list"),
        Component: CourseListPage,
      },
    }
  },


  Subject: {

    ByIdx: {
      path: variableParams("/subject"),
      Component: SubjectPage,
    },

    Edit: {
      ByIdx: {
        path: variableParams("/subject/edit"),
        Component: SubjectEditPage,
      }
    },

    Evaluation: {
      ByIdx: {
        path: variableParams("/subject/eval"),
        Component: SubjectEvaluationPage,
      }
    },
  },


  Lecture: {

    ByIdx: {
      path: variableParams("/lecture"),
      Component: LecturePage,
    },
    Edit: {
      ByIdx: {
        path: variableParams("/lecture/edit"),
        Component: LectureEditPage,
      }
    },
  },


  Signin: {
    path: "/signin",
    Component: SigninPage,
    Pending: {
      path: "/signin/pending",
      Component: SigninPendingPage,
    }
  },


  Signup: {

    Term: {
      path: "/signup/term",
      Component: SignupTermPage,
    },

    Form: {
      path: "/signup/form",
      Component: SignupFormPage,
    },

    Done: {
      path: "/signup/done",
      Component: SignupDone,
    },
  },


  User: {
    path: "/user",
    Component: AccountPage,
  },


  ApiTest: {
    path: "/test/api",
    Component: ApiTestPage,
  },


  Error: {
    path: "*",
    Component: ErrorPage,
  },

}


export default Routing
