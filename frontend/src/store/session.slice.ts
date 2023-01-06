import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StorageManager from "../utils/storage.manager";
import { doSignin } from "../services/account.service";
import { removeClientAuthorizationHeader, setClientAuthorizationHeader } from "../services/client";

const _token = new StorageManager({ key: "token", type: "session" })


// 바로 dispatch 하는게 아니라
// 별도의 서비스를 두어 관리하도록 해야 함!!
// redux-toolkit: thunk
// https://www.youtube.com/watch?v=K-3sBc2pUJ4

/**
 * ### 로그인 비동기 처리
 */
export const asyncSigninFetch = createAsyncThunk(
  'session/asyncDoSignin',
  async (data: {email: string, password: string}) => {

    const tokenData = await doSignin({
      email: data.email,
      password: data.password,
    })

    // payload 리턴
    return {token: tokenData.token}
  }
)

const session = createSlice({
  name: "session",
  initialState: {
    isSigninProcessing: false,
    isSignin: false,
    token: "",
  },

  // action creator를 자동으로 제작 X
  // -> extraReducers 안에서 수동으로 제작해야 함
  extraReducers: (builder) => {
    builder.addCase(asyncSigninFetch.pending, (state, action) => {
      // loading
      state.isSigninProcessing = true
    })
    builder.addCase(asyncSigninFetch.fulfilled, (state, action) => {
      // complete
      state.isSigninProcessing = false
      state.isSignin = true
      state.token = action.payload.token

      _token.save(action.payload.token)
      setClientAuthorizationHeader({token: action.payload.token})
      
    })
    builder.addCase(asyncSigninFetch.rejected, (state, action) => {
      // fail
      // const { response } = error as unknown as AxiosError;
      console.log(action.payload)
      state.isSigninProcessing = false
    })
  },

  // action creator를 자동으로 제작함
  reducers: {

    /**
     * ### 브라우저 새로고침 시, 최초로 로그인 세션인지 확인
     * @param state 
     */
    checkSigninSession(state) {
      
      let token = _token.get()
      
      if(token === null){
        state.isSignin = false
        state.token = ""
        removeClientAuthorizationHeader()
      } else {
        state.isSignin = true
        state.token = token
        setClientAuthorizationHeader({token})
      }
    },

    /**
     * ### 로그아웃
     * @param state 
     */
    setSignout(state) {
      state.isSignin = false
      state.token = ""
      _token.clear()
      removeClientAuthorizationHeader()
    },

  }
})

export const { checkSigninSession, setSignout } = session.actions
export default session