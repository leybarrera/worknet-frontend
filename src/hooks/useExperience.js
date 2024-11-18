import { useState } from 'react'

const useExperience = () => {
  const [experience, setExperience] = useState({
    company: '',
    position: '',
    duration: '',
  })

  const updateExperience = (e) => {
    const { name, value } = e.target
    setExperience((prevExperience) => ({
      ...prevExperience,
      [name]: value,
    }))
  }

  return { experience, updateExperience }
}

export default useExperience
