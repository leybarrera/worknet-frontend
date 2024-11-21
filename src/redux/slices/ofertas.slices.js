import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ofertas: [],
}

export const ofertasSlice = createSlice({
  name: 'ofertas',
  initialState,
  reducers: {
    setOfertas: (state, action) => {
      state.ofertas = action.payload
    },
  },
})

export const { setOfertas } = ofertasSlice.actions
export default ofertasSlice.reducer
