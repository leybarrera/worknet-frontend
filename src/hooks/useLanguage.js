import { useState } from 'react'

const useLanguage = () => {
  const [language, setLanguage] = useState({
    LanguageId: '',
    proficiency: '',
  })

  const updateLanguage = (e) => {
    const { name, value } = e.target
    setLanguage((prevLanguage) => ({
      ...prevLanguage,
      [name]: value,
    }))
  }
  return { language, updateLanguage }
}

export default useLanguage
