import { useEffect, useState } from 'react'
import { RiCheckboxCircleFill, RiCloseCircleFill } from 'react-icons/ri'
import { TbPdf } from 'react-icons/tb'
import { NavLink } from 'react-router-dom'
import { resumeEndpoints } from '../../api/resume/resume.api'
import { applicationsAPI } from '../../api/applications/applications.api'
import { toast, Toaster } from 'sonner'

const PostulationModal = ({ toggleModal, postulation, onRefresh }) => {
  const [currentPostulation, setCurrentPostulation] = useState(null)
  const [resume, setResume] = useState(null)

  const deletePostulation = (id) => {
    applicationsAPI.deleteApplication(id).then((res) => {
      const { message } = res.data
      toast.success(message)
      setTimeout(() => {
        onRefresh()
      }, 2500)
    })
  }

  const rejectPostulation = (id) => {
    const { User, JobOffer } = currentPostulation
    const data = {
      email: User.email,
      name: `${User.name} ${User.surname}`,
      job_title: JobOffer.title,
    }

    applicationsAPI
      .rejectPostulation(id, data)
      .then((res) => {
        const { message } = res.data
        toast.success(message)
        setTimeout(() => {
          onRefresh()
        }, 2500)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const acceptPostulation = (id) => {
    const { User, JobOffer } = currentPostulation
    console.log(JobOffer)
    const data = {
      email: User.email,
      name: `${User.name} ${User.surname}`,
      job_title: JobOffer.title,
    }

    applicationsAPI
      .acceptPostulation(id, data)
      .then((res) => {
        const { message } = res.data
        toast.success(message)
        setTimeout(() => {
          onRefresh()
        }, 2500)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    setCurrentPostulation(postulation)
    const { User } = postulation
    resumeEndpoints.getByUser(User.id).then((res) => {
      const { resume } = res.data
      setResume(resume.file_url)
    })
  }, [postulation])
  return (
    <main className="absolute top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-black/50 py-10">
      <div className="w-[800px] h-full bg-white rounded-lg border border-gray-300 px-10 py-5 flex flex-col overflow-y-auto relative">
        {/* Detalle de la Oferta */}
        <div className="flex flex-col gap-2 mb-5">
          <h2 className="text-xl font-bold text-gray-800">
            Detalle de la Oferta
          </h2>
          <div className="flex flex-col mt-5">
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="grid grid-cols-1 gap-2">
                <h3 className="text-lg font-bold">Título</h3>
                <div className="border border-gray-200 rounded-lg bg-gray-100 text-gray-600 px-4 py-3">
                  <h5>{currentPostulation?.JobOffer.title}</h5>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <h3 className="text-lg font-bold">Tipo</h3>
                <div className="border border-gray-200 rounded-lg bg-gray-100 text-gray-600 px-4 py-3">
                  <h5>{currentPostulation?.JobOffer.job_type}</h5>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 mb-5">
              <h3 className="text-lg font-bold">Descripción</h3>
              <div className="border border-gray-200 rounded-lg px-4 py-3 h-[200px] text-gray-600 bg-gray-100 overflow-y-auto">
                <h5 className="text-justify">
                  {currentPostulation?.JobOffer.description}
                </h5>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="grid grid-cols-1 gap-2">
                <h3 className="text-lg font-bold">Ubicación</h3>
                <div className="border border-gray-200 rounded-lg bg-gray-100 text-gray-600 px-4 py-3">
                  <h5>{currentPostulation?.JobOffer.location}</h5>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <h3 className="text-lg font-bold">Estudios requeridos</h3>
                <div className="border border-gray-200 rounded-lg bg-gray-100 text-gray-600 px-4 py-3">
                  <h5>{currentPostulation?.JobOffer.education_level}</h5>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="grid grid-cols-1 gap-2">
                <h3 className="text-lg font-bold">Salario</h3>
                <div className="border border-gray-200 rounded-lg bg-gray-100 text-gray-600 px-4 py-3">
                  <h5>$ {currentPostulation?.JobOffer.salary}</h5>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <h3 className="text-lg font-bold">Fecha</h3>
                <div className="border border-gray-200 rounded-lg bg-gray-100 text-gray-600 px-4 py-3">
                  <h5>
                    {new Date(
                      currentPostulation?.JobOffer.posted_at
                    ).toLocaleDateString('es-ES')}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-gray-800">
              Detalle del candidato
            </h2>

            {resume && (
              <div className="flex flex-row items-center gap-2">
                <NavLink
                  to={resume}
                  target="__blank"
                  className="flex flex-row items-center gap-1 text-sm text-[#00B4B7] underline"
                >
                  <h4>Ver CV</h4>
                  <TbPdf />
                </NavLink>
              </div>
            )}
          </div>

          <div className="flex flex-col mt-5">
            <div className="flex flex-row items-center justify-center mb-10">
              {/* Imagen de perfil del usuario */}
              <div
                className="w-[150px] h-[150px] rounded-full border-2 border-gray-400 bg-red-400 relative overflow-hidden
              "
              >
                <img
                  src={
                    currentPostulation?.User.profile_picture
                      ? currentPostulation?.User.profile_picture
                      : '/public/men.png'
                  }
                  alt=""
                  className="absolute w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-5">
              <div className="grid grid-cols-1 gap-2">
                <h3 className="text-lg font-bold">Nombre</h3>
                <div className="border border-gray-200 rounded-lg bg-gray-100 text-gray-600 px-4 py-3">
                  <h5>
                    {currentPostulation?.User.name}{' '}
                    {currentPostulation?.User.surname}
                  </h5>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <h3 className="text-lg font-bold">DNI</h3>
                <div className="border border-gray-200 rounded-lg bg-gray-100 text-gray-600 px-4 py-3">
                  <h5>{currentPostulation?.User.dni}</h5>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-5">
              <div className="grid grid-cols-1 gap-2">
                <h3 className="text-lg font-bold">Teléfono</h3>
                <div className="border border-gray-200 rounded-lg bg-gray-100 text-gray-600 px-4 py-3">
                  <h5>{currentPostulation?.User.phone}</h5>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <h3 className="text-lg font-bold">Email</h3>
                <div className="border border-gray-200 rounded-lg bg-gray-100 text-gray-600 px-4 py-3">
                  <h5>{currentPostulation?.User.email}</h5>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-5">
              <div className="grid grid-cols-1 gap-2">
                <h3 className="text-lg font-bold">Género</h3>
                <div className="border border-gray-200 rounded-lg bg-gray-100 text-gray-600 px-4 py-3">
                  <h5>{currentPostulation?.User.gender}</h5>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <h3 className="text-lg font-bold">Domicilio</h3>
                <div className="border border-gray-200 rounded-lg bg-gray-100 text-gray-600 px-4 py-3">
                  <h5>{currentPostulation?.User.location}</h5>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1">
              <button
                className="py-2 bg-green-800 text-white rounded-lg flex flex-row items-center gap-2 justify-center font-bold"
                onClick={() => acceptPostulation(currentPostulation.id)}
              >
                <RiCheckboxCircleFill size={20} />
                <p>Aceptar</p>
              </button>
              <button
                className="py-2 bg-red-800 text-white rounded-lg flex flex-row items-center gap-2 justify-center font-bold"
                onClick={() => rejectPostulation(currentPostulation.id)}
              >
                <RiCloseCircleFill size={20} />
                <p>Rechazar</p>
              </button>
              <button
                className="py-2 bg-slate-900 text-white rounded-lg flex flex-row items-center gap-2 justify-center font-bold"
                onClick={() => deletePostulation(currentPostulation?.id)}
              >
                <p>Eliminar</p>
              </button>
            </div>
          </div>
        </div>

        <button
          className="absolute top-2 right-2 text-[#741D1D]"
          onClick={toggleModal}
        >
          <RiCloseCircleFill size={30} />
        </button>
      </div>

      <Toaster richColors />
    </main>
  )
}

export default PostulationModal
