import React, { Suspense, useEffect, useState } from 'react';

import { Routes } from 'react-router-dom';
import './App.css';
import Header from './components/common/Header/header';
import Footer from './components/common/Footer/footer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { checkSigninSession } from './store/session.slice';
import Routing, { generateRoutes } from './components/routing.path';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { asyncUserFetch } from './store/user.session.slice';
import { asyncSubscribesFetch } from './store/subscribes.slice';


const App = () => {

  const session = useSelector((state: RootState) => state.session)
  const [sessionCheckTick, setSessionCheckTick] = useState(0)

  // 로그인 세션 토큰 검사 (1분마다)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    const ticker = setTimeout(
      () => setSessionCheckTick(sessionCheckTick + 1),
      1 * 60 * 1000
    )
    dispatch(checkSigninSession())

    return () => clearTimeout(ticker)

  }, [sessionCheckTick])


  useEffect(() => {
    if (session.isSignin) {
      // 사용자 정보 로드
      dispatch(asyncUserFetch({ token: session.token }))
      // 사용자 구독 정보 업데이트
      dispatch(asyncSubscribesFetch())
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
