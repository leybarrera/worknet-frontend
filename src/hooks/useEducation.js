import { useState } from 'react'

const useEducation = () => {
  const [education, setEducation] = useState({
    institution: '',
    degree_obtained: '',
    start_date: '',
    end_date: '',
  })

  const updateEducation = (e) => {
    const { name, value } = e.target
    console.log(name, value)
    setEducation((prevEducation) => ({
      ...prevEducation,
      [name]: value,
    }))

    console.log(education)
  }
  return { education, updateEducation }
}

export default useEducation
