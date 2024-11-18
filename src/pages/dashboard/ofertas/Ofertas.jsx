import { RiDeleteBin6Line, RiAddCircleLine } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'

const OfertasDeTrabajo = () => {
  const ofertas = [
    {
      title: 'Desarrollador Full Stack',
      location: 'La Maná, Ecuador',
      job_type: 'Tiempo completo',
      salary: 1500.0,
      posted_at: '2024-10-01T10:00:00Z',
      description:
        'Estamos buscando un desarrollador Full Stack con experiencia en React y Node.js. El candidato ideal debe tener habilidades en desarrollo de aplicaciones web modernas.',
      Company: { name: 'Tech Solutions' },
      isActive: true,
    },
    {
      title: 'Community Manager',
      location: 'La Maná, Ecuador',
      job_type: 'Medio tiempo',
      salary: 800.0,
      posted_at: '2024-10-03T10:00:00Z',
      description:
        'Buscamos un Community Manager para manejar nuestras redes sociales y crear contenido atractivo. Experiencia en marketing digital es esencial.',
      Company: { name: 'Digital Boosters' },
      isActive: true,
    },
    {
      title: 'Vendedor de Tienda',
      location: 'La Maná, Ecuador',
      job_type: 'Contrato',
      salary: 500.0,
      posted_at: '2024-10-05T10:00:00Z',
      description:
        'Estamos contratando vendedores para nuestra tienda en La Maná. Experiencia en ventas es preferida, pero no esencial.',
      Company: { name: 'Retail Co.' },
      isActive: false,
    },
    {
      title: 'Desarrollador Backend',
      location: 'La Maná, Ecuador',
      job_type: 'Freelance',
      salary: 1200.0,
      posted_at: '2024-10-07T10:00:00Z',
      description:
        'Se necesita desarrollador Backend con experiencia en Python y Django para trabajar en proyectos de tiempo parcial.',
      Company: { name: 'CodeCraft' },
      isActive: true,
    },
  ]

  return (
    <section className="pl-[320px] p-8 w-full">
      <h2 className="text-2xl font-semibold mb-4">Ofertas de Trabajo</h2>

      {/* Botón para crear una nueva oferta de trabajo */}
      <div className="mb-4">
        <NavLink
          to="/dashboard/ofertas-de-trabajo/crear"
          className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md flex items-center gap-2"
        >
          <RiAddCircleLine size={20} />
          Crear Oferta
        </NavLink>
      </div>

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
                Activo
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {ofertas.map((oferta, index) => (
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
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      oferta.isActive
                        ? 'bg-green-200 text-green-800'
                        : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {oferta.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {/* Botón para eliminar */}
                  <button
                    onClick={() => alert(`Eliminar oferta ${oferta.title}`)}
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

export default OfertasDeTrabajo
