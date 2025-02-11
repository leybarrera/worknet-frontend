import { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { applicationsAPI } from '../../../api/applications/applications.api'

const Postulaciones = () => {
  const [postulaciones, setPostulaciones] = useState([])
  // const postulaciones = [
  //   {
  //     application_date: '2024-10-01T10:00:00Z',
  //     user: { name: 'Juan', surname: 'Pérez', email: 'juan.perez@email.com' },
  //     jobOffer: {
  //       title: 'Desarrollador Full Stack',
  //       location: 'La Maná, Ecuador',
  //     },
  //     status: 'Pendiente',
  //   },
  //   {
  //     application_date: '2024-10-03T10:00:00Z',
  //     user: { name: 'Ana', surname: 'Gómez', email: 'ana.gomez@email.com' },
  //     jobOffer: { title: 'Community Manager', location: 'La Maná, Ecuador' },
  //     status: 'Aceptado',
  //   },
  //   {
  //     application_date: '2024-10-05T10:00:00Z',
  //     user: {
  //       name: 'Carlos',
  //       surname: 'Sánchez',
  //       email: 'carlos.sanchez@email.com',
  //     },
  //     jobOffer: { title: 'Vendedor de Tienda', location: 'La Maná, Ecuador' },
  //     status: 'Rechazado',
  //   },
  //   {
  //     application_date: '2024-10-07T10:00:00Z',
  //     user: {
  //       name: 'Laura',
  //       surname: 'Martínez',
  //       email: 'laura.martinez@email.com',
  //     },
  //     jobOffer: {
  //       title: 'Desarrollador Backend',
  //       location: 'La Maná, Ecuador',
  //     },
  //     status: 'Pendiente',
  //   },
  // ]

  useEffect(() => {
    applicationsAPI.getAll().then((res) => {
      const { jobApplications } = res.data
      setPostulaciones(jobApplications)
    })
  }, [])

  return (
    <section className="pl-[320px] p-8 w-full">
      <h2 className="text-2xl font-semibold mb-4">Postulaciones</h2>

      {/* Tabla de postulaciones */}
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
                Oferta de Trabajo
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Ubicación
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
            {postulaciones && postulaciones.length > 0 ? (
              postulaciones.map((postulacion, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {postulacion.User.name} {postulacion.User.surname}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {postulacion.User.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {postulacion.JobOffer.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {postulacion.jobOffer.location}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(
                      postulacion.application_date
                    ).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        postulacion.status === 'Aceptado'
                          ? 'bg-green-200 text-green-800'
                          : postulacion.status === 'Rechazado'
                          ? 'bg-red-200 text-red-800'
                          : 'bg-yellow-200 text-yellow-800'
                      }`}
                    >
                      {postulacion.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {/* Botón para eliminar */}
                    <button
                      onClick={() =>
                        alert(
                          `Eliminar postulación para ${postulacion.user.name}`
                        )
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      <RiDeleteBin6Line size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-4 text-center text-gray-500 text-lg font-medium"
                >
                  No hay postulaciones
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Postulaciones
