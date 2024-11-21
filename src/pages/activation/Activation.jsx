import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { authEndpoints } from '../../api/auth/auth.api'

const Activation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const token = new URLSearchParams(location.search).get('token')
  const [activationStatus, setActivationStatus] = useState(null)

  useEffect(() => {
    if (token) {
      authEndpoints
        .accountActivation(token)
        .then((res) => {
          setActivationStatus('success')
          console.log('Cuenta activada exitosamente:', res)
          // Redirigir al login después de 5 segundos
          setTimeout(() => {
            navigate('/inicio_sesion')
          }, 5000)
        })
        .catch((err) => {
          setActivationStatus('error')
          console.log('Error al activar la cuenta:', err)
        })
    }
  }, [token, navigate])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#007a7d] to-[#00b4b4] px-6">
      <div className="bg-white p-10 rounded-lg shadow-xl max-w-lg w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-[#007a7d]">
            Activación de Cuenta
          </h1>
        </div>

        <div className="text-center">
          {activationStatus === 'success' ? (
            <div>
              <p className="text-xl text-green-600 mb-4">
                ¡Tu cuenta ha sido activada exitosamente!
              </p>
              <p className="text-sm text-gray-600">
                Serás redirigido al inicio de sesión en breve...
              </p>
            </div>
          ) : activationStatus === 'error' ? (
            <div>
              <p className="text-xl text-red-600 mb-4">
                Algo salió mal al activar tu cuenta. Por favor, intenta
                nuevamente.
              </p>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <svg
                className="w-12 h-12 text-[#007a7d] animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeOpacity="0.2"
                ></circle>
                <path
                  d="M4 12a8 8 0 0 1 16 0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Activation
