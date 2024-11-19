import { useEffect, useState } from 'react'
import { RiDeleteBin6Line, RiEyeFill, RiFileTextLine } from 'react-icons/ri'
import { userEndpoints } from '../../../api/user/user.api'
import { NavLink } from 'react-router-dom'

const Candidatos = () => {
  const [candidatos, setCandidatos] = useState([])

  useEffect(() => {
    userEndpoints
      .getAll()
      .then((res) => {
        setCandidatos(res.data.users)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const deleteUser = (id) => {
    userEndpoints
      .delete(id)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const users = [
    {
      name: 'Edison',
      surname: 'Barrera',
      email: 'edison@example.com',
      password: '********',
      phone: '+123456789',
      profile_picture: '/profile.png',
      gender: 'Male',
      location: 'La Maná',
      role: 'Administrator',
      isActive: true,
      curriculum: '/curriculum_edison.pdf', // Enlace al archivo del currículum
    },
    {
      name: 'Maria',
      surname: 'Lopez',
      email: 'maria@example.com',
      password: '********',
      phone: '+987654321',
      profile_picture: '/profile2.png',
      gender: 'Female',
      location: 'La Maná',
      role: 'Candidate',
      isActive: false,
      curriculum: '', // No tiene currículum
    },
    {
      name: 'Juan',
      surname: 'Perez',
      email: 'juan@example.com',
      password: '********',
      phone: '+1122334455',
      profile_picture: '/profile3.png',
      gender: 'Male',
      location: 'La Maná',
      role: 'Candidate',
      isActive: true,
      curriculum: '', // No tiene currículum
    },
  ]

  return (
    <section className="pl-[320px] p-8 w-full">
      <h2 className="text-2xl font-semibold mb-4">Usuarios</h2>

      {/* Tabla de usuarios */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Apellido
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Teléfono
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Género
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Ubicación
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Rol
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Activo
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Currículum
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {candidatos.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {user.surname}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {user.phone}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {user.gender}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {user.location}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.role}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      user.isActive
                        ? 'bg-green-200 text-green-800'
                        : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {user.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {user.curriculum ? (
                    <span className="flex items-center gap-1 text-blue-500 cursor-pointer">
                      <RiFileTextLine size={18} />
                      Ver
                    </span>
                  ) : (
                    <span className="text-gray-500">No disponible</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 gap-2 flex items-center">
                  {/* Botón para eliminar */}
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                  <NavLink
                    to={`/dashboard/candidatos/user-info/${user.id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <RiEyeFill size={20} />
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Candidatos