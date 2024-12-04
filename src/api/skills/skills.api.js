import { instance } from '../base.api'

export const skillsEndpoints = {
  getAll: () => {
    return instance.get('/skills')
  },
}
