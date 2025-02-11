import { instance } from '../base.api'

const model = 'work-experiences'

export const workExperiencesAPI = {
  getByUser: (user_id) => {
    return instance.get(`/${model}/user/${user_id}`)
  },

  save: (data) => {
    return instance.post(`/${model}`, data)
  },
  delete: (id) => {
    return instance.delete(`/${model}/${id}`)
  },
}
