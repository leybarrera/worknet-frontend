import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { codeEndpoints } from '../../api/code/code.api'
import { toast, Toaster } from 'sonner'

const ActivationCode = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email')
  const [data, setData] = useState({
    code: '',
    email: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { value } = e.target
    setData((prev) => ({
      ...prev,
      code: value,
    }))
  }

  const handleSubmit = () => {
    setLoading(true)
    codeEndpoints
      .verificateCode(data.code, data.email)
      .then((res) => {
        clearData()
        const { message } = res.data
        toast.success(message)
        setTimeout(() => {
          navigate('/inicio_sesion')
        }, 2500)
      })
      .catch((err) => {
        if (err.response.data) {
          toast.error(err.response.data.message)
        } else {
          toast.error('Error desconocido. Intente de nuevo.')
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const clearData = () => {
    setData({
      email: '',
      code: '',
    })
  }

  useEffect(() => {
    if (searchParams) {
      setData({
        ...data,
        email: email,
      })
    }
  }, [])

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col justify-center items-center bg-white">
      <div className="w-[800px] flex flex-col gap-2 justify-center items-center py-10 px-5">
        <img
          src="/public/logo-bonilla.png"
          alt=""
          className="w-[250px] h-[250px]"
        />
        <h3 className="text-xl text-center font-semibold">
          Hemos enviado un código de verificación al correo registrado. Recuerda
          que ese código es de uso único y quedará inutilizable después de su
          uso.
        </h3>

        <input
          type="text"
          name="code"
          onChange={handleChange}
          value={data.code}
          className="w-[450px] h-[60px] bg-gray-300 rounded-lg px-2 mt-3 text-xl font-bold text-black outline-none text-center"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-[400px] ${
            loading
              ? 'bg-gray-200 text-gray-600'
              : 'bg-[#F07023] text-white hover:bg-[#f38d44] '
          } mt-4 h-[50px]  text-lg font-bold uppercase rounded-lg  transition-colors`}
        >
          {loading ? 'Verificando' : 'Verificar'}
        </button>
      </div>
      <Toaster richColors />
    </div>
  )
}

export default ActivationCode
