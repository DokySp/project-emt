import React, { Suspense, useEffect } from 'react';

import { Routes } from 'react-router-dom';
import './App.css';
import Header from './components/common/Header/header';
import Footer from './components/common/Footer/footer';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';
import { checkSigninSession } from './store/session.slice';
import Routing, { generateRoutes } from './components/routing.path';
import { ReactElement } from 'react-markdown/lib/react-markdown';


const App = () => {

  // 로그인 세션 토큰 검사
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(checkSigninSession())
  }, [])

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
