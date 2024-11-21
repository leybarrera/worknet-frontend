import { configureStore } from '@reduxjs/toolkit'
import ofertasReducer from './slices/ofertas.slices'
import usersReducer from './slices/users.slices'

export const store = configureStore({
  reducer: {
    ofertas: ofertasReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})
