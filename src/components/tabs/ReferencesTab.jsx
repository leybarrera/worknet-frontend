import { useEffect, useState } from 'react'
import { storageUtil } from '../../utils/index.utils'
import { referencesAPI } from '../../api/references/references.api'
import { toast, Toaster } from 'sonner'

const ReferencesTab = () => {
  const initialData = {
    name: '',
    email: '',
    phone: '',
    relationship: '',
  }

  const [reference, setReference] = useState(initialData)

  const [references, setReferences] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setReference((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleSave = () => {
    const { user } = storageUtil.getFromLocalStorage('session_info')
    if (Object.values(reference).some((educ) => educ === '')) {
      toast.error('Todos los datos son obligatorios')
      return
    }

    referencesAPI
      .saveReference({
        ...reference,
        UserId: user.id,
      })
      .then((res) => {
        const { message } = res.data
        toast.success(message)
        getAllData()
        setReference(initialData)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getAllData = () => {
    const { user } = storageUtil.getFromLocalStorage('session_info')
    referencesAPI
      .getByUser(user.id)
      .then((res) => {
        const { references } = res.data
        setReferences(references)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const deleteReference = (id) => {
    referencesAPI.deleteReference(id).then((res) => {
      const { message } = res.data
      toast.success(message)
      getAllData()
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
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="" className="text-lg font-semibold">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={reference.name}
                className="h-[60px] px-2 bg-gray-200 border border-gray-200 rounded-lg outline-none"
              />
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="" className="text-lg font-semibold">
                Email
              </label>
              <input
                type="text"
                name="email"
                onChange={handleChange}
                value={reference.email}
                className="h-[60px] px-2 bg-gray-200 border border-gray-200 rounded-lg outline-none"
              />
            </div>
          </div>
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="" className="text-lg font-semibold">
                Teléfono
              </label>
              <input
                type="text"
                name="phone"
                onChange={handleChange}
                value={reference.phone}
                className="h-[60px] px-2 bg-gray-200 border border-gray-200 rounded-lg outline-none"
              />
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="" className="text-lg font-semibold">
                Relación
              </label>
              <input
                type="text"
                name="relationship"
                onChange={handleChange}
                value={reference.relationship}
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
          {references.length > 0 ? (
            <div className="w-full flex flex-col">
              {references.map((wk) => {
                return (
                  <div
                    className="py-5 flex flex-row justify-between items-center border-b border-gray-200"
                    key={wk.id}
                  >
                    <h3 className="flex-1 font-bold">{wk.name}</h3>
                    <h4
                      className="flex-1 text-gray-500
                  "
                    >
                      {wk.email}
                    </h4>
                    <h4
                      className="flex-1 text-gray-500
                  "
                    >
                      {wk.phone}
                    </h4>
                    <button
                      className="px-3 py-1 bg-red-700 text-white"
                      onClick={() => deleteReference(wk.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="w-full flex flex-col justify-center items-center py-5">
              <h3>Aún no tienes referencias añadidas</h3>
            </div>
          )}
        </div>
      </div>
      <Toaster richColors />
    </main>
  )
}

export default ReferencesTab
