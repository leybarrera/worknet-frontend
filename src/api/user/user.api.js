import { instance } from '../base.api'

export const userEndpoints = {
  register: (data) => {
    return instance.post('/users', data)
  },
}
