import { instance } from '../base.api'

export const settingsEndpoint = {
  saveSettings: (data, user_id) => {
    return instance.put(`/users/settings/${user_id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}
