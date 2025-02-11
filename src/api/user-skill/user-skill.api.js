import { instance } from '../base.api'

const model = 'user-skills'

export const userSkillsEndpoints = {
  getByUser: (id) => {
    return instance.get(`/${model}/user/${id}`)
  },

  save: (data) => {
    return instance.post(`/${model}`, data)
  },

  delete: (id) => {
    return instance.delete(`/${model}/${id}`)
  },
}
