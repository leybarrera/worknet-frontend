import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AccesoDengado = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login') // Redirige a la página de inicio o la ruta deseada
    }, 3000)

    return () => clearTimeout(timer) // Limpia el temporizador al desmontar el componente
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-red-600">403</h1>
        <p className="text-xl font-medium text-gray-800 mt-4">
          Acceso no permitido
        </p>
        <p className="text-gray-600 mt-2">
          Serás redirigido al inicio en 3 segundos...
        </p>
        <button
          onClick={() => (window.location.href = '/')}
          className="mt-6 px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Regresar al Inicio
        </button>
      </div>
    </div>
  )
}

export default AccesoDengado
