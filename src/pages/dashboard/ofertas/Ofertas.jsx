import { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { offersAPI } from '../../../api/ofertas/ofertas.api'
import { toast, Toaster } from 'sonner'

const OfertasDeTrabajo = () => {
  const [ofertas, setOfertas] = useState([])
  // const ofertas = [
  //   {
  //     title: 'Desarrollador Full Stack',
  //     location: 'La Maná, Ecuador',
  //     job_type: 'Tiempo completo',
  //     salary: 1500.0,
  //     posted_at: '2024-10-01T10:00:00Z',
  //     description:
  //       'Estamos buscando un desarrollador Full Stack con experiencia en React y Node.js. El candidato ideal debe tener habilidades en desarrollo de aplicaciones web modernas.',
  //     Company: { name: 'Tech Solutions' },
  //     isActive: true,
  //   },
  //   {
  //     title: 'Community Manager',
  //     location: 'La Maná, Ecuador',
  //     job_type: 'Medio tiempo',
  //     salary: 800.0,
  //     posted_at: '2024-10-03T10:00:00Z',
  //     description:
  //       'Buscamos un Community Manager para manejar nuestras redes sociales y crear contenido atractivo. Experiencia en marketing digital es esencial.',
  //     Company: { name: 'Digital Boosters' },
  //     isActive: true,
  //   },
  //   {
  //     title: 'Vendedor de Tienda',
  //     location: 'La Maná, Ecuador',
  //     job_type: 'Contrato',
  //     salary: 500.0,
  //     posted_at: '2024-10-05T10:00:00Z',
  //     description:
  //       'Estamos contratando vendedores para nuestra tienda en La Maná. Experiencia en ventas es preferida, pero no esencial.',
  //     Company: { name: 'Retail Co.' },
  //     isActive: false,
  //   },
  //   {
  //     title: 'Desarrollador Backend',
  //     location: 'La Maná, Ecuador',
  //     job_type: 'Freelance',
  //     salary: 1200.0,
  //     posted_at: '2024-10-07T10:00:00Z',
  //     description:
  //       'Se necesita desarrollador Backend con experiencia en Python y Django para trabajar en proyectos de tiempo parcial.',
  //     Company: { name: 'CodeCraft' },
  //     isActive: true,
  //   },
  // ]

  const getAll = () => {
    offersAPI.getAll().then((res) => {
      const { jobOffers } = res.data
      setOfertas(jobOffers)
    })
  }

  const deleteOffer = (id) => {
    offersAPI.delete(id).then((res) => {
      const { message } = res.data
      toast.success(message)
      getAll()
    })
  }

  useEffect(() => {
    getAll()
  }, [])

  return (
    <section className="pl-[320px] p-8 w-full">
      <h2 className="text-2xl font-semibold mb-4">Ofertas de Trabajo</h2>

      {/* Tabla de ofertas de trabajo */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Título
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Empresa
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Ubicación
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Tipo de Trabajo
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Descripción
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Salario
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Fecha de Publicación
              </th>

              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {ofertas && ofertas.length > 0 ? (
              ofertas.map((oferta, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {oferta.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {oferta.Company.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {oferta.location}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {oferta.job_type}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 max-w-[300px] truncate">
                    {oferta.description}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{`$${oferta.salary.toFixed(
                    2
                  )}`}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(oferta.posted_at).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700">
                    {/* Botón para eliminar */}
                    <button
                      onClick={() => deleteOffer(oferta.id)}
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
                  colSpan="8"
                  className="px-6 py-4 text-center text-gray-500 text-lg font-medium"
                >
                  No hay Ofertas de trabajo
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Toaster richColors />
    </section>
  )
}

export default OfertasDeTrabajo
