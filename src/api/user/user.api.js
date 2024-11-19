import { instance } from '../base.api'
export const userEndpoints = {
  register: (data) => {
    return instance.post('/users', data)
  },

  update: (id, data) => {
    return instance.put(`/${id}`, data)
  },

  delete: (id) => {
    return instance.delete(`/users/${id}`)
  },

  getAll: () => {
    return instance.get('/users')
  },

  getById: (id) => {
    return instance.get(`/users/s/${id}`)
  },

  getByEmail: (email) => {
    return instance.get(`/q?email=${email}`)
  },

  getOnlyValids: () => {
    return instance.get('/only/valids')
  },

  getOnlyActives: () => {
    return instance.get('/only/actives')
  },

  recoveryUser: (id) => {
    return instance.put(`/recovery/${id}`)
  },
}
