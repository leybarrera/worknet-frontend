import { instance } from '../base.api'

export const authEndpoints = {
  login: ({ email, password }) => {
    return instance.post('/auth/login', { email, password })
  },
}
