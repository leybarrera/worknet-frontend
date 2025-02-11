import { instance } from '../base.api'

const model = 'companies'

export const companyEndpoints = {
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
  updatePassword: (id, password) => {
    return instance.patch(`/${model}/change-password/${id}`, { password })
  },
  delete: (id) => {
    return instance.delete(`/${model}/${id}`)
  },

  recover: (id) => {
    return instance.put(`/${model}/recovery/${id}`)
  },
}
