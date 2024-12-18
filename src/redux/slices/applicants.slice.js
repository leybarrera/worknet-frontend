import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  applications: [],
  contacts: [],
}

export const applicantsSlice = createSlice({
  name: 'candidatos',
  initialState,
  reducers: {
    setApplications: (state, action) => {
      state.applications = action.payload
    },
    setContacts: (state, action) => {
      state.contacts = action.payload
    },
  },
})

export const { setApplications, setContacts } = applicantsSlice.actions
export default applicantsSlice.reducer
