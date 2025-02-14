import { useState } from 'react'
import {
  RiEarthFill,
  RiHotelFill,
  RiLock2Fill,
  RiMailLine,
  RiPhoneFill,
  RiUser3Fill,
} from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import { useProfile } from '../../hooks/index.hooks'
import { FaIdCardAlt } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { companyEndpoints } from '../../api/company/company.api'

const RegisterCompany = () => {
  const { user } = useProfile()
  const [data, setData] = useState({
    name: '',
    ruc: '',
    phone: '',
    email: '',
    password: '',
    location: '',
    industry: '',
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { value, name } = e.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (Object.values(data).every((value) => value.trim() !== '')) {
        companyEndpoints
          .register(data)
          .then((res) => {
            if (res.status === 201) {
              toast.success('Empresa registrada. Active su cuenta')
              setTimeout(() => {
                navigate(`/account-activation?email=${data.email}`)
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
              Registra tu empresa en la red laboral del GAD de La Maná
            </h3>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-lg text-gray-500 font-semibold"
              >
                Nombre de la Empresa
              </label>
              <div className="flex w-full bg-white rounded-lg overflow-hidden focus-within:border-[#00b4b7] border">
                <input
                  type="text"
                  className="w-full px-4 py-3 text-gray-600 outline-none text-base"
                  name="name"
                  onChange={handleChange}
                />
                <div className="w-20 flex justify-center items-center">
                  <RiUser3Fill size={22} className="text-gray-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="ruc"
                  className="text-lg text-gray-500 font-semibold"
                >
                  RUC
                </label>
                <div className="flex w-full bg-white rounded-lg overflow-hidden focus-within:border-[#00b4b7] border">
                  <input
                    type="text"
                    className="w-full px-4 py-3 text-gray-600 outline-none text-base"
                    name="ruc"
                    onChange={handleChange}
                  />
                  <div className="w-20 flex justify-center items-center">
                    <FaIdCardAlt size={22} className="text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="phone"
                  className="text-lg text-gray-500 font-semibold"
                >
                  Teléfono
                </label>
                <div className="flex w-full bg-white rounded-lg overflow-hidden focus-within:border-[#00b4b7] border">
                  <input
                    type="text"
                    className="w-full px-4 py-3 text-gray-600 outline-none text-base"
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
                  Sector
                </label>
                <div className="flex w-full bg-white rounded-lg overflow-hidden focus-within:border-[#00b4b7] border">
                  <select
                    className="w-full px-4 py-3 text-gray-600 outline-none text-base bg-white"
                    name="industry"
                    onChange={handleChange}
                    defaultValue={data.gender}
                  >
                    <option value="">Seleccione el sector</option>
                    <option value="comercial">Comercial</option>
                    <option value="industrial">Industrial</option>
                    <option value="residencial">Residencial</option>
                    <option value="educativo">Educativo</option>
                    <option value="agrícola">Agrícola</option>
                    <option value="turístico">Turístico</option>
                    <option value="financiero">Financiero</option>
                    <option value="gubernamental">Gubernamental</option>
                    <option value="tecnológico">Tecnológico</option>
                    <option value="salud">Salud</option>
                  </select>
                  <div className="w-20 flex justify-center items-center">
                    <RiHotelFill size={22} className="text-gray-400" />
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
              <label
                htmlFor="email"
                className="text-lg text-gray-500 font-semibold"
              >
                Email
              </label>
              <div className="flex w-full bg-white rounded-lg overflow-hidden focus-within:border-[#00b4b7] border">
                <input
                  type="email"
                  className="w-full px-4 py-3 text-gray-600 outline-none text-base"
                  name="email"
                  onChange={handleChange}
                />
                <div className="w-20 flex justify-center items-center">
                  <RiMailLine size={22} className="text-gray-400" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-lg text-gray-500 font-semibold"
              >
                Contraseña
              </label>
              <div className="flex w-full bg-white rounded-lg overflow-hidden focus-within:border-[#00b4b7] border">
                <input
                  type="password"
                  className="w-full px-4 py-3 text-gray-600 outline-none text-base"
                  name="password"
                  onChange={handleChange}
                />
                <div className="w-20 flex justify-center items-center">
                  <RiLock2Fill size={22} className="text-gray-400" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="website"
                className="text-lg text-gray-500 font-semibold"
              >
                Sitio Web
              </label>
              <div className="flex w-full bg-white rounded-lg overflow-hidden focus-within:border-[#00b4b7] border">
                <input
                  type="url"
                  className="w-full px-4 py-3 text-gray-600 outline-none text-base"
                  name="website"
                  onChange={handleChange}
                />
                <div className="w-20 flex justify-center items-center">
                  <RiEarthFill size={22} className="text-gray-400" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="h-14 bg-[#00b4b7] text-white text-lg uppercase hover:bg-[#00b4b7]/80 transition-colors"
            >
              Registrar Empresa
            </button>
          </form>
        </div>

        <p className="absolute bottom-10 text-sm text-gray-500">
          ¿Ya tienes una cuenta?{' '}
          <Link
            to="/inicio_sesion"
            className="underline text-[#00b4b7] hover:text-[#00b4b7]/80 transition-colors font-bold"
          >
            Inicia sesión
          </Link>
        </p>
        <Toaster richColors />
      </div>
      <div className="bg-blue-400 relative w-full">
        <img
          src="/public/portada.jpg"
          className="absolute w-full h-full object-cover"
        />
      </div>
    </div>
  )
}

export default RegisterCompany
