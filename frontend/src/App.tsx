import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomeView from './pages/home';
import ClassView from './pages/class';
import CourseView from './pages/course';
import SubjectView from './pages/subject';
import SigninView from './pages/signin';
import ReportView from './pages/report';
import UserView from './pages/user';
import LectureView from './pages/lecture';


function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeView />} />
        <Route path='/class' element={<ClassView />} />

        <Route path='/course' element={<CourseView />} />
        <Route path='/lecture' element={<LectureView />} />
        <Route path='/subject' element={<SubjectView />} />

        <Route path='/signin' element={<SigninView />} />
        <Route path='/report' element={<ReportView />} />
        <Route path='/user' element={<UserView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
