import React from 'react'
import { IoMdLogOut } from 'react-icons/io'
import { RiSettings3Fill, RiUser3Fill } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'

const ProfileMenu = ({ closeAllMenus }) => {
  return (
    <>
      <div className="absolute w-[250px] bg-white -left-[230px] rounded-lg border border-[#00b4b7] shadow-xl z-50">
        <ul className="flex flex-col py-2">
          {/* Profile Option */}
          <li>
            <NavLink
              to="/profile"
              className="px-4 py-2 flex items-center gap-3 text-sm text-gray-700 hover:bg-[#f0f9f9] hover:text-[#00b4b7] rounded-md transition-all duration-300"
            >
              <RiUser3Fill size={18} />
              Perfil
            </NavLink>
          </li>
          {/* Settings Option */}
          <li>
            <NavLink
              to="/settings"
              className="px-4 py-2 flex items-center gap-3 text-sm text-gray-700 hover:bg-[#f0f9f9] hover:text-[#00b4b7] rounded-md transition-all duration-300"
            >
              <RiSettings3Fill size={18} />
              Configuración
            </NavLink>
          </li>
          {/* Logout Option */}
          <li>
            <NavLink
              to="/logout"
              className="px-4 py-2 flex items-center gap-3 text-sm text-gray-700 hover:bg-[#f0f9f9] hover:text-[#00b4b7] rounded-md transition-all duration-300"
            >
              <IoMdLogOut size={18} />
              Cerrar sesión
            </NavLink>
          </li>
        </ul>
      </div>
      <div
        className="fixed bg-green-400 w-full h-full left-0 bg-transparent"
        onClick={closeAllMenus}
      />
    </>
  )
}

export default ProfileMenu
