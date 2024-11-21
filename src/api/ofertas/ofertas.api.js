import { instance } from '../base.api'

const model = 'job-offers'

export const ofertasEndpoints = {
  getAll: () => {
    return instance.get(`/${model}`)
  },
  getById: (id) => {
    return instance.get(`/${model}/${id}`)
  },
  register: (data) => {
    return instance.post(`/${model}`, data)
  },
  update: (id, data) => {
    return instance.put(`/${model}/${id}`, data)
  },
  delete: (id) => {
    return instance.delete(`/${model}/${id}`)
  },
}
