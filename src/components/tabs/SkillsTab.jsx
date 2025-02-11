import { useEffect, useState } from 'react'
import { skillsEndpoints } from '../../api/skills/skills.api'
import { userSkillsEndpoints } from '../../api/user-skill/user-skill.api'
import { storageUtil } from '../../utils/index.utils'
import { toast, Toaster } from 'sonner'

const SkillsTab = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [userSkill, setUserSkill] = useState({
    SkillId: null,
    years_of_experience: null,
  })
  const [userSkills, setUserSkills] = useState([])
  const [skills, setSkills] = useState([])

  const getSkillName = (id) => {
    const skillFound = skills.find((sk) => sk.id === id)
    console.log(skillFound)
    return skillFound.name
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    console.log(name, value)
    setUserSkill((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const deleteUserSkill = (id) => {
    userSkillsEndpoints
      .delete(id)
      .then((res) => {
        const { message } = res.data
        toast.success(message)
        getAllData()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleSave = () => {
    if (!userSkill.SkillId || userSkills.years_of_experience) {
      toast.error('Todos los campos son obligatorios')
      return
    }
    userSkillsEndpoints
      .save({
        ...userSkill,
        UserId: currentUser.id,
      })
      .then((res) => {
        const { message } = res.data
        toast.success(message)
        getAllData()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getAllData = () => {
    const { user } = storageUtil.getFromLocalStorage('session_info')
    setCurrentUser(user)

    userSkillsEndpoints
      .getByUser(user.id)
      .then((res) => {
        const { userSkills } = res.data
        setUserSkills(userSkills)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    skillsEndpoints.getAll().then((res) => {
      const { skills } = res.data
      setSkills(skills)
    })
    getAllData()
  }, [])
  return (
    <main className="flex flex-col">
      <div className="w-full max-w-[1000px] flex flex-col">
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="" className="text-lg font-semibold">
                Habilidades
              </label>
              <select
                className="h-[60px] px-2 bg-gray-200 border border-gray-200 rounded-lg outline-none"
                name="SkillId"
                onChange={handleChange}
              >
                {skills.map((skill) => (
                  <option value={skill.id} key={skill.id}>
                    {skill.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="" className="text-lg font-semibold">
                Habilidades
              </label>
              <input
                type="number"
                name="years_of_experience"
                onChange={handleChange}
                className="h-[60px] px-2 bg-gray-200 border border-gray-200 rounded-lg outline-none"
              />
            </div>
          </div>

          <button
            className="mt-3 py-3 bg-[#4eb5b7] text-lg text-white font-bold rounded-lg hover:bg-[#3b8d8f] transition-colors"
            onClick={handleSave}
          >
            Agregar
          </button>
        </div>
        <div className="flex flex-col mt-3">
          {/* Tabla dde habilidades */}
          <h3 className="font-bold text-lg text-center py-5">
            Tabla de Habilidades
          </h3>
          {userSkills.length > 0 ? (
            <div className="w-full flex flex-col">
              {userSkills.map((userSkill) => {
                const skillName = getSkillName(userSkill.SkillId)
                return (
                  <div
                    className="py-5 flex flex-row justify-between items-center border-b border-gray-200"
                    key={userSkill.id}
                  >
                    <h3 className="flex-1 font-bold">{skillName}</h3>
                    <h4
                      className="flex-1 text-gray-500
                  "
                    >
                      {userSkill.years_of_experience} años exp
                    </h4>
                    <button
                      className="px-3 py-1 bg-red-700 text-white"
                      onClick={() => deleteUserSkill(userSkill.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="w-full flex flex-col justify-center items-center py-5">
              <h3>Aún no tienes habilidades agregadas</h3>
            </div>
          )}
        </div>
      </div>
      <Toaster richColors />
    </main>
  )
}

export default SkillsTab
