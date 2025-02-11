import { instance } from '../base.api'

const model = 'educations'

export const educationEndpoints = {
  getByUser: (id) => {
    return instance.get(`${model}/user/${id}`)
  },

  delete: (id) => {
    return instance.delete(`${model}/${id}`)
  },

  save: (data) => {
    return instance.post(`${model}`, data)
  },
}
