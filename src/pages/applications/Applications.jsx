import { useEffect, useState } from 'react'
import Loader from '../../components/loader/Loader'
import { useSelector } from 'react-redux'
import LottieView from 'lottie-react'
import noData from '../../assets/no-data.json'

const Applications = () => {
  const { applications } = useSelector((state) => state.applicants)
  const [isMounted, setIsMounted] = useState(false)

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
          <div>
            <p className="text-lg font-semibold">Desarrollador Backend</p>
            <p className="text-sm text-gray-500">Empresa XYZ</p>
            <p className="text-sm text-gray-600 mt-2">
              Estado:{' '}
              <span className="text-green-600">Postulación enviada</span>
            </p>
          </div>
        </div>
        <button className="px-6 py-2 text-sm text-white bg-[#00b4b7] rounded-md hover:bg-[#00a7a3] transition-colors">
          Ver Detalles
        </button>
      </div>
    )
  }

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true)
    }, 3500)
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
    </div>
  )
}

export default Applications
