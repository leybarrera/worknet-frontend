import { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { companyEndpoints } from '../../../api/company/company.api'
import { toast, Toaster } from 'sonner'

const Empresas = () => {
  const [empresas, setEmpresas] = useState([])

  const getAll = () => {
    companyEndpoints
      .getAll()
      .then((res) => {
        const { companies } = res.data
        setEmpresas(companies)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const deleteCompany = (id) => {
    companyEndpoints.delete(id).then((res) => {
      const { message } = res.data
      getAll()
      toast.success(message)
    })
  }

  useEffect(() => {
    getAll()
  }, [])

  return (
    <section className="pl-[320px] p-8 w-full">
      <h2 className="text-2xl font-semibold mb-4">Empresas</h2>

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
                  {empresa.industry}
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
                    onClick={() => deleteCompany(empresa.id)}
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
      <Toaster richColors />
    </section>
  )
}

export default Empresas
