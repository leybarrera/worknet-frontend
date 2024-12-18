import { instance } from '../base.api'

const model = 'job-applications'

export const applicationsAPI = {
  getByUser: (user_id) => {
    return instance.get(`/${model}/user/${user_id}`)
  },
}
