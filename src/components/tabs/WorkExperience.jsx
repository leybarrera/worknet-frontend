import { useEffect, useState } from 'react'
import { storageUtil } from '../../utils/index.utils'
import { workExperiencesAPI } from '../../api/experience/experience.api'
import { toast, Toaster } from 'sonner'

const WorkExperienceTab = () => {
  const initialData = {
    company: '',
    position: '',
    duration: '',
  }

  const [experience, setExperience] = useState(initialData)

  const [currentUser, setCurrentUser] = useState(null)
  const [workExperiences, setWorkExperiences] = useState([])

  const deleteWorkExperience = (id) => {
    workExperiencesAPI.delete(id).then((res) => {
      const { message } = res.data
      toast.success(message)
      getAllData()
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setExperience((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const getAllData = () => {
    const { user } = storageUtil.getFromLocalStorage('session_info')
    workExperiencesAPI
      .getByUser(user.id)
      .then((res) => {
        const { workExperiences } = res.data
        setWorkExperiences(workExperiences)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleSave = () => {
    const { user } = storageUtil.getFromLocalStorage('session_info')
    if (Object.values(experience).some((educ) => educ === '')) {
      toast.error('Todos los datos son obligatorios')
      return
    }

    workExperiencesAPI
      .save({
        ...experience,
        UserId: user.id,
      })
      .then((res) => {
        const { message } = res.data
        toast.success(message)
        getAllData()
        setExperience(initialData)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (currentUser) {
      getAllData()
    }
  }, [currentUser])

  useEffect(() => {
    const { user } = storageUtil.getFromLocalStorage('session_info')
    setCurrentUser(user)
  }, [])
  return (
    <main className="flex flex-col">
      <div className="w-full max-w-[1000px] flex flex-col">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col flex-1 gap-2">
            <label htmlFor="" className="text-lg font-semibold">
              Empresa
            </label>
            <input
              type="text"
              name="company"
              onChange={handleChange}
              value={experience.company}
              className="h-[60px] px-2 bg-gray-200 border border-gray-200 rounded-lg outline-none"
            />
          </div>
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="" className="text-lg font-semibold">
                Puesto
              </label>
              <input
                type="text"
                name="position"
                onChange={handleChange}
                value={experience.position}
                className="h-[60px] px-2 bg-gray-200 border border-gray-200 rounded-lg outline-none"
              />
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="" className="text-lg font-semibold">
                Duración
              </label>
              <input
                type="number"
                name="duration"
                onChange={handleChange}
                value={experience.duration}
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
          {/* Tabla de Experiencias Laborales */}
          <h3 className="font-bold text-lg text-center py-5">
            Experiencia Laboral
          </h3>
          {workExperiences.length > 0 ? (
            <div className="w-full flex flex-col">
              {workExperiences.map((wk) => {
                return (
                  <div
                    className="py-5 flex flex-row justify-between items-center border-b border-gray-200"
                    key={wk.id}
                  >
                    <h3 className="flex-1 font-bold">{wk.company}</h3>
                    <h4
                      className="flex-1 text-gray-500
                  "
                    >
                      {wk.position}
                    </h4>
                    <h4
                      className="flex-1 text-gray-500
                  "
                    >
                      {wk.duration} {wk.duration === 1 ? 'año' : 'años'}
                    </h4>
                    <button
                      className="px-3 py-1 bg-red-700 text-white"
                      onClick={() => deleteWorkExperience(wk.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="w-full flex flex-col justify-center items-center py-5">
              <h3>Aún no tienes experiencia laboral añadida</h3>
            </div>
          )}
        </div>
      </div>
      <Toaster richColors />
    </main>
  )
}

export default WorkExperienceTab
