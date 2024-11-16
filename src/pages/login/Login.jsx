import { useState } from 'react'
import { RiLock2Fill, RiMailLine } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import { authEndpoints } from '../../api/auth/auth.api'

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
                navigate('/inicio')
              }, 1500)
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
    <div className="relative w-100 h-screen bg-red-600 overflow-hidden grid grid-cols-2">
      <div className="bg-blue-400 relative w-full">
        <img
          src="/public/portada-2.jpeg"
          className="absolute w-full h-full object-cover"
        />
      </div>
      <div className="bg-lime-50 relative w-full flex flex-col justify-center items-center">
        <div className="w-3/4 flex flex-col gap-10">
          <div>
            <h2 className="text-4xl text-[#00b4b7]">
              Bienvenido a <strong>Worknet</strong>
            </h2>
            <h3 className="text-lg text-gray-500 mb-10">
              La red laboral del municipio de La Maná
            </h3>

            <h5 className="text-xl italic text-gray-600">
              Inicia sesión para acceder a tu perfil, explorar oportunidades y
              conectar con el empleo que buscas.
            </h5>
          </div>

          <form
            action=""
            className="flex flex-col gap-5"
            onSubmit={handlesSubmit}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-lg text-gray-500 font-semibold">
                Correo electrónico
              </label>
              <div className="flex w-full bg-white rounded-lg overflow-hidden focus-within:border-[#00b4b7] border">
                <input
                  type="text"
                  className="h-16 w-full px-5 outline-none rounded-md text-lg text-gray-500"
                  defaultValue={data.email}
                  name="email"
                  onChange={handleChange}
                />
                <div className="w-20 flex justify-center items-center">
                  <RiMailLine size={24} className="text-gray-300" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-gray-500 font-semibold text-lg">
                Contraseña
              </label>
              <div className="flex w-full bg-white rounded-lg overflow-hidden focus-within:border-[#00b4b7] border">
                <input
                  type="password"
                  className="h-16 w-full px-5 outline-none rounded-md text-lg text-gray-500"
                  defaultValue={data.password}
                  name="password"
                  onChange={handleChange}
                />
                <div className="w-20 flex justify-center items-center">
                  <RiLock2Fill size={24} className="text-gray-300" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="h-14 bg-[#00b4b7] text-white text-lg uppercase hover:bg-[#00b4b7]/80 transition-colors"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>

        <p className="absolute bottom-10 text-sm text-gray-500">
          ¿Aún no tienes una cuenta?.{' '}
          <Link
            to="/registro"
            className="underline text-[#00b4b7] hover:text-[#00b4b7]/80 transition-colors font-bold"
          >
            Registrate
          </Link>
        </p>
        <Toaster richColors />
      </div>
    </div>
  )
}

export default Login
