const MessageMenu = ({ closeAllMenus }) => {
  return (
    <>
      <div className="absolute w-[350px] bg-white right-0 mt-2 rounded-lg border border-gray-300 shadow-xl z-50 transition-all duration-300">
        <div className="p-4 border-b">
          <h3 className="text-gray-700 text-sm font-semibold">Mensajes</h3>
        </div>
        <ul className="max-h-60 overflow-y-auto">
          {/* Message Item 1 */}
          <li className="px-4 py-3 flex items-start gap-3 hover:bg-gray-100 transition-all duration-300">
            <img
              src="/public/profile1.png"
              alt="User 1"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm text-gray-700 font-semibold">Ana Gómez</p>
              <p className="text-xs text-gray-500">¿Estás disponible mañana?</p>
              <span className="text-xs text-gray-400">Hace 5 min</span>
            </div>
          </li>
          {/* Message Item 2 */}
          <li className="px-4 py-3 flex items-start gap-3 hover:bg-gray-100 transition-all duration-300">
            <img
              src="/public/profile2.png"
              alt="User 2"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm text-gray-700 font-semibold">Carlos Ruiz</p>
              <p className="text-xs text-gray-500">¡Gracias por tu ayuda!</p>
              <span className="text-xs text-gray-400">Hace 2 horas</span>
            </div>
          </li>
          {/* Message Item 3 */}
          <li className="px-4 py-3 flex items-start gap-3 hover:bg-gray-100 transition-all duration-300">
            <img
              src="/public/profile3.png"
              alt="User 3"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm text-gray-700 font-semibold">Luis Pérez</p>
              <p className="text-xs text-gray-500">¿Revisaste el documento?</p>
              <span className="text-xs text-gray-400">Hace 1 día</span>
            </div>
          </li>
        </ul>
        <div className="p-4 text-center">
          <button className="text-[#00b4b7] text-sm hover:underline">
            Ver todos los mensajes
          </button>
        </div>
      </div>

      <div
        className="fixed bg-green-400 w-full h-full left-0 bg-transparent"
        onClick={closeAllMenus}
      />
    </>
  )
}

export default MessageMenu
