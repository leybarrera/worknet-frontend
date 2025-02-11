import { RiBarChartFill } from 'react-icons/ri'
import CountUp from 'react-countup'
import PostulationModal from '../../../components/modal/PostulationModal'
import { useEffect, useState } from 'react'
import { storageUtil } from '../../../utils/index.utils'
import { applicationsAPI } from '../../../api/applications/applications.api'
import { companyEndpoints } from '../../../api/company/company.api'
import { offersAPI } from '../../../api/ofertas/ofertas.api'
import { habilidades, nivelesEducativos } from '../../../mocks/data'

const PostulacionesCandidatos = () => {
  const [company, setCompany] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [postulations, setPostulations] = useState([])
  const [postulation, setPostulation] = useState(null)
  const [ofertas, setOfertas] = useState([])
  const toggleModal = () => setShowModal((prev) => !prev)

  const onRefresh = async () => {
    setShowModal(false)
    if (!company) return // Evita llamadas innecesarias si company es null

    try {
      // Obtener nuevas ofertas de la empresa
      const offersResponse = await offersAPI.getByCompany(company.id)
      const { jobOffers } = offersResponse.data
      setOfertas(jobOffers)

      // Obtener nuevas postulaciones para cada oferta de trabajo
      const ids = jobOffers.map((offer) => offer.id)
      const responses = await Promise.all(
        ids.map((id) => applicationsAPI.getByJobOffer(id))
      )

      const allApplications = responses
        .map((res) => res.data.jobApplications)
        .flat()

      setPostulations(allApplications)
    } catch (error) {
      console.error('Error al actualizar postulaciones:', error)
    }
  }

  const viewPostulation = (id) => {
    const postulation = postulations.find((postu) => postu.id === id)
    setPostulation(postulation)
    toggleModal()
  }
  const getJobOfferSkills = (description) => {
    const palabrasClavePuesto = new Set(description.toLowerCase().split(/\W+/))
    return habilidades.filter((tec) =>
      palabrasClavePuesto.has(tec.toLowerCase())
    )
  }

  const calcularNivelEducativo = (grado) => {
    return nivelesEducativos.indexOf(grado) !== -1
      ? nivelesEducativos.indexOf(grado)
      : -1
  }

  const calculateCompatibility = (id) => {
    const currentPostulation = postulations.find((postu) => postu.id === id)
    if (!currentPostulation) return console.error('Postulación no encontrada')

    const { JobOffer, User } = currentPostulation
    const { Skills, Education } = User

    const userSkills = new Set(Skills.map((skill) => skill.name.toLowerCase()))
    const offerSkills = getJobOfferSkills(JobOffer.description)

    console.log('Habilidades del puesto:', offerSkills)

    // Compatibilidad por habilidades
    const habilidadesCoincidentes = offerSkills.filter((hab) =>
      userSkills.has(hab.toLowerCase())
    )
    const porcentajeHabilidades =
      offerSkills.length > 0
        ? (habilidadesCoincidentes.length / offerSkills.length) * 100
        : 0

    // Compatibilidad por educación
    const nivelRequerido = calcularNivelEducativo(JobOffer.education_level)
    const nivelUsuario =
      Education.length > 0
        ? calcularNivelEducativo(Education[0].degree_obtained)
        : -1

    let porcentajeEducacion = 0
    if (nivelUsuario !== -1 && nivelRequerido !== -1) {
      if (nivelUsuario >= nivelRequerido) {
        porcentajeEducacion = 100 // El usuario cumple o supera el nivel
      } else {
        porcentajeEducacion = (nivelUsuario / nivelRequerido) * 100 // Se ajusta según el nivel
      }
    }

    // Peso de cada factor en el cálculo final
    const pesoHabilidades = 0.7
    const pesoEducacion = 0.3

    // Compatibilidad final ponderada
    const compatibilidadFinal =
      porcentajeHabilidades * pesoHabilidades +
      porcentajeEducacion * pesoEducacion

    return compatibilidadFinal
  }

  useEffect(() => {
    console.log(postulations)
  }, [postulations])

  useEffect(() => {
    if (ofertas.length > 0) {
      const ids = ofertas.map((offer) => offer.id)
      Promise.all(ids.map((id) => applicationsAPI.getByJobOffer(id))).then(
        (responses) => {
          const allApplications = responses
            .map((res) => res.data.jobApplications)
            .flat()
          setPostulations(allApplications)
        }
      )
    }
  }, [ofertas])

  useEffect(() => {
    if (company) {
      const { id } = company
      offersAPI
        .getByCompany(id)
        .then((res) => {
          const { jobOffers } = res.data
          setOfertas(jobOffers)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [company])

  useEffect(() => {
    const { company } = storageUtil.getFromLocalStorage('session_info')
    setCompany(company)
  }, [])
  return (
    <section className="w-full flex flex-col gap-5">
      {/* Listado de Postulaciones */}
      <div className="flex flex-col gap-3">
        <h2 className="text-[30px] font-semibold mb-4">
          Listado de Postulaciones
        </h2>

        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-200 border-b border-gray-300">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 ">
                  Candidato
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 ">
                  Puesto Solicitado
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 ">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 ">
                  Fecha de postulación
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 ">
                  Compatibilidad
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 "></th>
              </tr>
            </thead>

            <tbody>
              {postulations && postulations.length > 0 ? (
                postulations.map((post) => {
                  const { JobOffer, User } = post
                  return (
                    <tr
                      className="hover:bg-gray-100 transition duration-150 border-b border-gray-300"
                      key={post.id}
                    >
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-green-400 flex-shrink-0 relative overflow-hidden">
                          <img
                            src={
                              User.profile_picture
                                ? User.profile_picture
                                : '/public/men.png'
                            }
                            className="absolute w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-[16px] text-gray-700 font-medium">
                          {User.name} {User.surname}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-[16px] text-gray-700 font-medium">
                        {JobOffer.title}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 rounded-full text-[14px] font-semibold bg-green-200 text-green-800">
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[16px] text-gray-600">
                        {new Date(post.application_date).toLocaleDateString(
                          'es-ES'
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 rounded-full text-[14px] font-semibold bg-green-200 text-green-800">
                          {calculateCompatibility(post.id)} %
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[16px] text-[#00B4B7] font-medium">
                        <button
                          className="underline"
                          onClick={() => viewPostulation(post.id)}
                        >
                          Ver detalle
                        </button>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500 text-lg font-medium"
                  >
                    No hay postulaciones
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <PostulationModal
          toggleModal={toggleModal}
          postulation={postulation}
          onRefresh={onRefresh}
        />
      )}
    </section>
  )
}

export default PostulacionesCandidatos
