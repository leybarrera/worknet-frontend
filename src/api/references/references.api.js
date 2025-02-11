import { instance } from '../base.api'

const model = 'references'

export const referencesAPI = {
  getByUser: (id) => {
    return instance.get(`${model}/user/${id}`)
  },
  saveReference: (data) => {
    return instance.post(`${model}/`, data)
  },
  deleteReference: (id) => {
    return instance.delete(`${model}/${id}`)
  },
}
