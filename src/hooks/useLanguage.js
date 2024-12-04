import { useState } from 'react'

const useLanguage = () => {
  const [language, setLanguage] = useState({
    name: '',
    proficiency: '',
  })

  const updateLanguage = (e) => {
    const { name, value } = e.target
    console.log(name, value)
    setLanguage((prevLanguage) => ({
      ...prevLanguage,
      [name]: value,
    }))
  }
  return { language, updateLanguage }
}

export default useLanguage
