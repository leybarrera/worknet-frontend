import { instance } from '../base.api'

export const resumeEndpoints = {
  getByUser: (id) => {
    return instance.get(`/resumes/user/${id}`)
  },
}
