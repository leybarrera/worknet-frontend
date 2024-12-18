import { IoIosBusiness } from 'react-icons/io'
import {
  RiTeamFill,
  RiBriefcase4Fill,
  RiFileList3Fill,
  RiCustomerService2Fill,
  RiBarChartFill,
  RiAdminFill,
} from 'react-icons/ri'
import { NavLink, useNavigate } from 'react-router-dom'
import { storageUtil } from '../utils/index.utils'

const Aside = () => {
  const navigate = useNavigate()
  const logout = () => {
    storageUtil.removeStorage('session_info')
    navigate('/inicio_sesion')
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
          Administrador
        </h5>
      </section>

      {/* Menu section */}
      <section>
        <ul>
          {/* Usuarios */}
          <NavLink
            // to="/dashboard/candidatos"
            className={({ isActive }) =>
              isActive
                ? `px-8 py-5 flex items-center gap-2 border-b border-gray-400 text-white bg-[#005b5c] transition-all duration-300`
                : `px-8 py-5 text-gray-300 flex items-center gap-2 border-b border-gray-400 hover:text-white hover:bg-[#005b5c] transition-all duration-300`
            }
          >
            <RiTeamFill size={20} />
            Candidatos
          </NavLink>

          {/* Usuarios */}
          <NavLink
            to="/dashboard/empresas"
            className={({ isActive }) =>
              isActive
                ? `px-8 py-5 flex items-center gap-2 border-b border-gray-400 text-white bg-[#005b5c] transition-all duration-300`
                : `px-8 py-5 text-gray-300 flex items-center gap-2 border-b border-gray-400 hover:text-white hover:bg-[#005b5c] transition-all duration-300`
            }
          >
            <IoIosBusiness size={20} />
            Empresas
          </NavLink>

          {/* Ofertas de trabajo */}
          <NavLink
            to="/dashboard/ofertas"
            className={({ isActive }) =>
              isActive
                ? `px-8 py-5 flex items-center gap-2 border-b border-gray-400 text-white bg-[#005b5c] transition-all duration-300`
                : `px-8 py-5 text-gray-300 flex items-center gap-2 border-b border-gray-400 hover:text-white hover:bg-[#005b5c] transition-all duration-300`
            }
          >
            <RiBriefcase4Fill size={20} />
            Ofertas de trabajo
          </NavLink>

          {/* Postulaciones */}
          <NavLink
            to="/dashboard/postulaciones"
            className={({ isActive }) =>
              isActive
                ? `px-8 py-5 flex items-center gap-2 border-b border-gray-400 text-white bg-[#005b5c] transition-all duration-300`
                : `px-8 py-5 text-gray-300 flex items-center gap-2 border-b border-gray-400 hover:text-white hover:bg-[#005b5c] transition-all duration-300`
            }
          >
            <RiFileList3Fill size={20} />
            Postulaciones
          </NavLink>

          {/* Soporte */}
          <NavLink
            to="/dashboard/soporte"
            className={({ isActive }) =>
              isActive
                ? `px-8 py-5 flex items-center gap-2 border-b border-gray-400 text-white bg-[#005b5c] transition-all duration-300`
                : `px-8 py-5 text-gray-300 flex items-center gap-2 border-b border-gray-400 hover:text-white hover:bg-[#005b5c] transition-all duration-300`
            }
          >
            <RiCustomerService2Fill size={20} />
            Soporte
          </NavLink>

          <NavLink
            to="/dashboard/reportes"
            className={({ isActive }) =>
              isActive
                ? `px-8 py-5 flex items-center gap-2 border-b border-gray-400 text-white bg-[#005b5c] transition-all duration-300`
                : `px-8 py-5 text-gray-300 flex items-center gap-2 border-b border-gray-400 hover:text-white hover:bg-[#005b5c] transition-all duration-300`
            }
          >
            <RiFileList3Fill size={20} />
            Reportes
          </NavLink>

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `px-8 py-5 flex items-center gap-2 border-b border-gray-400 text-white bg-[#005b5c] transition-all duration-300`
                : `px-8 py-5 text-gray-300 flex items-center gap-2 border-b border-gray-400 hover:text-white hover:bg-[#005b5c] transition-all duration-300`
            }
          >
            <RiTeamFill size={20} />
            Plataforma
          </NavLink>
        </ul>
      </section>

      <button
        className="absolute bottom-0 w-full flex justify-center items-center py-3 bg-[#005b5c] hover:bg-[#294949] transition-colors duration-300 text-white  hover:text-[#00e5e8]"
        onClick={logout}
      >
        Cerrar sesión
      </button>
    </aside>
  )
}

export default Aside
