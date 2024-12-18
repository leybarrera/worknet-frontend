import { VscRobot } from 'react-icons/vsc'
import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  FaClipboardList,
  FaCog,
  FaHistory,
  FaQuestionCircle,
} from 'react-icons/fa'
import { FaPaperPlane, FaUsers } from 'react-icons/fa6'
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

const Home = () => {
  const [hovered, setHovered] = useState(false)

  const { applications, contacts } = useSelector((state) => state.applicants)
  const { users } = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const [id, setId] = useState(null)
  const [currentUser, setCurrentUser] = useState({})
  const { isOpen, setIsOpen } = useContext(ChatbotContext)
  const { ofertas } = useSelector((state) => state.ofertas)

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
          console.log(connections)
          dispatch(setContacts(connections))
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
        <aside className="w-[350px] bg-white border border-[#00b4b7]/40 rounded-xl shadow-md">
          {/* Header */}
          <header className="flex flex-col items-center border-b border-[#00b4b7]/40 p-6">
            <div className="w-24 h-24 rounded-full bg-green-400 relative overflow-hidden">
              <img
                src="/public/profile.png"
                alt="Profile"
                className="w-full h-full object-cover absolute"
              />
            </div>
            <h3 className="font-bold text-xl mt-4">
              {currentUser.name} {currentUser.surname}
            </h3>
            <p className="text-sm text-gray-600">
              Desarrollador Web Full Stack
            </p>
          </header>

          {/* Additional Info */}
          <section className="px-6 py-4">
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <span className="font-semibold">Email:</span>{' '}
                {currentUser.email}
              </li>
              <li>
                <span className="font-semibold">Teléfono:</span> +593{' '}
                {currentUser.phone?.substring(1)}
              </li>
              <li>
                <span className="font-semibold">Ubicación:</span>{' '}
                {currentUser.location}
              </li>
            </ul>
          </section>

          {/* Navigation Links */}
          <nav className="px-6 py-4 border-t border-gray-200">
            {/* Primera opción */}
            {currentUser.role === 'Candidato' && (
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
            {currentUser.role === 'Candidato' && (
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

            {/* Historial */}
            <NavLink
              className="flex items-center gap-3 py-4 hover:bg-gray-50 rounded-lg px-3"
              to={'/'}
            >
              <FaHistory className="text-xl text-gray-700" />
              <h4 className="text-base text-gray-800 font-medium">Historial</h4>
            </NavLink>

            {/* Configuración */}
            {currentUser.role === 'Candidato' && (
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
        <main className="flex-1 max-h-auto h-fit bg-white border border-gray-200 rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">Ofertas de Trabajo</h1>
          <p className="text-gray-700 mb-6">
            Aquí puedes explorar las ofertas de trabajo disponibles.
          </p>

          {/* Condicional para mostrar el banner si no hay ofertas */}
          {ofertas.length !== 0 ? (
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
              {/* Oferta de trabajo 1 */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="text-lg font-semibold">
                      Desarrollador Full Stack
                    </p>
                    <p className="text-sm text-gray-500">
                      Empresa ABC - Quito, Ecuador
                    </p>
                  </div>
                  <span className="text-xs text-[#00b4b7] bg-[#e6fdfd] px-2 py-1 rounded-full">
                    Urgente
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Se busca un desarrollador Full Stack con experiencia en React,
                  Node.js y bases de datos SQL. La persona seleccionada será
                  responsable de desarrollar nuevas características y mantener
                  la plataforma actual.
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">Publicado hace 2 días</p>
                  {currentUser.role === 'Candidato' && (
                    <button className="px-6 py-2 text-sm text-white bg-[#00b4b7] rounded-md hover:bg-[#00a7a3] transition-colors">
                      Postularme
                    </button>
                  )}
                </div>
              </div>

              {/* Oferta de trabajo 2 */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="text-lg font-semibold">Diseñador UX/UI</p>
                    <p className="text-sm text-gray-500">
                      Empresa XYZ - Quito, Ecuador
                    </p>
                  </div>
                  <span className="text-xs text-[#00b4b7] bg-[#e6fdfd] px-2 py-1 rounded-full">
                    Nuevo
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Se busca diseñador UX/UI para trabajar en la mejora de la
                  experiencia de usuario de nuestras aplicaciones web. Requiere
                  experiencia en herramientas como Figma, Sketch, y Adobe XD.
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    Publicado hace 1 semana
                  </p>
                  {currentUser.role === 'Candidato' && (
                    <button className="px-6 py-2 text-sm text-white bg-[#00b4b7] rounded-md hover:bg-[#00a7a3] transition-colors">
                      Postularme
                    </button>
                  )}
                </div>
              </div>

              {/* Oferta de trabajo 3 */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="text-lg font-semibold">Community Manager</p>
                    <p className="text-sm text-gray-500">
                      Empresa 123 - Guayaquil, Ecuador
                    </p>
                  </div>
                  <span className="text-xs text-[#00b4b7] bg-[#e6fdfd] px-2 py-1 rounded-full">
                    Destacado
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Buscamos un community manager para gestionar nuestras redes
                  sociales. Es necesario tener experiencia en la creación de
                  contenido y análisis de métricas.
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">Publicado hace 3 días</p>
                  {currentUser.role === 'Candidato' && (
                    <button className="px-6 py-2 text-sm text-white bg-[#00b4b7] rounded-md hover:bg-[#00a7a3] transition-colors">
                      Postularme
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>

        <aside className="w-[350px] bg-white border border-gray-200 rounded-xl shadow-md p-6 max-h-auto h-fit">
          {currentUser.role === 'Candidato' ? (
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
