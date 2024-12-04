import { configureStore } from '@reduxjs/toolkit'
import ofertasReducer from './slices/ofertas.slices'
import usersReducer from './slices/users.slices'
import skillsReducer from './slices/skills.slices'
export const store = configureStore({
  reducer: {
    ofertas: ofertasReducer,
    users: usersReducer,
    skills: skillsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})
