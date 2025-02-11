import { configureStore } from '@reduxjs/toolkit'
import ofertasReducer from './slices/ofertas.slices'
import usersReducer from './slices/users.slices'
import skillsReducer from './slices/skills.slices'
import applicantsReducer from './slices/applicants.slice'
import sessionReducer from './slices/session.slice'
export const store = configureStore({
  reducer: {
    ofertas: ofertasReducer,
    users: usersReducer,
    skills: skillsReducer,
    applicants: applicantsReducer,
    session: sessionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})
