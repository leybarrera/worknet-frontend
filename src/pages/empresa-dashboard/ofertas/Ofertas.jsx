import { useEffect, useState } from 'react'
import {
  RiDeleteBin6Line,
  RiAddCircleLine,
  RiEdit2Line,
  RiRefreshLine,
} from 'react-icons/ri'
import { Link } from 'react-router-dom'
import AddJobOffer from '../../../components/modal/AddJobOffer'
import { dateUtil, storageUtil } from '../../../utils/index.utils'
import { Toaster, toast } from 'sonner'
import { offersAPI } from '../../../api/ofertas/ofertas.api'

const OfertasEmpresa = () => {
  const [id, setId] = useState('')
  const [ofertas, setOfertas] = useState([])
  const [loadData, setLoadData] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const toggleModal = () => setShowModal((prev) => !prev)

  // const handleDeleteOferta = (id) => {
  //   setOfertas(ofertas.filter((oferta) => oferta.id !== id))
  // }

  const successUpdate = async () => {
    toast.success('Oferta creada con éxito')
    fetchOffers()
  }
  const errorUpdate = () => {
    toast.error('Error al crear oferta')
  }

  const incompletedOffer = () => {
    toast.error('Oferta incompleta. Verifique e intente nuevo')
  }

  const fetchOffers = () => {
    setLoadData(true)
    offersAPI
      .getByCompany(id)
      .then((res) => {
        const { jobOffers } = res.data
        setOfertas(jobOffers)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoadData(false)
      })
  }

  useEffect(() => {
    if (id) {
      fetchOffers()
    }
  }, [id])

  useEffect(() => {
    const data = storageUtil.getFromLocalStorage('session_info')
    if (data) {
      const { company } = data
      setId(company.id)
    }
  }, [])

  return (
    <section className="w-full">
      <h2 className="text-2xl font-semibold mb-4">Ofertas de Trabajo</h2>

      {/* Botón para agregar nueva oferta */}
      <div className="mb-4 flex flex-row items-center justify-between">
        <button
          className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md flex items-center gap-2"
          onClick={toggleModal}
        >
          <RiAddCircleLine size={20} />
          Crear Oferta
        </button>

        <button
          className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md flex items-center gap-2"
          onClick={fetchOffers}
        >
          <RiRefreshLine size={20} />
          Actualizar
        </button>
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
          {loadData ? (
            <tbody>
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-3 text-center text-sm font-medium "
                >
                  <RiRefreshLine
                    size={25}
                    className="animate-spin text-center m-auto"
                  />
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {ofertas &&
                ofertas.map((oferta) => (
                  <tr key={oferta.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {oferta.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {oferta.description}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {dateUtil.formatFechaISO(oferta.posted_at)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-200 text-green-800">
                        Activa
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
                        // onClick={() => handleDeleteOferta(oferta.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <RiDeleteBin6Line size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          )}
          {!ofertas ||
            (ofertas.length === 0 && (
              <tfoot>
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-3 text-center text-sm font-medium"
                  >
                    No hay ofertas registradas
                  </td>
                </tr>
              </tfoot>
            ))}
        </table>
      </div>
      {showModal && (
        <AddJobOffer
          toggleModal={toggleModal}
          company_id={id}
          success_update={successUpdate}
          error_update={errorUpdate}
          incompletedOffer={incompletedOffer}
        />
      )}
      <Toaster richColors />
    </section>
  )
}

export default OfertasEmpresa
