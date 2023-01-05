import { createSlice } from "@reduxjs/toolkit";


const sessionUser = createSlice({
  name: "user",
  initialState: {
    isSigninProcessing: false,
    isSignin: false,
    token: "",
  },
  reducers: {

    setSessionUser(state) {
      
    },

  }
})

export const { setSessionUser } = sessionUser.actions
export default sessionUser