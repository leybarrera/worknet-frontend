import { IoIosBusiness } from 'react-icons/io'
import {
  RiBriefcase4Fill,
  RiFileList3Fill,
  RiCustomerService2Fill,
  RiBarChartFill,
  RiSettings3Fill,
} from 'react-icons/ri'
import { NavLink, useNavigate } from 'react-router-dom'
import { storageUtil } from '../utils/index.utils'

const Sidebar = () => {
  const navigate = useNavigate()

  const closeSession = () => {
    storageUtil.removeStorage('session_info')
    setTimeout(() => {
      navigate('/inicio_sesion')
    }, 1500)
  }
  return (
    <aside className="fixed w-[300px] h-full bg-[#007a7d] border-r border-gray-300">
      {/* Header section */}
      <section className="p-8 border-b border-gray-300 group flex flex-col items-center justify-center">
        <div className="w-20 h-20 relative rounded-full overflow-hidden border-2 border-white">
          <img
            src="/public/profile.png"
            alt="Perfil"
            className="absolute w-full h-full object-cover"
          />
        </div>

        <h3 className="text-lg text-white group-hover:text-[#00e5e8] transition-colors duration-300 text-justify font-bold">
          Edison Barrera
        </h3>
        <h5 className="tracking-wide text-gray-200 font-semibold text-nowrap">
          Administrador de Empresa
        </h5>
      </section>

      {/* Menu section */}
      <section>
        <ul>
          {/* Gestionar Empresa */}
          <NavLink
            to="/empresa-dashboard/gestionar"
            className={({ isActive }) =>
              isActive
                ? `px-8 py-5 flex items-center gap-2 border-b border-gray-400 text-white bg-[#005b5c] transition-all duration-300`
                : `px-8 py-5 text-gray-300 flex items-center gap-2 border-b border-gray-400 hover:text-white hover:bg-[#005b5c] transition-all duration-300`
            }
          >
            <IoIosBusiness size={20} />
            Gestionar Empresa
          </NavLink>

          {/* Ofertas de trabajo */}
          <NavLink
            to="/empresa-dashboard/ofertas"
            className={({ isActive }) =>
              isActive
                ? `px-8 py-5 flex items-center gap-2 border-b border-gray-400 text-white bg-[#005b5c] transition-all duration-300`
                : `px-8 py-5 text-gray-300 flex items-center gap-2 border-b border-gray-400 hover:text-white hover:bg-[#005b5c] transition-all duration-300`
            }
          >
            <RiBriefcase4Fill size={20} />
            Ofertas de Trabajo
          </NavLink>

          {/* Postulaciones */}
          <NavLink
            to="/empresa-dashboard/postulaciones"
            className={({ isActive }) =>
              isActive
                ? `px-8 py-5 flex items-center gap-2 border-b border-gray-400 text-white bg-[#005b5c] transition-all duration-300`
                : `px-8 py-5 text-gray-300 flex items-center gap-2 border-b border-gray-400 hover:text-white hover:bg-[#005b5c] transition-all duration-300`
            }
          >
            <RiFileList3Fill size={20} />
            Postulaciones
          </NavLink>

          {/* Reportes */}
          <NavLink
            to="/empresa-dashboard/reportes"
            className={({ isActive }) =>
              isActive
                ? `px-8 py-5 flex items-center gap-2 border-b border-gray-400 text-white bg-[#005b5c] transition-all duration-300`
                : `px-8 py-5 text-gray-300 flex items-center gap-2 border-b border-gray-400 hover:text-white hover:bg-[#005b5c] transition-all duration-300`
            }
          >
            <RiBarChartFill size={20} />
            Reportes
          </NavLink>

          {/* Configuración */}
          <NavLink
            to="/empresa-dashboard/configuracion"
            className={({ isActive }) =>
              isActive
                ? `px-8 py-5 flex items-center gap-2 border-b border-gray-400 text-white bg-[#005b5c] transition-all duration-300`
                : `px-8 py-5 text-gray-300 flex items-center gap-2 border-b border-gray-400 hover:text-white hover:bg-[#005b5c] transition-all duration-300`
            }
          >
            <RiSettings3Fill size={20} />
            Configuración
          </NavLink>

          {/* Soporte */}
          <NavLink
            to="/empresa-dashboard/soporte"
            className={({ isActive }) =>
              isActive
                ? `px-8 py-5 flex items-center gap-2 border-b border-gray-400 text-white bg-[#005b5c] transition-all duration-300`
                : `px-8 py-5 text-gray-300 flex items-center gap-2 border-b border-gray-400 hover:text-white hover:bg-[#005b5c] transition-all duration-300`
            }
          >
            <RiCustomerService2Fill size={20} />
            Soporte
          </NavLink>
        </ul>
      </section>

      {/* Botón de Cerrar sesión */}
      <button
        className="absolute bottom-0 w-full flex justify-center items-center py-3 bg-[#005b5c] hover:bg-[#294949] transition-colors duration-300 text-white hover:text-[#00e5e8]"
        onClick={closeSession}
      >
        Cerrar sesión
      </button>
    </aside>
  )
}

export default Sidebar
