import { CSSTransition, TransitionGroup } from 'react-transition-group'
import PropTypes from 'prop-types'

const Education = ({
  education,
  updateEducation,
  addItem,
  educationList,
  setEducationList,
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-[#333333] mb-2">Educación</h2>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <input
          type="text"
          name="institution"
          defaultValue={education.institution}
          onChange={updateEducation}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
          placeholder="Institución"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <input
          type="text"
          name="degree_obtained"
          defaultValue={education.degree_obtained}
          onChange={updateEducation}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
          placeholder="Grado obtenido"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="" className="text-lg font-semibold">
            Fecha de Inicio
          </label>
          <input
            type="date"
            name="start_date"
            defaultValue={education.start_date}
            onChange={updateEducation}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
          />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="" className="text-lg font-semibold">
            Fecha de Finalización
          </label>
          <input
            type="date"
            name="end_date"
            defaultValue={education.end_date}
            onChange={updateEducation}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
          />
        </div>
      </div>

      <button
        onClick={() =>
          addItem(educationList, setEducationList, education, () =>
            updateEducation({
              institution: '',
              degree_obtained: '',
              start_date: '',
              end_date: '',
            })
          )
        }
        className="px-5 py-2 text-sm text-white bg-[#00b4b7] rounded-md hover:bg-[#00a7a3] transition-colors"
      >
        Agregar educación
      </button>

      {/* Lista de educación */}
      <TransitionGroup className="mt-4">
        {educationList.map((edu, index) => (
          <CSSTransition key={index} timeout={300} classNames="fade">
            <div className="flex justify-between items-center p-2 bg-gray-100 rounded-lg mb-2">
              <div>
                <p className="font-semibold">{edu.institution}</p>
                <p className="text-sm">
                  {edu.degree_obtained} - {edu.start_date} a {edu.end_date}
                </p>
              </div>
              <button
                onClick={() =>
                  setEducationList(educationList.filter((_, i) => i !== index))
                }
                className="text-red-500 font-bold"
              >
                X
              </button>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  )
}

Education.propTypes = {
  education: PropTypes.shape({
    institution: PropTypes.string.isRequired,
    degree_obtained: PropTypes.string.isRequired,
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string.isRequired,
  }).isRequired,
  updateEducation: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  educationList: PropTypes.arrayOf(
    PropTypes.shape({
      institution: PropTypes.string.isRequired,
      degree_obtained: PropTypes.string.isRequired,
      start_date: PropTypes.string.isRequired,
      end_date: PropTypes.string.isRequired,
    })
  ).isRequired,
  setEducationList: PropTypes.func.isRequired,
}

export default Education
