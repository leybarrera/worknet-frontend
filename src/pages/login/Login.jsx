import { useState } from 'react'
import { RiLock2Fill, RiMailLine } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import { authEndpoints } from '../../api/auth/auth.api'
import { storageUtil } from '../../utils/index.utils'

const Login = () => {
  const initialData = {
    email: '',
    password: '',
  }
  const [data, setData] = useState(initialData)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { value, name } = e.target

    setData({
      ...data,
      [name]: value,
    })

    console.log(data)
  }

  const handlesSubmit = async (e) => {
    e.preventDefault()
    try {
      if (data.email && data.password) {
        authEndpoints
          .login(data)
          .then((res) => {
            if (res.status === 200) {
              toast.success('Inicio de sesión exitoso')
              setTimeout(() => {
                storageUtil.saveToLocalStorage('session_info', res.data)
                navigate('/') // Redirige al inicio después del login
              }, 1500) // El retraso de 1.5 segundos para la redirección
            }
          })
          .catch((err) => {
            const { message } = err.response.data
            toast.error(message)
          })
      } else {
        toast.error('Todos los campos son obligatorios')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="relative w-full h-screen grid grid-cols-2 overflow-hidden">
      {/* Sección Izquierda */}
      <div className="relative w-full h-screen">
        <img
          src="/public/portada-2.jpeg"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/40" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-white px-10">
          <h2 className="text-5xl font-bold mb-5">¡Bienvenido a Worknet!</h2>
          <p className="text-lg text-gray-200 text-center">
            La red laboral del municipio de La Maná. Conecta con oportunidades y
            construye tu futuro profesional.
          </p>
        </div>
      </div>

      {/* Sección Derecha */}
      <div className="relative w-full flex flex-col justify-center items-center bg-gray-50">
        <div className="w-3/4 max-w-[400px] flex flex-col gap-8">
          {/* Encabezado */}
          <div>
            <h3 className="text-3xl font-bold text-[#00b4b7] mb-2">
              Inicia Sesión
            </h3>
            <p className="text-gray-500">
              Accede a tu perfil, explora oportunidades y conecta con el empleo
              que buscas.
            </p>
          </div>

          {/* Formulario */}
          <form
            action=""
            className="flex flex-col gap-6"
            onSubmit={handlesSubmit}
          >
            {/* Campo Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-gray-600 font-medium">
                Correo Electrónico
              </label>
              <div className="flex items-center bg-white rounded-lg shadow-md overflow-hidden">
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={data.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-gray-600 outline-none text-base"
                  placeholder="ejemplo@email.com"
                />
                <div className="px-3">
                  <RiMailLine size={24} className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* Campo Contraseña */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-gray-600 font-medium">
                Contraseña
              </label>
              <div className="flex items-center bg-white rounded-lg shadow-md overflow-hidden">
                <input
                  type="password"
                  id="password"
                  name="password"
                  defaultValue={data.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-gray-600 outline-none text-base"
                  placeholder="••••••••"
                />
                <div className="px-3">
                  <RiLock2Fill size={24} className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* Botón de Iniciar Sesión */}
            <button
              type="submit"
              className="w-full py-3 bg-[#00b4b7] text-white font-bold rounded-lg shadow-md hover:bg-[#00b4b7]/90 transition-all"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>

        {/* Registro */}
        <p className="absolute bottom-8 text-sm text-gray-500">
          ¿Aún no tienes una cuenta?{' '}
          <Link
            to="/register_option"
            className="text-[#00b4b7] font-medium underline hover:text-[#009ea0] transition-all"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
      <Toaster richColors />
    </div>
  )
}

export default Login
