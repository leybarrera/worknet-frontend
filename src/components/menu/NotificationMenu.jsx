import { IoIosNotifications } from 'react-icons/io'

const NotificationMenu = ({ closeAllMenus }) => {
  return (
    <>
      <div className="absolute w-[300px] bg-white right-0 mt-2 rounded-lg border border-gray-300 shadow-xl z-50">
        <div className="p-4 border-b">
          <h3 className="text-gray-700 text-sm font-semibold">
            Notificaciones
          </h3>
        </div>
        <ul className="max-h-60 overflow-y-auto">
          {/* Notification Item 1 */}
          <li className="px-4 py-3 flex items-start gap-3 hover:bg-gray-100 transition-all duration-300">
            <div className="w-8 h-8 rounded-full bg-[#00b4b7] flex justify-center items-center text-white">
              <IoIosNotifications size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-700">
                Tienes un nuevo mensaje de{' '}
                <span className="font-semibold">Juan Pérez</span>.
              </p>
              <span className="text-xs text-gray-500">Hace 2 horas</span>
            </div>
          </li>
          {/* Notification Item 2 */}
          <li className="px-4 py-3 flex items-start gap-3 hover:bg-gray-100 transition-all duration-300">
            <div className="w-8 h-8 rounded-full bg-[#00b4b7] flex justify-center items-center text-white">
              <IoIosNotifications size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-700">
                Tu pedido ha sido enviado.{' '}
                <span className="font-semibold">#12345</span>.
              </p>
              <span className="text-xs text-gray-500">Hace 1 día</span>
            </div>
          </li>
          {/* Notification Item 3 */}
          <li className="px-4 py-3 flex items-start gap-3 hover:bg-gray-100 transition-all duration-300">
            <div className="w-8 h-8 rounded-full bg-[#00b4b7] flex justify-center items-center text-white">
              <IoIosNotifications size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-700">
                Recordatorio: Reunión programada para mañana.
              </p>
              <span className="text-xs text-gray-500">Hace 3 días</span>
            </div>
          </li>
        </ul>
        <div className="p-4 text-center">
          <button className="text-[#00b4b7] text-sm hover:underline">
            Ver todas las notificaciones
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

export default NotificationMenu
