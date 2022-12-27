import React, { Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/pages/Home/home';
import CoursePage from './components/pages/Course/course';
import SubjectPage from './components/pages/Subject/subject';
import SigninPage from './components/pages/Sign/signin';
import UserPage from './components/pages/Account/account';
import LecturePage from './components/pages/Lecture/lecture';
import ErrorPage from './components/pages/Error/error';
import Header from './components/common/Header/header';
import Footer from './components/common/Footer/footer';
import LectureEditPage from './components/pages/LectureEdit/lectureEdit';
import CourseListPage from './components/pages/CourseList/coruseList';
import SubjectEditPage from './components/pages/SubjectEdit/subjectEdit';
import SubjectEvaluationPage from './components/pages/SubjectEdit/subjectEvaluation';
import SigninPending from './components/pages/Sign/signinPending';
import SignupDone from './components/pages/Sign/Signup/signupDone';
import SignupTermPage from './components/pages/Sign/Signup/signupTerm';
import SignupFormPage from './components/pages/Sign/Signup/signupForm';


const App = (): JSX.Element => {
  return (
    <div>

      <Header />

      <Suspense fallback={<div>로딩중...</div>}>
        <Routes>
          <Route path='/' element={<HomePage />} />

          <Route path='/course' element={<CoursePage />} />
          <Route path='/course/list' element={<CourseListPage />} />
          {/* 하위로 넣기 */}

          <Route path='/lecture/:idx' element={<LecturePage />} />
          <Route path='/lecture/edit/:idx' element={<LectureEditPage />} />
          {/* 하위로 넣기 */}

          <Route path='/subject/:idx' element={<SubjectPage />} />
          <Route path='/subject/edit/:idx' element={<SubjectEditPage />} />
          <Route path='/subject/eval/:idx' element={<SubjectEvaluationPage />} />
          {/* 하위로 넣기 */}

          <Route path='/signin' element={<SigninPage />} />
          <Route path='/signin/pending' element={<SigninPending />} />

          <Route path='/signup/term' element={<SignupTermPage />} />
          <Route path='/signup/form' element={<SignupFormPage />} />
          <Route path='/signup/done' element={<SignupDone />} />


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
