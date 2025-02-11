import { instance } from '../base.api'

export const resumeEndpoints = {
  getByUser: (id) => {
    return instance.get(`/resumes/user/${id}`)
  },

  uploadResume: (id, data) => {
    return instance.post(`/resumes/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  deleteResume: (id) => {
    return instance.delete(`/resumes/user/${id}`)
  },
}
