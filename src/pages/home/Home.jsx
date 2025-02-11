import { VscRobot } from 'react-icons/vsc'
import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  FaClipboardList,
  FaCog,
  FaHistory,
  FaQuestionCircle,
} from 'react-icons/fa'
import { FaPaperPlane, FaRectangleList, FaUsers } from 'react-icons/fa6'
import { ChatbotContext } from '../../context/ChatbotContext'
import { useDispatch, useSelector } from 'react-redux'
import { storageUtil } from '../../utils/index.utils'
import Chatbot from '../../components/chatbot/Chatbot'
import { toast, Toaster } from 'sonner'
import { applicationsAPI } from '../../api/applications/applications.api'
import {
  setApplications,
  setContacts,
} from '../../redux/slices/applicants.slice'
import { connectionAPI } from '../../api/connection/connection.api'
import { userEndpoints } from '../../api/user/user.api'
import { setUsers } from '../../redux/slices/users.slices'
import { offersAPI } from '../../api/ofertas/ofertas.api'
import { setOfertas } from '../../redux/slices/ofertas.slices'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { IoSchoolSharp } from 'react-icons/io5'

const Home = () => {
  const [hovered, setHovered] = useState(false)

  const { applications, contacts } = useSelector((state) => state.applicants)
  const { users } = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const [id, setId] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const { isOpen, setIsOpen } = useContext(ChatbotContext)
  const { ofertas } = useSelector((state) => state.ofertas)

  const applyOffer = (JobOfferId) => {
    const UserId = id
    applicationsAPI
      .applyOffer({
        UserId,
        JobOfferId,
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

  const cancelOffer = (JobOfferId) => {
    const UserId = id
    applicationsAPI
      .cancelOffer(UserId, JobOfferId)
      .then((res) => {
        const { message } = res.data
        toast.success(message)
        getAllData()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const isCandidate = (jobOfferId) => {
    const existApplication = applications.find((application) => {
      if (application.JobOfferId === jobOfferId && application.UserId === id) {
        return application
      }
    })
    return existApplication
  }

  const isFollowing = (id) => {
    const contactsID = contacts.map((contact) => contact.UserTargetId)
    return contactsID.includes(id)
  }

  const followUser = (user_id) => {
    const UserSourceId = id
    const UserTargetId = user_id

    connectionAPI
      .sendConnection({ UserSourceId, UserTargetId })
      .then((res) => {
        const { message } = res.data
        toast.success(message)
        getAllData()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const unfollowUser = (user_id) => {
    const UserSourceId = id
    const UserTargetId = user_id

    connectionAPI
      .removeConnection({ UserSourceId, UserTargetId })
      .then((res) => {
        const { message } = res.data
        toast.success(message)
        getAllData()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const renderOffer = (offer) => {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:bg-gray-100 transition-colors">
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="text-lg font-semibold">{offer.title}</p>
            <div className="flex flex-row items-center gap-1">
              <p className="text-sm text-gray-500">{offer.Company.name}</p>
              <p className="text-sm text-gray-500">-</p>
              <p className="text-sm text-gray-500">{offer.location}</p>
            </div>
          </div>
        </div>

        {/* Descripcion del puesto */}
        <div className="flex flex-col gap-1">
          {/* Salario */}
          <div className="flex flex-row items-center gap-2">
            <RiMoneyDollarCircleFill color="#4EB5B7" />
            <h3 className="font-semibold">Salario: </h3>
            <h5 className="text-sm text-gray-500">{offer.salary}</h5>
          </div>
          {/* Tipo de contrato */}
          <div className="flex flex-row items-center gap-2">
            <FaRectangleList color="#4EB5B7" />
            <h3 className="font-semibold">Tipo de contrato: </h3>
            <h5 className="text-sm text-gray-500">{offer.job_type}</h5>
          </div>
          {/* Educación requerida */}
          <div className="flex flex-row items-center gap-2">
            <IoSchoolSharp color="#4EB5B7" />
            <h3 className="font-semibold">Nivel de estudio: </h3>
            <h5 className="text-sm text-gray-500">{offer.education_level}</h5>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-3 py-5 border-y border-gray-200 mb-5">
          <h3 className="text-lg font-semibold">Descripción del puesto</h3>
          <p className="text-gray-600 text-sm mb-4">{offer.description}</p>
        </div>

        <div className="flex flex-row justify-between items-center">
          {/* <p className="text-sm text-gray-500">Publicado hace 2 días</p> */}
          {currentUser?.role === 'Candidato' &&
            (isCandidate(offer.id) ? (
              <button
                className="px-6 py-2 text-sm text-white bg-[#00b4b7] rounded-md hover:bg-[#00a7a3] transition-colors"
                onClick={() => cancelOffer(offer.id)}
              >
                Anular postulación
              </button>
            ) : (
              <button
                className="px-6 py-2 text-sm text-white bg-[#00b4b7] rounded-md hover:bg-[#00a7a3] transition-colors"
                onClick={() => applyOffer(offer.id)}
              >
                Postularme
              </button>
            ))}

          <div className="px-6 py-2 flex flex-row items-center gap-1 border border-[#00B4B7] rounded-md text-[#00B4B7] cursor-pointer hover:bg-[#00B4B7] transition-colors hover:text-white">
            <h3 className="text-sm font-semibold">Creado el: </h3>
            <h3 className="text-sm">
              {new Date(offer.posted_at).toLocaleDateString('es-ES')}
            </h3>
          </div>
        </div>
      </div>
    )
  }

  const getAllData = async () => {
    if (id !== null) {
      // Obtener todo de los usuarios
      applicationsAPI
        .getByUser(id)
        .then((res) => {
          const { jobApplications } = res.data
          dispatch(setApplications(jobApplications))
        })
        .catch((err) => {
          console.log(err)
        })

      connectionAPI
        .getByUser(id)
        .then((res) => {
          const { connections } = res.data
          dispatch(setContacts(connections))
        })
        .catch((err) => {
          console.log(err)
        })

      offersAPI
        .getAll()
        .then((res) => {
          const { jobOffers } = res.data
          console.log(jobOffers)
          dispatch(setOfertas(jobOffers))
        })
        .catch((err) => {
          console.log(err)
        })

      userEndpoints
        .getOtherUsers(id)
        .then((res) => {
          const { users } = res.data
          dispatch(setUsers(users))
        })
        .catch((err) => {
          console.log(err.message)
        })
    }
  }

  useEffect(() => {
    getAllData()
  }, [dispatch, id])

  useEffect(() => {
    const data = storageUtil.getFromLocalStorage('session_info')
    if (data) {
      const { user } = data
      setCurrentUser(user)
      setId(user.id)
    }
  }, [])
  return (
    <main className="relative w-full h-screen">
      <div className="flex gap-6">
        {/* Aside Left */}
        <aside className="w-[350px] bg-white border border-[#00b4b7]/40 rounded-xl shadow-md h-fit">
          {/* Header */}
          <header className="flex flex-col items-center border-b border-[#00b4b7]/40 p-6">
            <div className="w-24 h-24 rounded-full bg-green-400 relative overflow-hidden">
              <img
                src={
                  currentUser?.profile_picture
                    ? currentUser.profile_picture
                    : '/public/profile.png'
                }
                alt="Profile"
                className="w-full h-full object-cover absolute"
              />
            </div>
            <h3 className="font-bold text-xl mt-4 text-center">
              {currentUser?.name} {currentUser?.surname}
            </h3>
            <p className="text-sm text-gray-600">{currentUser?.email}</p>
          </header>

          {/* Additional Info */}
          <section className="px-6 py-4">
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <span className="font-semibold">Teléfono:</span> +593{' '}
                {currentUser?.phone?.substring(1)}
              </li>
              <li>
                <span className="font-semibold">Ubicación:</span>{' '}
                {currentUser?.location}
              </li>
            </ul>
          </section>

          {/* Navigation Links */}
          <nav className="px-6 py-4 border-t border-gray-200">
            {/* Primera opción */}
            {currentUser?.role === 'Candidato' && (
              <NavLink
                className="flex items-center gap-3 py-4 hover:bg-gray-50 rounded-lg px-3"
                to={'/aplicaciones'}
              >
                <FaClipboardList className="text-xl text-gray-700" />
                <h4 className="text-base text-gray-800 font-medium">
                  Mis postulaciones
                </h4>
                <div className="w-5 h-5 bg-[#00b4b7] rounded-full flex justify-center items-center ml-auto">
                  <span className="text-white text-xs">
                    {applications.length}
                  </span>
                </div>
              </NavLink>
            )}

            {/* Segunda opción */}
            {currentUser?.role === 'Candidato' && (
              <NavLink
                className="flex items-center gap-3 py-4 hover:bg-gray-50 rounded-lg px-3"
                to={'/mis_contactos'}
              >
                <FaUsers className="text-xl text-gray-700" />
                <h4 className="text-base text-gray-800 font-medium">
                  Mis contactos
                </h4>
                <div className="w-5 h-5 bg-[#00b4b7] rounded-full flex justify-center items-center ml-auto">
                  <span className="text-white text-xs">{contacts.length}</span>
                </div>
              </NavLink>
            )}

            {/* Configuración */}
            {currentUser?.role === 'Candidato' && (
              <NavLink
                className="flex items-center gap-3 py-4 hover:bg-gray-50 rounded-lg px-3"
                to={'/ajustes'}
              >
                <FaCog className="text-xl text-gray-700" />
                <h4 className="text-base text-gray-800 font-medium">
                  Configuración
                </h4>
              </NavLink>
            )}

            {/* Ayuda */}
            <NavLink
              className="flex items-center gap-3 py-4 hover:bg-gray-50 rounded-lg px-3"
              to={'/'}
            >
              <FaQuestionCircle className="text-xl text-gray-700" />
              <h4 className="text-base text-gray-800 font-medium">Ayuda</h4>
            </NavLink>

            {/* Enviar sugerencia */}
            <NavLink
              className="flex items-center gap-3 py-4 hover:bg-gray-50 rounded-lg px-3"
              to={'/'}
            >
              <FaPaperPlane className="text-xl text-gray-700" />
              <h4 className="text-base text-gray-800 font-medium">
                Enviar sugerencia
              </h4>
            </NavLink>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 max-h-auto h-fit bg-white border border-gray-200 rounded-xl shadow-md p-6 mb-10">
          <h1 className="text-2xl font-bold mb-4">Ofertas de Trabajo</h1>
          <p className="text-gray-700 mb-2">
            Aquí puedes explorar las ofertas de trabajo disponibles.
          </p>

          {/* Condicional para mostrar el banner si no hay ofertas */}
          {ofertas.length === 0 ? (
            <div className="bg-[#e6fdfd] border border-[#00b4b7] rounded-xl p-6 text-center text-[#00b4b7]">
              <div className="mb-4">
                <i className="fas fa-exclamation-triangle text-4xl text-[#00b4b7]"></i>
              </div>
              <h2 className="text-xl font-semibold mb-2">
                No hay ofertas de trabajo disponibles
              </h2>
              <p className="text-sm">
                Actualmente no hay ofertas de trabajo. Te invitamos a volver más
                tarde.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {ofertas.map((oferta) => renderOffer(oferta))}
            </div>
          )}
        </main>

        <aside className="w-[350px] bg-white border border-gray-200 rounded-xl shadow-md p-6 max-h-auto h-fit">
          {currentUser?.role === 'Candidato' ? (
            <h2 className="text-xl font-bold mb-4">Añadir a tu red</h2>
          ) : (
            <h2 className="text-xl font-bold mb-4">Buscan trabajo</h2>
          )}

          {/* Si no hay usuarios, mostramos el banner */}
          {users.length === 0 ? (
            <div className="flex items-center justify-center bg-[#e6fdfd] text-[#00b4b7] border border-[#00b4b7] rounded-lg p-4">
              <p className="text-center text-sm font-semibold">
                No hay recomendaciones disponibles
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        user.profilePicture ||
                        'https://randomuser.me/api/portraits/men/32.jpg'
                      } // Suponiendo que cada usuario tiene una imagen de perfil
                      alt={`Perfil ${user.name}`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                  </div>
                  {isFollowing(user.id) ? (
                    <button
                      className={`px-4 py-1 text-sm   rounded-md  transition-all  ${
                        hovered
                          ? 'bg-[#f00] text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                      onClick={() => unfollowUser(user.id)}
                    >
                      {hovered ? 'Dejar de seguir' : 'Siguiendo'}
                    </button>
                  ) : (
                    <button
                      className="px-4 py-1 text-sm text-white bg-[#00b4b7] rounded-md hover:bg-[#00a7a3] transition-colors"
                      onClick={() => followUser(user.id)}
                    >
                      Seguir
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Texto para ver todas las recomendaciones */}

          {users.length > 5 && (
            <div className="mt-4 text-center text-sm text-gray-500">
              <p className="cursor-pointer text-[#00b4b7] hover:text-[#00a7a3] transition-colors">
                Ver todas las recomendaciones
              </p>
            </div>
          )}
        </aside>
      </div>

      {/* Chatbot button */}
      <button
        className="w-16 h-16 fixed bottom-4 right-4 bg-[#00b4b7] rounded-full flex justify-center items-center"
        onClick={setIsOpen}
      >
        <VscRobot className="text-white" size={37} />
      </button>

      <Toaster richColors />
      {isOpen && <Chatbot setIsOpen={setIsOpen} />}
    </main>
  )
}

export default Home
