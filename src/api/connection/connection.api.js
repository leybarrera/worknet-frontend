import { instance } from '../base.api'

const model = 'connections'

export const connectionAPI = {
  sendConnection: (data) => {
    return instance.post(`${model}`, data)
  },
  removeConnection: (data) => {
    return instance.delete(
      `${model}/unfollow?user_id=${data.UserSourceId}&friend_id=${data.UserTargetId}`
    )
  },
  getByUser: (user_id) => {
    return instance.get(`/${model}/user/${user_id}`)
  },
}
