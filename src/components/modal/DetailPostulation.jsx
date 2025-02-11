import { useEffect } from 'react'
import { RiCloseCircleFill } from 'react-icons/ri'
import { applicationsAPI } from '../../api/applications/applications.api'
import { toast, Toaster } from 'sonner'

const DetailPostulation = ({ application, onClose }) => {
  const deletePostulation = (id) => {
    applicationsAPI
      .deleteApplication(id)
      .then((res) => {
        toast.success('Postulación eliminada con éxito')
        setTimeout(() => {
          onClose()
        }, 2500)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="absolute w-full h-full bg-black/80 left-0 top-0 z-50 flex flex-col justify-center items-center">
      <div className="bg-white w-[800px] rounded-lg flex flex-col overflow-hidden">
        <div className="py-5 px-5 flex flex-row items-center justify-between bg-[#00b4b7]">
          <h3 className="font-bold text-xl text-white uppercase">
            Detalle del trabajo
          </h3>
          <button onClick={onClose}>
            <RiCloseCircleFill size={35} color="white" />
          </button>
        </div>
        <div className="flex flex-col p-5">
          <div className="flex flex-col gap-5 mt-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                Titulo de la Oferta
              </label>
              <input
                type="text"
                value={application.JobOffer.title}
                className="h-[50px] px-3 bg-gray-200 text-gray-600"
              />
            </div>
            <div className="flex flex-row gap-2">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="" className="font-semibold">
                  Salario
                </label>
                <input
                  type="text"
                  value={application.JobOffer.salary}
                  className="h-[50px] px-3 bg-gray-200 text-gray-600"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="" className="font-semibold">
                  Contrato
                </label>
                <input
                  type="text"
                  value={application.JobOffer.job_type}
                  className="h-[50px] px-3 bg-gray-200 text-gray-600"
                />
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="" className="font-semibold">
                  Ubicación
                </label>
                <input
                  type="text"
                  value={application.JobOffer.location}
                  className="h-[50px] px-3 bg-gray-200 text-gray-600"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="" className="font-semibold">
                  Estudios
                </label>
                <input
                  type="text"
                  value={application.JobOffer.education_level}
                  className="h-[50px] px-3 bg-gray-200 text-gray-600"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                Descripción del puesto
              </label>
              <textarea
                type="text"
                value={application.JobOffer.description}
                className="h-[200px] px-3 bg-gray-200 text-gray-600 py-5 resize-none rounded-lg"
              />
            </div>
          </div>

          <button
            className="mt-5 py-3 rounded-lg bg-[#027d83] text-white font-bold text-lg hover:bg-[#086167] transition-colors"
            onClick={() => deletePostulation(application.id)}
          >
            Anular postulación
          </button>
        </div>
      </div>
      <Toaster richColors />
    </div>
  )
}

export default DetailPostulation
