import { useState } from 'react'
import {
  RiLock2Fill,
  RiMailLine,
  RiPhoneFill,
  RiUser3Fill,
} from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import { FaIdCardAlt } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { userEndpoints } from '../../api/user/user.api'
import { useProfile } from '../../hooks/index.hooks'

const RegisterUser = () => {
  const { user } = useProfile()
  const { profile_picture, ...infoUser } = user
  const [data, setData] = useState(infoUser)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { value, name } = e.target

    setData({
      ...data,
      [name]: value,
    })
  }

  const handlesSubmit = async (e) => {
    console.log(data)
    e.preventDefault()
    try {
      if (Object.values(data).every((value) => value !== '')) {
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
    <div className="relative w-100 h-screen bg-[#00b4b7] overflow-hidden grid grid-cols-2">
      <div className="bg-white relative w-full flex flex-col justify-center items-center">
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
                    className="w-full px-4 py-3 text-gray-600 outline-none text-base"
                    defaultValue={data.name}
                    name="name"
                    onChange={handleChange}
                  />
                  <div className="w-20 flex justify-center items-center">
                    <RiUser3Fill size={22} className="text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-lg text-gray-500 font-semibold"
                >
                  Apellidos
                </label>
                <div className="flex w-full bg-white rounded-lg overflow-hidden focus-within:border-[#00b4b7] border">
                  <input
                    type="text"
                    className="w-full px-4 py-3 text-gray-600 outline-none text-base"
                    defaultValue={data.surname}
                    name="surname"
                    onChange={handleChange}
                  />
                  <div className="w-20 flex justify-center items-center">
                    <RiUser3Fill size={22} className="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-lg text-gray-500 font-semibold"
                >
                  DNI
                </label>
                <div className="flex w-full bg-white rounded-lg overflow-hidden focus-within:border-[#00b4b7] border">
                  <input
                    type="text"
                    className="w-full px-4 py-3 text-gray-600 outline-none text-base"
                    defaultValue={data.dni}
                    name="dni"
                    onChange={handleChange}
                  />
                  <div className="w-20 flex justify-center items-center">
                    <FaIdCardAlt size={22} className="text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-lg text-gray-500 font-semibold"
                >
                  Teléfono
                </label>
                <div className="flex w-full bg-white rounded-lg overflow-hidden focus-within:border-[#00b4b7] border">
                  <input
                    type="text"
                    className="w-full px-4 py-3 text-gray-600 outline-none text-base"
                    defaultValue={data.phone}
                    name="phone"
                    onChange={handleChange}
                  />
                  <div className="w-20 flex justify-center items-center">
                    <RiPhoneFill size={22} className="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-lg text-gray-500 font-semibold"
                >
                  Género
                </label>
                <div className="flex w-full bg-white rounded-lg overflow-hidden focus-within:border-[#00b4b7] border">
                  <select
                    className="w-full px-4 py-3 text-gray-600 outline-none text-base bg-white"
                    name="gender"
                    onChange={handleChange}
                    defaultValue={data.gender}
                  >
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                    <option value="Other">Prefiero no decirlo</option>
                  </select>
                  <div className="w-20 flex justify-center items-center">
                    <FaIdCardAlt size={22} className="text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-lg text-gray-500 font-semibold"
                >
                  Dirección
                </label>

                <div className="flex w-full bg-white rounded-lg overflow-hidden focus-within:border-[#00b4b7] border">
                  <input
                    type="text"
                    className="w-full px-4 py-3 text-gray-600 outline-none text-base"
                    defaultValue={data.location}
                    name="location"
                    onChange={handleChange}
                  />
                  <div className="w-20 flex justify-center items-center">
                    <FaLocationDot size={22} className="text-gray-400" />
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
                  className="w-full px-4 py-3 text-gray-600 outline-none text-base"
                  defaultValue={data.email}
                  name="email"
                  onChange={handleChange}
                />
                <div className="w-20 flex justify-center items-center">
                  <RiMailLine size={22} className="text-gray-400" />
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
                  className="w-full px-4 py-3 text-gray-600 outline-none text-base"
                  defaultValue={data.password}
                  name="password"
                  onChange={handleChange}
                />
                <div className="w-20 flex justify-center items-center">
                  <RiLock2Fill size={22} className="text-gray-400" />
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

export default RegisterUser
