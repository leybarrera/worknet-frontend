import { instance } from '../base.api'

const model = 'codes'

export const codeEndpoints = {
  verificateCode: (code, email) => {
    return instance.put(`/${model}/verificate-code?code=${code}&email=${email}`)
  },
}
