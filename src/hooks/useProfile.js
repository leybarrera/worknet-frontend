import { useEffect, useState } from 'react'
import { storageUtil } from '../utils/index.utils'

const useProfile = () => {
  const data = storageUtil.getFromLocalStorage('session_info')
  const [user, setUser] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    location: '',
    profile_picture: '',
  })

  useEffect(() => {
    if (data) {
      setUser(data.user)
    }
  }, [])

  const updateUser = (e) => {
    const { name, value } = e.target
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }))
  }

  const updateProfilePicture = (imageUri) => {
    setUser((prevUser) => ({
      ...prevUser,
      profile_picture: imageUri,
    }))
  }

  return { user, updateUser, updateProfilePicture }
}

export default useProfile
