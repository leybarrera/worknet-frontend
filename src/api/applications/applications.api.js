import { instance } from '../base.api'

const model = 'job-applications'

export const applicationsAPI = {
  cancelOffer: (UserId, JobOfferId) => {
    return instance.delete(
      `/${model}/delete-offer?UserId=${UserId}&JobOfferId=${JobOfferId}`
    )
  },
  applyOffer: (data) => {
    return instance.post(`/${model}/`, data)
  },
  getByUser: (user_id) => {
    return instance.get(`/${model}/user/${user_id}`)
  },

  getByCompany: (company_id) => {
    return instance.get(`/${model}/company/${company_id}`)
  },

  deleteApplication: (id) => {
    return instance.delete(`/${model}/${id}`)
  },

  getByJobOffer: (id) => {
    return instance.get(`/${model}/job-offer/${id}`)
  },

  rejectPostulation: (id, data) => {
    console.log(id, data)
    return instance.patch(`${model}/reject/${id}`, data)
  },
  acceptPostulation: (id, data) => {
    console.log(id, data)
    return instance.patch(`${model}/accept/${id}`, data)
  },
}
