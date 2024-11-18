import { VscRobot } from 'react-icons/vsc'
import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  FaClipboardList,
  FaCog,
  FaHistory,
  FaQuestionCircle,
} from 'react-icons/fa'
import { FaPaperPlane, FaUsers } from 'react-icons/fa6'
import { ChatbotContext } from '../../context/ChatbotContext'

const Home = () => {
  const { isOpen, inputText, setIsOpen, setInputText } =
    useContext(ChatbotContext)

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
            <NavLink
              className="flex items-center gap-3 py-4 hover:bg-gray-50 rounded-lg px-3"
              to={'/aplicaciones'}
            >
              <FaClipboardList className="text-xl text-gray-700" />
              <h4 className="text-base text-gray-800 font-medium">
                Mis postulaciones
              </h4>
              <div className="w-5 h-5 bg-[#00b4b7] rounded-full flex justify-center items-center ml-auto">
                <span className="text-white text-xs">4</span>
              </div>
            </NavLink>

            {/* Segunda opción */}
            <NavLink
              className="flex items-center gap-3 py-4 hover:bg-gray-50 rounded-lg px-3"
              to={'/mis_contactos'}
            >
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
            <NavLink
              className="flex items-center gap-3 py-4 hover:bg-gray-50 rounded-lg px-3"
              to={'/ajustes'}
            >
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
          <h1 className="text-2xl font-bold mb-4">Ofertas de Trabajo</h1>
          <p className="text-gray-700 mb-6">
            Aquí puedes explorar las ofertas de trabajo disponibles.
          </p>

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
                responsable de desarrollar nuevas características y mantener la
                plataforma actual.
              </p>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Publicado hace 2 días</p>
                <button className="px-6 py-2 text-sm text-white bg-[#00b4b7] rounded-md hover:bg-[#00a7a3] transition-colors">
                  Postularme
                </button>
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
                <p className="text-sm text-gray-500">Publicado hace 1 semana</p>
                <button className="px-6 py-2 text-sm text-white bg-[#00b4b7] rounded-md hover:bg-[#00a7a3] transition-colors">
                  Postularme
                </button>
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
                <button className="px-6 py-2 text-sm text-white bg-[#00b4b7] rounded-md hover:bg-[#00a7a3] transition-colors">
                  Postularme
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Aside Right */}
        <aside className="w-[350px] bg-white border border-gray-200 rounded-xl shadow-md p-6 max-h-auto h-fit">
          <h2 className="text-xl font-bold mb-4">Añadir a tu red</h2>

          <div className="space-y-6">
            {/* Perfil 1 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Perfil 1"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold">Juan Pérez</p>
                  <p className="text-xs text-gray-500">Desarrollador Web</p>
                </div>
              </div>
              <button className="px-4 py-1 text-sm text-white bg-[#00b4b7] rounded-md hover:bg-[#00a7a3] transition-colors">
                Seguir
              </button>
            </div>

            {/* Perfil 2 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Perfil 2"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold">Ana Gómez</p>
                  <p className="text-xs text-gray-500">Diseñadora Gráfica</p>
                </div>
              </div>
              <button className="px-4 py-1 text-sm text-white bg-[#00b4b7] rounded-md hover:bg-[#00a7a3] transition-colors">
                Seguir
              </button>
            </div>

            {/* Perfil 3 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://randomuser.me/api/portraits/men/54.jpg"
                  alt="Perfil 3"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold">Carlos Díaz</p>
                  <p className="text-xs text-gray-500">
                    Administrador de Sistemas
                  </p>
                </div>
              </div>
              <button className="px-4 py-1 text-sm text-white bg-[#00b4b7] rounded-md hover:bg-[#00a7a3] transition-colors">
                Seguir
              </button>
            </div>
          </div>

          {/* Texto para ver todas las recomendaciones */}
          <div className="mt-4 text-center text-sm text-gray-500">
            <p className="cursor-pointer text-[#00b4b7] hover:text-[#00a7a3] transition-colors">
              Ver todas las recomendaciones
            </p>
          </div>
        </aside>
      </div>

      {/* Chatbot button */}
      <button
        className="w-16 h-16 fixed bottom-4 right-4 bg-[#00b4b7] rounded-full flex justify-center items-center"
        onClick={setIsOpen}
      >
        <VscRobot className="text-white" size={37} />
      </button>

      {isOpen && (
        <div className="fixed bottom-16 right-4 w-80 h-96 bg-white border border-gray-300 rounded-lg shadow-lg animate-slide-up flex flex-col">
          {/* Encabezado del Chatbot */}
          <div className="bg-blue-500 text-white p-3 rounded-t-lg flex justify-between items-center">
            <span className="font-bold">Chatbot</span>
            <button
              onClick={setIsOpen}
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
              defaultValue={inputText}
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
