import { CSSTransition, TransitionGroup } from 'react-transition-group'
import PropTypes from 'prop-types'
import { references } from '../../mocks/data'

const Referencias = ({
  reference,
  updateReference,
  addItem,
  referencesList,
  setReferencesList,
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-[#333333] mb-2">
        Referencias
      </h2>

      {/* Campos para añadir referencias */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="name"
          value={reference.name}
          onChange={updateReference}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
          placeholder="Nombre completo"
        />
        <select
          name="relationship"
          defaultValue={reference.relationship}
          onChange={updateReference}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
        >
          <option value="" disabled selected>
            Selecciona la relación
          </option>
          {references.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="email"
          name="email"
          value={reference.email}
          onChange={updateReference}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
          placeholder="Email de contacto"
        />
        <input
          type="phone"
          name="phone"
          value={reference.phone}
          onChange={updateReference}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
          placeholder="Número de contacto"
        />
      </div>

      {/* Botón para agregar referencias */}
      <button
        className="px-5 py-2 text-sm text-white bg-[#00b4b7] rounded-md hover:bg-[#00a7a3] transition-colors"
        onClick={() =>
          addItem(referencesList, setReferencesList, reference, () =>
            updateReference({
              contact: '',
              relationship: '',
              phone: '',
              email: '',
            })
          )
        }
      >
        Añadir referencia
      </button>

      {/* Lista de referencias */}
      {referencesList && referencesList?.length > 0 && (
        <TransitionGroup className="mt-4">
          {referencesList.map((ref, index) => (
            <CSSTransition key={index} timeout={300} classNames="fade">
              <div className="flex justify-between items-center p-2 bg-gray-100 rounded-lg mb-2">
                <div>
                  <p className="font-semibold">{ref.name}</p>
                  <p className="text-sm text-gray-600">
                    {ref.relationship} - {ref.contact}
                  </p>
                  <p className="text-xs text-gray-500">{ref.email}</p>
                </div>
                <button className="text-red-500 font-bold">X</button>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      )}
    </div>
  )
}

Referencias.propTypes = {
  reference: PropTypes.shape({
    name: PropTypes.string.isRequired,
    relationship: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  updateReference: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  referencesList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      relationship: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ).isRequired,
  setReferencesList: PropTypes.func.isRequired,
}

export default Referencias
