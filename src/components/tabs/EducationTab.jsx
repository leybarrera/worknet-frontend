import { useEffect, useState } from 'react'
import { storageUtil } from '../../utils/index.utils'
import { educationEndpoints } from '../../api/education/education.api'
import { toast, Toaster } from 'sonner'

const EducationTab = () => {
  const initialData = {
    institution: null,
    degree_obtained: null,
    start_date: null,
    end_date: null,
  }
  const [education, setEducation] = useState(initialData)
  const [educations, setEducations] = useState([])

  const getAllData = () => {
    const { user } = storageUtil.getFromLocalStorage('session_info')

    educationEndpoints
      .getByUser(user.id)
      .then((res) => {
        const { educations } = res.data
        setEducations(educations)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const deleteEducation = (id) => {
    educationEndpoints
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setEducation((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = () => {
    const { user } = storageUtil.getFromLocalStorage('session_info')
    if (Object.values(education).some((educ) => !educ)) {
      toast.error('Todos los datos son obligatorios')
      return
    }

    educationEndpoints
      .save({
        ...education,
        UserId: user.id,
      })
      .then((res) => {
        const { message } = res.data
        toast.success(message)
        getAllData()
        setEducation(initialData)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getAllData()
  }, [])
  return (
    <main className="flex flex-col">
      <div className="w-full max-w-[1000px] flex flex-col">
        <div className="flex flex-col gap-5">
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="" className="text-lg font-semibold">
                Institución
              </label>
              <input
                type="text"
                name="institution"
                onChange={handleChange}
                value={education.institution}
                className="h-[60px] px-2 bg-gray-200 border border-gray-200 rounded-lg outline-none"
              />
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="" className="text-lg font-semibold">
                Título
              </label>
              <input
                type="text"
                name="degree_obtained"
                value={education.degree_obtained}
                onChange={handleChange}
                className="h-[60px] px-2 bg-gray-200 border border-gray-200 rounded-lg outline-none"
              />
            </div>
          </div>
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="" className="text-lg font-semibold">
                Fecha Inicio
              </label>
              <input
                type="date"
                name="start_date"
                onChange={handleChange}
                className="h-[60px] px-2 bg-gray-200 border border-gray-200 rounded-lg outline-none"
              />
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="" className="text-lg font-semibold">
                Fecha Fin
              </label>
              <input
                type="date"
                name="end_date"
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
          <h3 className="font-bold text-lg text-center py-5">Educación</h3>
          {educations.length > 0 ? (
            <div className="w-full flex flex-col">
              {educations.map((educ) => {
                return (
                  <div
                    className="py-5 flex flex-row justify-between items-center border-b border-gray-200"
                    key={educ.id}
                  >
                    <h3 className="flex-1 font-bold">{educ.institution}</h3>
                    <h4
                      className="flex-1 text-gray-500
                  "
                    >
                      {educ.degree_obtained}
                    </h4>
                    <button
                      className="px-3 py-1 bg-red-700 text-white"
                      onClick={() => deleteEducation(educ.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="w-full flex flex-col justify-center items-center py-5">
              <h3>Aún no tienes educación añadida</h3>
            </div>
          )}
        </div>
      </div>
      <Toaster richColors />
    </main>
  )
}

export default EducationTab
