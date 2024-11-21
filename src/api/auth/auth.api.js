import { instance } from '../base.api'

export const authEndpoints = {
  login: ({ email, password }) => {
    return instance.post('/auth/login', { email, password })
  },

  accountActivation: (token) => {
    return instance.get(`/auth/account-activation?token=${token}`)
  },
}
