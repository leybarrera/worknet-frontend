import { RiDeleteBin6Line, RiAddCircleLine } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'

const Empresas = () => {
  const empresas = [
    {
      name: 'Empresa A',
      email: 'empresaA@example.com',
      phone: '+123456789',
      location: 'La Maná',
      sector: 'Tecnología',
      website: 'https://empresaA.com',
      ruc: 'RUC1234567890',
      isActive: true,
    },
    {
      name: 'Empresa B',
      email: 'empresaB@example.com',
      phone: '+987654321',
      location: 'La Maná',
      sector: 'Comercio',
      website: 'https://empresaB.com',
      ruc: 'RUC0987654321',
      isActive: false,
    },
    {
      name: 'Empresa C',
      email: 'empresaC@example.com',
      phone: '+1122334455',
      location: 'La Maná',
      sector: 'Salud',
      website: 'https://empresaC.com',
      ruc: 'RUC1122334455',
      isActive: true,
    },
  ]

  return (
    <section className="pl-[320px] p-8 w-full">
      <h2 className="text-2xl font-semibold mb-4">Empresas</h2>

      {/* Botón para crear una nueva empresa */}
      <div className="mb-4">
        <NavLink
          to="/dashboard/empresas/crear"
          className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md flex items-center gap-2"
        >
          <RiAddCircleLine size={20} />
          Crear Empresa
        </NavLink>
      </div>

      {/* Tabla de empresas */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Teléfono
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Ubicación
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Sector
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Sitio Web
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                RUC
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Activo
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {empresas.map((empresa, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">
                  {empresa.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {empresa.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {empresa.phone}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {empresa.location}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {empresa.sector}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <a
                    href={empresa.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {empresa.website}
                  </a>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {empresa.ruc}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      empresa.isActive
                        ? 'bg-green-200 text-green-800'
                        : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {empresa.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {/* Botón para eliminar */}
                  <button
                    onClick={() => alert(`Eliminar empresa ${empresa.name}`)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Empresas
