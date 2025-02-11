import { useContext, useEffect, useMemo, useState } from 'react'
import { AiFillMessage } from 'react-icons/ai'
import { FaMicrophone } from 'react-icons/fa6'
import { IoIosBriefcase, IoIosNotifications, IoMdLogOut } from 'react-icons/io'
import {
  RiAdminFill,
  RiHome5Fill,
  RiMenuFill,
  RiSearchLine,
  RiMic2Fill,
} from 'react-icons/ri'
import { ChatbotContext } from '../../context/ChatbotContext'
import { NavLink, useNavigate } from 'react-router-dom'
import { ProfileMenu, MessageMenu, NotificationMenu } from '../menu/index.menu'
import { storageUtil } from '../../utils/index.utils'

const Nav = () => {
  const [currentUser, setCurrentUser] = useState({})
  const navigate = useNavigate()
  const { setIsOpen, setInputText } = useContext(ChatbotContext)
  const [isListening, setIsListening] = useState(false) // Estado para controlar si está escuchando
  const [isOpenProfileMenu, setIsOpenProfileMenu] = useState(false)
  const [isOpenNotifications, setIsOpenNotifications] = useState(false)
  const [isOpenMessages, setIsOpenMessages] = useState(false)

  // Crear la instancia de SpeechRecognition fuera de useEffect
  const recognition = useMemo(
    () => new (window.SpeechRecognition || window.webkitSpeechRecognition)(),
    []
  )

  const toggleProfileMenu = () => {
    setIsOpenProfileMenu(!isOpenProfileMenu)
    setIsOpenMessages(false)
    setIsOpenNotifications(false)
  }

  const toggleNotifications = () => {
    setIsOpenNotifications(!isOpenNotifications)
    setIsOpenMessages(false)
    setIsOpenProfileMenu(false)
  }

  const toggleMessages = () => {
    setIsOpenMessages(!isOpenMessages)
    setIsOpenProfileMenu(false)
    setIsOpenNotifications(false)
  }

  recognition.lang = 'es-ES'
  recognition.interimResults = false
  recognition.continuous = true

  useEffect(() => {
    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript
        .trim()
        .toLowerCase()

      console.log(transcript)
      // Comando para abrir el chatbot
      if (transcript === 'abrir chatbot') {
        setIsOpen(true)
      }

      if (transcript === 'contactos' || transcript === 'mis contactos') {
        navigate('/mis_contactos')
      }

      if (
        transcript === 'postulaciones' ||
        transcript === 'mis postulaciones'
      ) {
        navigate('/aplicaciones')
      }

      if (transcript === 'inicio') {
        navigate('/')
      }

      if (transcript === 'ajustes') {
        navigate('/ajustes')
      }

      if (transcript === 'cerrar sesión') {
        storageUtil.removeStorage('session_info')
        navigate('/inicio_sesion')
      }

      // Comando para cerrar el chatbot
      else if (transcript === 'cerrar chatbot') {
        setIsOpen(false)
      }

      // Si el chatbot está abierto, dictar texto para el input
      if (
        transcript &&
        transcript !== 'abrir chatbot' &&
        transcript !== 'cerrar chatbot'
      ) {
        setInputText(transcript)
      }

      // Comando para enviar el texto
      else if (transcript === 'enviar') {
        // Aquí, el componente de Home manejaría el envío del mensaje.
      }
    }

    recognition.onerror = (error) => {
      console.error('Error en el reconocimiento de voz:', error)
    }

    // Limpiar el reconocimiento cuando el componente se desmonte
    return () => {
      recognition.stop()
    }
  }, [setIsOpen, setInputText, recognition])

  const toggleListening = () => {
    if (isListening) {
      recognition.stop() // Detener el reconocimiento si ya está escuchando
    } else {
      recognition.start() // Iniciar el reconocimiento
    }
    setIsListening(!isListening) // Cambiar el estado del micrófono
  }

  const closeAllMenus = () => {
    setIsOpenProfileMenu(false)
    setIsOpenNotifications(false)
    setIsOpenMessages(false)
  }

  useEffect(() => {
    const data = storageUtil.getFromLocalStorage('session_info')
    if (data) {
      const { user } = data
      setCurrentUser(user)
    }
  }, [])

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-[#00b4b7] shadow-md z-50">
      <div className="w-3/4 mx-auto h-full flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center gap-4 ">
          {/* Menu Button */}
          <button className="p-2 rounded-full hover:bg-[#009ea0] transition-all duration-300">
            <RiMenuFill className="text-white" size={24} />
          </button>

          {/* Search Bar */}
          <div className="flex bg-white h-10 min-w-[400px] max-w-[600px] rounded-full overflow-hidden shadow-sm">
            <input
              className="flex-1 outline-none px-4 text-sm text-gray-600 placeholder-gray-400"
              type="text"
              placeholder="Buscar"
            />
            <button className="w-12 flex justify-center items-center bg-[#f3f3f3] hover:bg-[#e0e0e0] transition-all duration-300">
              <RiSearchLine size={18} className="text-gray-500" />
            </button>
          </div>

          {/* Microphone Button */}
          <button
            className="w-10 h-10 rounded-full bg-white flex justify-center items-center shadow-md hover:shadow-lg hover:bg-[#f3f3f3] transition-all duration-300"
            onClick={toggleListening}
          >
            <RiMic2Fill className="text-[#00b4b7]" size={18} />
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Navigation Icons */}
          <div className="flex gap-3">
            <NavLink
              to={currentUser.role === 'Candidato' ? '/' : '/empresa-home'}
              className="w-10 h-10 rounded-full bg-white flex justify-center items-center shadow-md hover:shadow-lg hover:bg-[#f3f3f3] transition-all duration-300"
            >
              <RiHome5Fill size={20} className="text-[#00b4b7]" />
            </NavLink>
            {currentUser.role === 'Administrador' && (
              <NavLink
                className="w-10 h-10 rounded-full bg-white flex justify-center items-center shadow-md hover:shadow-lg hover:bg-[#f3f3f3] transition-all duration-300"
                to={'/dashboard'}
              >
                <RiAdminFill size={20} className="text-[#00b4b7]" />
              </NavLink>
            )}

            <div className="relative">
              {/* Message Button */}
              <button
                className="w-10 h-10 rounded-full bg-white flex justify-center items-center shadow-md hover:shadow-lg hover:bg-[#f3f3f3] transition-all duration-300"
                onClick={toggleMessages}
              >
                <AiFillMessage size={20} className="text-[#00b4b7]" />
              </button>

              {isOpenMessages && <MessageMenu closeAllMenus={closeAllMenus} />}
            </div>

            <div className="relative">
              {/* Notification Button */}
              <button
                className="w-10 h-10 rounded-full bg-white flex justify-center items-center shadow-md hover:shadow-lg hover:bg-[#f3f3f3] transition-all duration-300"
                onClick={toggleNotifications}
              >
                <IoIosNotifications size={20} className="text-[#00b4b7]" />
              </button>

              {isOpenNotifications && (
                <NotificationMenu closeAllMenus={closeAllMenus} />
              )}
            </div>
          </div>

          {/* Profile Picture */}
          <div className="relative">
            {/* Profile Button */}
            <button
              className="w-10 h-10 rounded-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              onClick={toggleProfileMenu}
            >
              <img
                src={
                  currentUser?.profile_picture
                    ? currentUser.profile_picture
                    : '/public/profile.png'
                }
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </button>
            {isOpenProfileMenu && <ProfileMenu closeAllMenus={closeAllMenus} />}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
