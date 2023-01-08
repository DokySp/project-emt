import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserCourse } from "../services/user.service";


export const asyncSubscribesFetch = createAsyncThunk(
  'subscribes/asyncSubscribesFetch',
  async () => {
    const res = await getUserCourse()
    const list: Array<SubscribesInterface> = []
    res.map((item) => {
      list.push({classIdx: item.idx!, startedDate: item.started_date!})
    })
    return {list}
  }
)

export interface SubscribesInterface {
  classIdx: number,
  startedDate: Date,
}

const subscribes = createSlice({
  name: "subscribes",
  initialState: {
    list: [] as Array<SubscribesInterface>,
    isUpdating: false,
  },
  reducers: {
    setSessionUser(state) {},
  },
  extraReducers: (builder) => {
    builder.addCase(asyncSubscribesFetch.pending, (state, action) => {
      // loading
      state.list = []
      state.isUpdating = true
    })
    builder.addCase(asyncSubscribesFetch.fulfilled, (state, action) => {
      // complete
      state.list = action.payload.list
      state.isUpdating = false
    })
    builder.addCase(asyncSubscribesFetch.rejected, (state, action) => {
      // fail
      state.isUpdating = false
    })
  },
})

export const { setSessionUser } = subscribes.actions
export default subscribes