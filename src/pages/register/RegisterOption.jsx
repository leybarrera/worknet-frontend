import { useNavigate } from 'react-router-dom'
import Lottie from 'lottie-react'
import companyAnimation from '../../assets/company.json' // Asegúrate de colocar tu archivo JSON aquí.
import userAnimation from '../../assets/user.json'

const RegisterOption = () => {
  const navigate = useNavigate()

  const handleOptionClick = (role) => {
    if (role === 'user') {
      navigate('/registro/usuario') // Redirige al formulario de usuario
    } else if (role === 'company') {
      navigate('/registro/empresa') // Redirige al formulario de empresa
    }
  }

  const handleBackClick = () => {
    navigate(-1) // Regresa a la página anterior
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#e6f7f8] px-6">
      <h1 className="text-3xl font-bold text-[#007a7d] mb-8 text-center">
        ¿Cómo te gustaría registrarte?
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Opción Usuario */}
        <div
          className="border border-[#007a7d] rounded-lg shadow-lg p-8 bg-white hover:bg-[#007a7d] hover:text-white transition duration-300 cursor-pointer transform hover:scale-105"
          onClick={() => handleOptionClick('user')}
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Soy candidato
          </h2>
          <p className="text-center">
            Regístrate para buscar empleo y conectar con empresas.
          </p>
          {/* Animación Lottie */}
          <div className="mt-4">
            <Lottie
              animationData={userAnimation}
              loop={true}
              style={{ height: 100 }}
            />
          </div>
        </div>
        {/* Opción Empresa */}
        <div
          className="border border-[#007a7d] rounded-lg shadow-lg p-8 bg-white hover:bg-[#007a7d] hover:text-white transition duration-300 cursor-pointer transform hover:scale-105"
          onClick={() => handleOptionClick('company')}
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Busco candidatos
          </h2>
          <p className="text-center ">
            Registra tu empresa y publica ofertas laborales.
          </p>
          {/* Animación Lottie */}
          <div className="mt-4">
            <Lottie
              animationData={companyAnimation}
              loop={true}
              style={{ height: 100 }}
            />
          </div>
        </div>
      </div>
      {/* Botón para volver atrás */}
      <button
        onClick={handleBackClick}
        className="mt-8 px-6 py-3 text-[#007a7d] border border-[#007a7d] rounded-lg hover:bg-[#007a7d] hover:text-white transition duration-300"
      >
        Volver Atrás
      </button>
    </div>
  )
}

export default RegisterOption
