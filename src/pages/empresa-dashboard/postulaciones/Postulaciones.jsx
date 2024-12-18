import { useEffect, useState } from 'react'
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const PostulacionesCandidatos = () => {
  const [postulaciones, setPostulaciones] = useState([
    {
      id: 1,
      candidato: 'Juan Pérez',
      oferta: 'Desarrollador Frontend',
      fechaPostulacion: '10/11/2024',
      estado: 'Pendiente',
    },
    {
      id: 2,
      candidato: 'Ana Gómez',
      oferta: 'Diseñador Gráfico',
      fechaPostulacion: '05/11/2024',
      estado: 'Aceptado',
    },
    {
      id: 3,
      candidato: 'Carlos Rodríguez',
      oferta: 'Gerente de Ventas',
      fechaPostulacion: '01/11/2024',
      estado: 'Rechazado',
    },
  ])

  const handleDeletePostulacion = (id) => {
    setPostulaciones(
      postulaciones.filter((postulacion) => postulacion.id !== id)
    )
  }

  return (
    <section className="w-full">
      <h2 className="text-2xl font-semibold mb-4">Postulaciones</h2>

      {/* Tabla de Postulaciones */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Candidato
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Oferta
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Fecha de Postulación
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
            {postulaciones.map((postulacion) => (
              <tr key={postulacion.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">
                  {postulacion.candidato}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {postulacion.oferta}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {postulacion.fechaPostulacion}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      postulacion.estado === 'Aceptado'
                        ? 'bg-green-200 text-green-800'
                        : postulacion.estado === 'Rechazado'
                        ? 'bg-red-200 text-red-800'
                        : 'bg-yellow-200 text-yellow-800'
                    }`}
                  >
                    {postulacion.estado}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 flex gap-2">
                  {/* Botón para editar */}
                  <Link
                    to={`/dashboard/postulaciones/editar/${postulacion.id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <RiEdit2Line size={20} />
                  </Link>

                  {/* Botón para eliminar */}
                  <button
                    onClick={() => handleDeletePostulacion(postulacion.id)}
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

export default PostulacionesCandidatos
