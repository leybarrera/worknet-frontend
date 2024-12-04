import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  skills: [],
}

export const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    setAllSkills: (state, action) => {
      state.skills = action.payload
    },
  },
})

export const { setAllSkills } = skillsSlice.actions
export default skillsSlice.reducer
