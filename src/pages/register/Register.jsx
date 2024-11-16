import { useState } from 'react'
import { RiLock2Fill, RiMailLine, RiUser3Fill } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import { FaIdCardAlt } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { userEndpoints } from '../../api/user/user.api'

const Register = () => {
  const initialData = {
    name: '',
    surname: '',
    email: '',
    password: '',
    location: '',
  }
  const [data, setData] = useState(initialData)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { value, name } = e.target

    setData({
      ...data,
      [name]: value,
    })
  }

  const handlesSubmit = async (e) => {
    e.preventDefault()
    try {
      if (data.email && data.password) {
        userEndpoints
          .register(data)
          .then((res) => {
            if (res.status === 201) {
              toast.success('Usuario registrado con éxito')
              setTimeout(() => {
                navigate('/inicio_sesion')
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
      <div className="bg-lime-50 relative w-full flex flex-col justify-center items-center">
        <div className="w-3/4 flex flex-col gap-2">
          <div>
            <h2 className="text-4xl text-[#00b4b7]">
              Bienvenido a <strong>Worknet</strong>
            </h2>
            <h3 className="text-lg text-gray-500 mb-5">
              La red laboral del municipio de La Maná
            </h3>
          </div>

          <form
            action=""
            className="flex flex-col gap-5"
            onSubmit={handlesSubmit}
          >
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-lg text-gray-500 font-semibold"
                >
                  Nombres
                </label>
                <div className="flex w-full bg-white rounded-lg overflow-hidden focus-within:border-[#00b4b7] border">
                  <input
                    type="text"
                    className="h-16 w-full px-5 outline-none rounded-md text-lg text-gray-500"
                    defaultValue={data.name}
                    name="name"
                    onChange={handleChange}
                  />
                  <div className="w-20 flex justify-center items-center">
                    <RiUser3Fill size={24} className="text-gray-300" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-gray-500 font-semibold text-lg"
                >
                  Apellidos
                </label>
                <div className="flex w-full bg-white rounded-lg overflow-hidden focus-within:border-[#00b4b7] border">
                  <input
                    type="text"
                    className="h-16 w-full px-5 outline-none rounded-md text-lg text-gray-500"
                    defaultValue={data.surname}
                    name="surname"
                    onChange={handleChange}
                  />
                  <div className="w-20 flex justify-center items-center">
                    <RiUser3Fill size={24} className="text-gray-300" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-lg text-gray-500 font-semibold">
                Email
              </label>
              <div className="flex w-full bg-white rounded-lg overflow-hidden focus-within:border-[#00b4b7] border">
                <input
                  type="email"
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
              <label htmlFor="" className="text-lg text-gray-500 font-semibold">
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

            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-lg text-gray-500 font-semibold">
                Género
              </label>
              <div className="flex w-full bg-white rounded-lg overflow-hidden focus-within:border-[#00b4b7] border">
                <select
                  className="h-16 w-full px-5 outline-none bg-white rounded-md text-lg text-gray-500"
                  name="gender"
                  onChange={handleChange}
                >
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                  <option value="Other">Prefiero no decirlo</option>
                </select>
                <div className="w-20 flex justify-center items-center">
                  <FaIdCardAlt size={24} className="text-gray-300" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-lg text-gray-500 font-semibold">
                Dirección
              </label>

              <div className="flex w-full bg-white rounded-lg overflow-hidden focus-within:border-[#00b4b7] border">
                <input
                  type="text"
                  className="h-16 w-full px-5 outline-none rounded-md text-lg text-gray-500"
                  defaultValue={data.address}
                  name="address"
                  onChange={handleChange}
                />
                <div className="w-20 flex justify-center items-center">
                  <FaLocationDot size={24} className="text-gray-300" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="h-14 bg-[#00b4b7] text-white text-lg uppercase hover:bg-[#00b4b7]/80 transition-colors"
            >
              Registrarme
            </button>
          </form>
        </div>

        <p className="absolute bottom-10 text-sm text-gray-500">
          Ya tengo una cuenta.{' '}
          <Link
            to="/inicio_sesion"
            className="underline text-[#00b4b7] hover:text-[#00b4b7]/80 transition-colors font-bold"
          >
            Iniciar sesión
          </Link>
        </p>
        <Toaster richColors />
      </div>
      <div className="bg-blue-400 relative w-full">
        <img
          src="/public/portada-2.jpeg"
          className="absolute w-full h-full object-cover"
        />
      </div>
    </div>
  )
}

export default Register
