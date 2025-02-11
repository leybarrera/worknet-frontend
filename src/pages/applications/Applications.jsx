import { useEffect, useState } from 'react'
import Loader from '../../components/loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import LottieView from 'lottie-react'
import noData from '../../assets/no-data.json'
import { storageUtil } from '../../utils/index.utils'
import { toast, Toaster } from 'sonner'
import { applicationsAPI } from '../../api/applications/applications.api'
import { setApplications } from '../../redux/slices/applicants.slice'
import DetailPostulation from '../../components/modal/DetailPostulation'

const Applications = () => {
  const { applications } = useSelector((state) => state.applicants)
  const [isMounted, setIsMounted] = useState(false)
  const [showPostulationDetail, setShowPostulationDetail] = useState(false)
  const [application, setApplication] = useState(null)
  const [currentUser, setCurrentUser] = useState({})
  const dispatch = useDispatch()

  const onClose = () => {
    setShowPostulationDetail(false)
    getAllData()
  }

  const viewPostulationDetail = (current) => {
    setApplication(current)
    setShowPostulationDetail(true)
  }

  const renderApplication = (application) => {
    return (
      <div
        className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-xl p-4 hover:bg-gray-100 transition-colors"
        key={application.id}
      >
        <div className="flex items-center">
          <img
            src="https://randomuser.me/api/portraits/men/15.jpg"
            alt="Empresa"
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div className="flex flex-col gap-1">
            <p className="text-lg font-semibold">
              {application.JobOffer.title}
            </p>
            <div className="flex flex-row items-center gap-1">
              <p className="text-sm text-gray-500">
                {application.JobOffer.Company.name}
              </p>
              <p className="text-sm text-gray-500">-</p>
              <p className="text-sm text-gray-500">
                {application.JobOffer.location}
              </p>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Estado:{' '}
              <span className="text-green-600">{application.status}</span>
            </p>
          </div>
        </div>
        <button
          className="px-6 py-2 text-sm text-white bg-[#00b4b7] rounded-md hover:bg-[#00a7a3] transition-colors"
          onClick={() => viewPostulationDetail(application)}
        >
          Ver Detalles
        </button>
      </div>
    )
  }

  const getAllData = () => {
    const { id } = currentUser
    applicationsAPI
      .getByUser(id)
      .then((res) => {
        const { jobApplications } = res.data
        dispatch(setApplications(jobApplications))
      })
      .finally(() => {
        setIsMounted(true)
      })
  }

  useEffect(() => {
    if (currentUser) {
      getAllData()
    }
  }, [currentUser])

  useEffect(() => {
    const data = storageUtil.getFromLocalStorage('session_info')
    if (data) {
      const { user } = data
      setCurrentUser(user)
    }
  }, [])

  if (!isMounted) return <Loader text={'Cargando postulaciones...'} />
  return applications.length > 0 ? (
    <main className="flex-1 max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl shadow-md p-6">
      <h1 className="text-2xl font-bold mb-4">Mis Postulaciones</h1>
      <p className="text-gray-700 mb-6">
        Aquí puedes ver todas tus postulaciones, su estado y detalles
        importantes sobre ellas.
      </p>

      {/* Sección de trabajos postulados */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Trabajos a los que te postulaste
        </h2>
        <div className="space-y-4">
          {applications.map((application) => renderApplication(application))}
        </div>
      </section>

      {/* Sección opcional para agregar más postulaciones */}
      <section className="mt-8">
        <div className="text-center">
          <button className="px-6 py-2 text-sm text-white bg-[#00b4b7] rounded-md hover:bg-[#00a7a3] transition-colors">
            Ver Más Postulaciones
          </button>
        </div>
      </section>
      {showPostulationDetail && (
        <DetailPostulation application={application} onClose={onClose} />
      )}
      <Toaster richColors />
    </main>
  ) : (
    <div className="w-full h-full flex-1 flex flex-col justify-center items-center">
      <LottieView
        animationData={noData}
        autoPlay
        loop={true}
        style={{ width: '300px', height: '300px' }}
      />
      <h2 className="text-3xl font-semibold mt-4 text-gray-400 text-center">
        Aún no tienes registradas postulaciones.
      </h2>
      <Toaster richColors />
    </div>
  )
}

export default Applications
