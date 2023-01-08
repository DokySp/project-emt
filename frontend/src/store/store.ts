import { configureStore } from "@reduxjs/toolkit";
import session from "./session.slice";
import sessionUser from "./user.session.slice";
import subscribes from "./subscribes.slice";


const store = configureStore({
  reducer: {
    session: session.reducer,
    sessionUser: sessionUser.reducer,
    subscribes: subscribes.reducer,
  }
})

export default store
// useSelector 호출 시 타입 지정
export type RootState = ReturnType<typeof store.getState>
// useDispatch 호출 시 타입 지정
export type AppDispatch = typeof store.dispatch
