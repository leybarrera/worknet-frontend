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

  getOtherUsers: (id) => {
    return instance.get(`/users/others/${id}`)
  },

  getByEmail: (email) => {
    return instance.get(`/q?email=${email}`)
  },

  getRecommendations: (token) => {
    if (token)
      return instance.get(`/users/recommendations/user-logged?token=${token}`)

    return instance.get('/users/recommendations/user-not-logged')
  },

  getOnlyValids: () => {
    return instance.get('/only/valids')
  },

  getOnlyActives: () => {
    return instance.get('/only/actives')
  },

  // Saves
  saveInfoUser: (id, data) => {
    return instance.put(`/users/${id}`, data)
  },

  saveResume: (id, data) => {
    return instance.put(`/users/${id}/resume`, data)
  },

  saveEducation: (id, data) => {
    console.log(id, data)
    return instance.put(`/users/${id}/education`, data)
  },

  saveExperience: (id, data) => {
    return instance.put(`/users/${id}/experience`, data)
  },

  saveSkills: (id, data) => {
    return instance.put(`/users/${id}/skills`, data)
  },

  saveLanguages: (id, data) => {
    return instance.put(`/users/${id}/languages`, data)
  },

  saveReferences: (id, data) => {
    return instance.put(`/users/${id}/references`, data)
  },

  updateWithImage: (data) => {
    return instance.put(`/users/with-image`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  updateWithoutImage: (data) => {
    return instance.put(`/users/without-image`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  recoveryUser: (id) => {
    return instance.put(`/recovery/${id}`)
  },
}
