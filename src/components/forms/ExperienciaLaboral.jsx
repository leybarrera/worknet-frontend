import { CSSTransition, TransitionGroup } from 'react-transition-group'
import PropTypes from 'prop-types'

const ExperienciaLaboral = ({
  experience,
  updateExperience,
  addItem,
  experienceList,
  setExperienceList,
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-[#333333] mb-2">
        Experiencia Laboral
      </h2>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <input
          type="text"
          name="company"
          value={experience.company}
          onChange={updateExperience}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
          placeholder="Empresa"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="position"
          value={experience.position}
          onChange={updateExperience}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
          placeholder="Puesto"
        />
        <input
          type="text"
          name="duration"
          value={experience.duration}
          onChange={updateExperience}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
          placeholder="Duración"
        />
      </div>

      <button
        onClick={() =>
          addItem(experienceList, setExperienceList, experience, () =>
            updateExperience({ company: '', position: '', duration: '' })
          )
        }
        className="px-5 py-2 text-sm text-white bg-[#00b4b7] rounded-md hover:bg-[#00a7a3] transition-colors"
      >
        Agregar experiencia
      </button>

      <TransitionGroup className="mt-4">
        {experienceList.map((exp, index) => (
          <CSSTransition key={index} timeout={300} classNames="fade">
            <div className="flex justify-between items-center p-2 bg-gray-100 rounded-lg mb-2">
              <div>
                <p className="font-semibold">{exp.company}</p>
                <p className="text-sm">
                  {exp.position} - {exp.duration}{' '}
                  {exp.duration > 1 ? 'años' : 'año'}
                </p>
              </div>
              <button
                onClick={() =>
                  setExperienceList(
                    experienceList.filter((_, i) => i !== index)
                  )
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

ExperienciaLaboral.propTypes = {
  experience: PropTypes.shape({
    company: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
  }).isRequired,
  updateExperience: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  experienceList: PropTypes.arrayOf(
    PropTypes.shape({
      company: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
    })
  ).isRequired,
  setExperienceList: PropTypes.func.isRequired,
}

export default ExperienciaLaboral
