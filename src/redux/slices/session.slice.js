import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogin: false,
  company: null,
  user: null,
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload
    },
    setCompany: (state, action) => {
      state.company = action.payload
    },
  },
})

export const { setIsLogin, setCompany } = sessionSlice.actions
export default sessionSlice.reducer
