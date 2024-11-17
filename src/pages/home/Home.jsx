import { VscRobot } from 'react-icons/vsc'
import { Nav } from '../../components/index.components'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  FaClipboardList,
  FaCog,
  FaHistory,
  FaQuestionCircle,
} from 'react-icons/fa'
import { FaPaperPlane, FaUsers } from 'react-icons/fa6'

const Home = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleChatbot = () => {
    setIsOpen(!isOpen)
  }
  return (
    <main className="relative w-full h-screen">
      <Nav />
      <div className="w-3/4 mx-auto pt-20 flex gap-6">
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
            <h3 className="font-bold text-xl mt-4">Edison Barrera</h3>
            <p className="text-sm text-gray-600">
              Desarrollador Web Full Stack
            </p>
          </header>

          {/* Additional Info */}
          <section className="px-6 py-4">
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <span className="font-semibold">Email:</span> edison@example.com
              </li>
              <li>
                <span className="font-semibold">Teléfono:</span> +593 123 456
                789
              </li>
              <li>
                <span className="font-semibold">Ubicación:</span> Quito, Ecuador
              </li>
            </ul>
          </section>

          {/* Navigation Links */}
          <nav className="px-6 py-4 border-t border-gray-200">
            {/* Primera opción */}
            <NavLink className="flex items-center gap-3 py-4 hover:bg-gray-50 rounded-lg px-3">
              <FaClipboardList className="text-xl text-gray-700" />
              <h4 className="text-base text-gray-800 font-medium">
                Mis postulaciones
              </h4>
              <div className="w-5 h-5 bg-[#00b4b7] rounded-full flex justify-center items-center ml-auto">
                <span className="text-white text-xs">4</span>
              </div>
            </NavLink>

            {/* Segunda opción */}
            <NavLink className="flex items-center gap-3 py-4 hover:bg-gray-50 rounded-lg px-3">
              <FaUsers className="text-xl text-gray-700" />
              <h4 className="text-base text-gray-800 font-medium">
                Mis contactos
              </h4>
              <div className="w-5 h-5 bg-[#00b4b7] rounded-full flex justify-center items-center ml-auto">
                <span className="text-white text-xs">4</span>
              </div>
            </NavLink>

            {/* Historial */}
            <NavLink className="flex items-center gap-3 py-4 hover:bg-gray-50 rounded-lg px-3">
              <FaHistory className="text-xl text-gray-700" />
              <h4 className="text-base text-gray-800 font-medium">Historial</h4>
            </NavLink>

            {/* Configuración */}
            <NavLink className="flex items-center gap-3 py-4 hover:bg-gray-50 rounded-lg px-3">
              <FaCog className="text-xl text-gray-700" />
              <h4 className="text-base text-gray-800 font-medium">
                Configuración
              </h4>
            </NavLink>

            {/* Ayuda */}
            <NavLink className="flex items-center gap-3 py-4 hover:bg-gray-50 rounded-lg px-3">
              <FaQuestionCircle className="text-xl text-gray-700" />
              <h4 className="text-base text-gray-800 font-medium">Ayuda</h4>
            </NavLink>

            {/* Enviar sugerencia */}
            <NavLink className="flex items-center gap-3 py-4 hover:bg-gray-50 rounded-lg px-3">
              <FaPaperPlane className="text-xl text-gray-700" />
              <h4 className="text-base text-gray-800 font-medium">
                Enviar sugerencia
              </h4>
            </NavLink>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 bg-white border border-gray-200 rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">Bienvenido a tu panel</h1>
          <p className="text-gray-700">
            Aquí puedes gestionar tus postulaciones y contactos.
          </p>
        </main>

        {/* Aside Right */}
        <aside className="w-[350px] bg-white border border-gray-200 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Información Adicional</h2>
          <p className="text-sm text-gray-700">
            Aquí puedes agregar más secciones, como notificaciones, mensajes o
            actividades recientes.
          </p>
        </aside>
      </div>

      {/* Chatbot button */}
      <button
        className="w-16 h-16 fixed bottom-4 right-4 bg-[#00b4b7] rounded-full flex justify-center items-center"
        onClick={toggleChatbot}
      >
        <VscRobot className="text-white" size={37} />
      </button>

      {isOpen && (
        <div className="fixed bottom-16 right-4 w-80 h-96 bg-white border border-gray-300 rounded-lg shadow-lg animate-slide-up flex flex-col">
          {/* Encabezado del Chatbot */}
          <div className="bg-blue-500 text-white p-3 rounded-t-lg flex justify-between items-center">
            <span className="font-bold">Chatbot</span>
            <button
              onClick={toggleChatbot}
              className="text-white hover:text-gray-200"
              aria-label="Cerrar chatbot"
            >
              ✖
            </button>
          </div>

          {/* Contenedor de Mensajes con Scroll */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            {/* Mensaje del Bot */}
            <div className="bg-gray-100 p-3 rounded-md shadow-sm text-sm">
              👋 ¡Hola! ¿En qué puedo ayudarte?
            </div>
            {/* Respuesta del Usuario */}
            <div className="bg-blue-500 text-white p-3 rounded-md shadow-sm text-sm self-end">
              ¿Qué servicios ofreces?
            </div>
            {/* Respuesta del Bot */}
            <div className="bg-gray-100 p-3 rounded-md shadow-sm text-sm">
              Ofrezco ayuda en consultas generales y soporte técnico. 😊
            </div>
          </div>

          {/* Input del Chat */}
          <div className="p-3 border-t border-gray-200 flex items-center">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              className="flex-1 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-all">
              ➤
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

export default Home
