import { useState } from 'react'

const useSkill = () => {
  const [skill, setSkill] = useState({
    SkillId: '',
    years_of_experience: '',
  })

  const updateSkill = (e) => {
    const { name, value } = e.target
    console.log(name, value)
    setSkill((prevSkill) => ({
      ...prevSkill,
      [name]: value,
    }))
  }

  return { skill, updateSkill }
}

export default useSkill
