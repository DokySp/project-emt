import { createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "../schemas/interfaces";


const sessionUser = createSlice({
  name: "user",
  initialState: {} as UserInterface,
  reducers: {

    setSessionUser(state) {
      
    },

  }
})

export const { setSessionUser } = sessionUser.actions
export default sessionUser