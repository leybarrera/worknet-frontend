import { useSelector } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import PropTypes from 'prop-types'

const Habilidades = ({
  updateSkill,
  addItem,
  skillsList,
  setSkillsList,
  skill,
  getSkillName,
}) => {
  const { skills } = useSelector((state) => state.skills)

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-[#333333] mb-2">
        Habilidades
      </h2>

      {/* Campos para añadir habilidad y años de experiencia */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Cambiar por un select */}
        <select
          name="SkillId"
          onChange={updateSkill}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
        >
          <option value="" disabled selected>
            Selecciona habilidad
          </option>
          {skills.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="years_of_experience"
          defaultValue={skill.years_of_experience}
          onChange={updateSkill}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
          placeholder="Años de experiencia"
        />
      </div>

      {/* Botón para agregar habilidades */}
      <button
        className="px-5 py-2 text-sm text-white bg-[#00b4b7] rounded-md hover:bg-[#00a7a3] transition-colors"
        onClick={() =>
          addItem(skillsList, setSkillsList, skill, () =>
            updateSkill({ years_of_experience: '' })
          )
        }
      >
        Añadir habilidad
      </button>

      {/* Lista de habilidades */}
      {skillsList && skillsList.length > 0 && (
        <TransitionGroup className="mt-4">
          {skillsList.map((item, index) => (
            <CSSTransition key={index} timeout={300} classNames="fade">
              <div className="flex justify-between items-center p-2 bg-gray-100 rounded-lg mb-2">
                <div>
                  <p className="font-semibold">{getSkillName(item.SkillId)}</p>
                  <p className="text-sm text-gray-600">
                    {item.years_of_experience} año(s) de experiencia
                  </p>
                </div>
                <button
                  onClick={() =>
                    setSkillsList(skillsList.filter((_, i) => i !== index))
                  }
                  className="text-red-500 font-bold"
                >
                  X
                </button>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      )}
    </div>
  )
}

Habilidades.propTypes = {
  updateSkill: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  skillsList: PropTypes.arrayOf(
    PropTypes.shape({
      SkillId: PropTypes.string.isRequired,
      years_of_experience: PropTypes.number.isRequired,
    })
  ).isRequired,
  setSkillsList: PropTypes.func.isRequired,
  skill: PropTypes.shape({
    years_of_experience: PropTypes.number.isRequired,
  }).isRequired,
  getSkillName: PropTypes.func.isRequired,
}

export default Habilidades
