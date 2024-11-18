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
    profile_picture: '',
    gender: '',
    location: '',
    role: '',
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
