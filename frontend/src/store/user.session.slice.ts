import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "../schemas/interfaces";
import { getUser } from "../services/user.service";
import jwtDecode from "jwt-decode";
import { TokenInterface } from "../utils/token.manager";


export const asyncUserFetch = createAsyncThunk(
  'sessionUser/asyncUserFetch',
  async (data: {token: string}) => {
    const tokenData = jwtDecode<TokenInterface>(data.token)
    // TODO: 직렬화 이슈
    const user = await getUser({idx: tokenData.idx})
    return {user: user}
  }
)

const sessionUser = createSlice({
  name: "sessionUser",
  initialState: {
    isUpdating: false,
    data: {} as UserInterface,
  },
  reducers: {

    setSessionUser(state) {
      
    },

  },
  extraReducers: (builder) => {
    builder.addCase(asyncUserFetch.pending, (state, action) => {
      // loading
      state.isUpdating = true
    })
    builder.addCase(asyncUserFetch.fulfilled, (state, action) => {
      // complete
      console.log(action.payload.user)
      state.data = action.payload.user
      state.isUpdating = false
    })
    builder.addCase(asyncUserFetch.rejected, (state, action) => {
      // fail
      state.isUpdating = false
    })
  },
})

export const { setSessionUser } = sessionUser.actions
export default sessionUser