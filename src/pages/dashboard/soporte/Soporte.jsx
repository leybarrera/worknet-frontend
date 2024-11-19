import { RiDeleteBin6Line } from 'react-icons/ri'

const Soporte = () => {
  const tickets = [
    {
      id: '1',
      user: { name: 'Juan Pérez', email: 'juan.perez@email.com' },
      issue: 'Problema con la carga de la página',
      status: 'Pendiente',
      createdAt: '2024-10-01T08:00:00Z',
    },
    {
      id: '2',
      user: { name: 'Ana Gómez', email: 'ana.gomez@email.com' },
      issue: 'Error al procesar pago con tarjeta',
      status: 'Resuelto',
      createdAt: '2024-10-02T09:30:00Z',
    },
    {
      id: '3',
      user: { name: 'Carlos Sánchez', email: 'carlos.sanchez@email.com' },
      issue: 'No se muestra el producto en el catálogo',
      status: 'Pendiente',
      createdAt: '2024-10-03T10:15:00Z',
    },
    {
      id: '4',
      user: { name: 'Laura Martínez', email: 'laura.martinez@email.com' },
      issue: 'Problemas con la opción de pago por transferencia',
      status: 'Resuelto',
      createdAt: '2024-10-04T11:00:00Z',
    },
  ]

  return (
    <section className="pl-[320px] p-8 w-full">
      <h2 className="text-2xl font-semibold mb-4">Soporte</h2>

      {/* Tabla de tickets de soporte */}
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
                Problema
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Fecha de Creación
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
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">
                  {ticket.user.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {ticket.user.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {ticket.issue}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      ticket.status === 'Resuelto'
                        ? 'bg-green-200 text-green-800'
                        : 'bg-yellow-200 text-yellow-800'
                    }`}
                  >
                    {ticket.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {/* Botón para eliminar */}
                  <button
                    onClick={() => alert(`Eliminar ticket #${ticket.id}`)}
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

export default Soporte
