import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TokenInterface, UserInterface } from "../schemas/interfaces";
import { getUser } from "../services/user.service";
import jwtDecode from "jwt-decode";


export const asyncUserFetch = createAsyncThunk(
  'sessionUser/asyncUserFetch',
  async (data: {token: string}) => {

    const tokenData = jwtDecode<TokenInterface>(data.token)
    tokenData.iat = new Date(tokenData.iat)
    tokenData.exp = new Date(tokenData.exp)

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