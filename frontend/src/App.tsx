import React, { Suspense, useEffect } from 'react';

import { Routes } from 'react-router-dom';
import './App.css';
import Header from './components/common/Header/header';
import Footer from './components/common/Footer/footer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { checkSigninSession } from './store/session.slice';
import Routing, { generateRoutes } from './components/routing.path';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { asyncUserFetch } from './store/user.slice';
import jwtDecode from 'jwt-decode';
import { TokenInterface } from './schemas/interfaces';


const App = () => {

  const session = useSelector((state: RootState) => state.session)

  // 로그인 세션 토큰 검사
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(checkSigninSession())
  }, [])
  // 사용자 정보 로드
  useEffect(() => {
    if (session.isSignin) {
      dispatch(asyncUserFetch({ token: session.token }))
    }
  }, [session.isSignin])

  // 라우팅 생성
  const routeQueue: Array<ReactElement> = []
  Object.values(Routing).map((route) => {
    generateRoutes(route, routeQueue)
  })


  return (
    <div>

      <Header />

      <Suspense fallback={<div>로딩중...</div>}>
        <Routes>
          {routeQueue.map((i) => i)}
        </Routes>
      </Suspense>

      <Footer />

    </div>
  );
}

export default App;
