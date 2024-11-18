import { useState } from 'react'
import { RiDeleteBin6Line, RiAddCircleLine, RiEdit2Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const OfertasEmpresa = () => {
  const [ofertas, setOfertas] = useState([
    {
      id: 1,
      titulo: 'Desarrollador Frontend',
      descripcion:
        'Buscamos un desarrollador frontend con experiencia en React.',
      fechaPublicacion: '10/11/2024',
      estado: 'Activo',
    },
    {
      id: 2,
      titulo: 'Diseñador Gráfico',
      descripcion:
        'Se requiere un diseñador con experiencia en Adobe Photoshop y Illustrator.',
      fechaPublicacion: '05/11/2024',
      estado: 'Inactivo',
    },
    {
      id: 3,
      titulo: 'Gerente de Ventas',
      descripcion:
        'Buscamos un gerente con experiencia en ventas corporativas.',
      fechaPublicacion: '01/11/2024',
      estado: 'Activo',
    },
  ])

  const handleDeleteOferta = (id) => {
    setOfertas(ofertas.filter((oferta) => oferta.id !== id))
  }

  return (
    <section className="w-full">
      <h2 className="text-2xl font-semibold mb-4">Ofertas de Trabajo</h2>

      {/* Botón para agregar nueva oferta */}
      <div className="mb-4">
        <Link
          to="/dashboard/ofertas/nueva"
          className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md flex items-center gap-2"
        >
          <RiAddCircleLine size={20} />
          Crear Oferta
        </Link>
      </div>

      {/* Tabla de Ofertas */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Título
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Descripción
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Fecha de Publicación
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {ofertas.map((oferta) => (
              <tr key={oferta.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">
                  {oferta.titulo}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {oferta.descripcion}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {oferta.fechaPublicacion}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      oferta.estado === 'Activo'
                        ? 'bg-green-200 text-green-800'
                        : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {oferta.estado}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 flex gap-2">
                  {/* Botón para editar */}
                  <Link
                    to={`/dashboard/ofertas/editar/${oferta.id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <RiEdit2Line size={20} />
                  </Link>

                  {/* Botón para eliminar */}
                  <button
                    onClick={() => handleDeleteOferta(oferta.id)}
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

export default OfertasEmpresa
