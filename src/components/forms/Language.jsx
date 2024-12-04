import { CSSTransition, TransitionGroup } from 'react-transition-group'
import PropTypes from 'prop-types'
import { languages } from '../../mocks/data'

const Language = ({
  language,
  updateLanguage,
  addItem,
  languageList,
  setLanguageList,
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-[#333333] mb-2">Idiomas</h2>

      {/* Campos para añadir idioma y nivel */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Cambiar por un select */}
        <select
          name="name"
          defaultValue={language.name}
          onChange={updateLanguage}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
        >
          <option value="" disabled selected>
            Selecciona el idioma
          </option>
          {languages.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          name="proficiency"
          defaultValue={language.proficiency}
          onChange={updateLanguage}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
        >
          <option value="" disabled>
            Selecciona nivel
          </option>
          <option value="Básico">Básico</option>
          <option value="Intermedio">Intermedio</option>
          <option value="Avanzado">Avanzado</option>
          <option value="Nativo">Nativo</option>
        </select>
      </div>

      {/* Botón para agregar idiomas */}
      <button
        className="px-5 py-2 text-sm text-white bg-[#00b4b7] rounded-md hover:bg-[#00a7a3] transition-colors"
        onClick={() =>
          addItem(languageList, setLanguageList, language, () =>
            updateLanguage({ proficiency: '' })
          )
        }
      >
        Añadir idioma
      </button>

      {languageList && (
        <TransitionGroup className="mt-4">
          {languageList.map((item, index) => (
            <CSSTransition key={index} timeout={300} classNames="fade">
              <div className="flex justify-between items-center p-2 bg-gray-100 rounded-lg mb-2">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    Nivel: {item.proficiency}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setLanguageList(languageList.filter((_, i) => i !== index))
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

Language.propTypes = {
  language: PropTypes.shape({
    name: PropTypes.string.isRequired,
    proficiency: PropTypes.string.isRequired,
  }).isRequired,
  updateLanguage: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  languageList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      proficiency: PropTypes.string.isRequired,
    })
  ).isRequired,
  setLanguageList: PropTypes.func.isRequired,
}

export default Language
