import { useEffect, useState } from 'react'
import { RiCloseCircleFill } from 'react-icons/ri'
import { offersAPI } from '../../api/ofertas/ofertas.api'

const AddJobOffer = ({
  toggleModal,
  company_id,
  success_update,
  error_update,
  incompletedOffer,
}) => {
  const initialState = {
    title: '',
    description: '',
    location: '',
    job_type: '',
    salary: '',
    education_level: '',
    CompanyId: company_id,
  }

  const [isSaving, setIsSaving] = useState(false)
  const [data, setData] = useState(initialState)
  const handleChange = (e) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (Object.values(data).some((value) => value === '')) {
      incompletedOffer()
      return
    }
    setIsSaving(true)

    console.log(data)

    offersAPI
      .create(data)
      .then((res) => {
        setData(initialState)
        success_update()
        setTimeout(() => {
          toggleModal()
        }, 1500)
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsSaving(false)
      })
  }

  return (
    <div className="absolute w-full h-full top-0 left-0 z-50 flex justify-center items-center bg-black/50">
      <div className="bg-white w-[1200px] h-[700px] relative rounded-2xl">
        <button className="absolute top-3 right-3" onClick={toggleModal}>
          <RiCloseCircleFill size={35} color="#00b4b7" />
        </button>

        {/* Formulario */}
        <form
          action=""
          className="mt-12 flex flex-col gap-5 px-10"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-lg font-bold">
              Título de la Oferta
            </label>
            <input
              value={data.title}
              onChange={handleChange}
              type="text"
              name="title"
              className="w-full border border-gray-200 py-3 rounded-lg bg-gray-100 text-gray-600 px-4 outline-[#00b4b7]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-lg font-bold">
              Descripción
            </label>
            <textarea
              className="w-full border border-gray-200 py-3 rounded-lg bg-gray-100 text-gray-600 px-4 outline-[#00b4b7] h-[200px] resize-none"
              name="description"
              value={data.description}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-lg font-bold">
                Ubicación
              </label>
              <input
                type="text"
                name="location"
                value={data.location}
                onChange={handleChange}
                className="w-full border border-gray-200 py-3 rounded-lg bg-gray-100 text-gray-600 px-4 outline-[#00b4b7]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-lg font-bold">
                Tipo de Contrato
              </label>
              <div className="flex w-full bg-gray-100 rounded-lg overflow-hidden focus-within:border-[#00b4b7] border">
                <select
                  className="w-full px-4 py-3 text-gray-600 outline-none text-base bg-gray-100"
                  onChange={handleChange}
                  name="job_type"
                >
                  <option selected disabled>
                    Seleccione el tipo
                  </option>
                  <option value="Tiempo completo">Tiempo completo</option>
                  <option value="Medio tiempo">Medio tiempo</option>
                  <option value="Contrato">Contrato</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Practicante">Practicante</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-lg font-bold">
                Estudios requeridos
              </label>
              <div className="flex w-full bg-gray-100 rounded-lg overflow-hidden focus-within:border-[#00b4b7] border">
                <select
                  className="w-full px-4 py-3 text-gray-600 outline-none text-base bg-gray-100"
                  onChange={handleChange}
                  name="education_level"
                >
                  <option selected disabled>
                    Seleccione el nivel de estudios
                  </option>
                  <option value="Primaria">Primaria</option>
                  <option value="Secundaria">Secundaria</option>
                  <option value="Técnico">Técnico</option>
                  <option value="Tecnológico">Tecnológico</option>
                  <option value="Universitario">Universitario</option>
                  <option value="Postgrado">Postgrado</option>
                  <option value="Doctorado">Doctorado</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-lg font-bold">
                Salario
              </label>
              <input
                type="number"
                name="salary"
                value={data.salary}
                onChange={handleChange}
                className="w-full border border-gray-200 py-3 rounded-lg bg-gray-100 text-gray-600 px-4 outline-[#00b4b7]"
              />
            </div>
          </div>

          <button
            className={`mt-3 w-full  text-white py-3 rounded-lg text-lg font-bold flex flex-row items-center gap-2 justify-center ${
              isSaving ? 'bg-gray-400' : 'bg-[#00b4b7]'
            }`}
            disabled={isSaving}
          >
            {isSaving && (
              <div className="w-6 h-6 rounded-full border-4 border-dotted border-b-white/30 animate-spin" />
            )}
            <p>{isSaving ? 'Generando' : 'Generar Oferta'}</p>
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddJobOffer
