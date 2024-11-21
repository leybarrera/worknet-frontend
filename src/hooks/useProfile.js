import { useEffect, useState } from 'react'
import { storageUtil } from '../utils/index.utils'

const useProfile = () => {
  const data = storageUtil.getFromLocalStorage('session_info').user
  const [user, setUser] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    location: '',
  })

  useEffect(() => {
    setUser(data)
  }, [])

  const updateUser = (e) => {
    const { name, value } = e.target
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }))
  }

  return { user, updateUser }
}

export default useProfile
