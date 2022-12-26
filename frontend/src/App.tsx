import React, { Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/pages/Home/home';
import CoursePage from './components/pages/Course/course';
import SubjectPage from './components/pages/Subject/subject';
import SigninPage from './components/pages/Signin/signin';
import UserPage from './components/pages/Account/account';
import LecturePage from './components/pages/Lecture/lecture';
import ErrorPage from './components/pages/Error/error';
import Header from './components/common/Header/header';
import Footer from './components/common/Footer/footer';
import LectureEditPage from './components/pages/LectureEdit/lectureEdit';
import MyCoursePage from './components/pages/MyCourse/myCoruse';
import SignupPage from './components/pages/Signup/signup';
import SubjectEditPage from './components/pages/SubjectEdit/subjectEdit';
import SubjectEvaluationPage from './components/pages/SubjectEvaluation/subjectEvaluation';


const App = (): JSX.Element => {
  return (
    <div>

      <Header />

      <Suspense fallback={<div>로딩중...</div>}>
        <Routes>
          <Route path='/' element={<HomePage />} />

          <Route path='/course' element={<CoursePage />} />
          <Route path='/course/user' element={<MyCoursePage />} />
          {/* 하위로 넣기 */}

          <Route path='/lecture' element={<LecturePage />} />
          <Route path='/lecture/edit' element={<LectureEditPage />} />
          {/* 하위로 넣기 */}

          <Route path='/subject' element={<SubjectPage />} />
          <Route path='/subject/edit' element={<SubjectEditPage />} />
          <Route path='/subject/evaluation' element={<SubjectEvaluationPage />} />
          {/* 하위로 넣기 */}

          <Route path='/signin' element={<SigninPage />} />
          <Route path='/signup' element={<SignupPage />} />

          <Route path='/user' element={<UserPage />} />

          {/* 잘못된 접근 처리 */}
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Suspense>

      <Footer />

    </div>
  );
}

export default App;
