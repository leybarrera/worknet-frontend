import { useState } from 'react'

const useSkill = () => {
  const [skill, setSkill] = useState({
    SkillId: '',
    years_of_experience: '',
  })

  const updateSkill = (e) => {
    const { name, value } = e.target
    setSkill((prevSkill) => ({
      ...prevSkill,
      [name]: value,
    }))
  }

  return { skill, updateSkill }
}

export default useSkill
