import { useEffect, useState } from 'react'
import {
  RiAlarmWarningLine,
  RiCamera3Fill,
  RiDeleteBinFill,
  RiLoader4Fill,
  RiSave2Line,
  RiSaveFill,
} from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { companyEndpoints } from '../../../api/company/company.api'
import { toast, Toaster } from 'sonner'
import { setCompany } from '../../../redux/slices/session.slice'
import { storageUtil } from '../../../utils/index.utils'
import Swal from 'sweetalert2'

const ConfiguracionEmpresa = () => {
  const [data, setData] = useState(null)
  const [updating, setUpdating] = useState(false)
  // Change Password
  const [updatingPassword, setUpdatingPassword] = useState(false)
  const [isPasswordMatch, setIsPasswordMatch] = useState(false)

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const comparePassword = (password, confirmPassword) => {
    const isMatching = password.trim() === confirmPassword.trim()
    setIsPasswordMatch(isMatching)
  }

  const handlePassword = (e) => {
    const { value } = e.target
    setPassword(value) // Actualizamos el estado de password
    comparePassword(value, confirmPassword) // Verificamos directamente usando el nuevo valor de password
  }

  const handleConfirmPassword = (e) => {
    const { value } = e.target
    setConfirmPassword(value) // Actualizamos el estado de confirmPassword
    comparePassword(password, value) // Verificamos directamente usando el nuevo valor de confirmPassword
  }

  const resetFields = () => {
    setPassword('')
    setConfirmPassword('')
    setIsPasswordMatch(false)
  }

  const updatePassword = () => {
    setUpdatingPassword(true)
    if (isPasswordMatch) {
      companyEndpoints
        .updatePassword(company.id, password)
        .then((res) => {
          const { message } = res.data
          toast.success(message)
          resetFields()
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setUpdatingPassword(false)
        })
    } else {
      toast.error('Las contraseñas no coinciden')
    }
  }
  // End ChangePassword

  // Delete Account

  const questionDeleteAccount = () => {
    Swal.fire({
      title: '¿Deseas eliminar tu cuenta?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00b4b7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        companyEndpoints
          .delete(company.id)
          .then((res) => {
            const { message } = res.data
            toast.success(message)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
  }

  // End Delete Account

  const initialEnabledFields = {
    name: false,
    ruc: false,
    email: false,
    phone: false,
    location: false,
    industry: false,
    website: false,
  }
  const [editableFields, setEditableFields] = useState(initialEnabledFields)

  const { company } = useSelector((state) => state.session)
  const [activeTab, setActiveTab] = useState('general')

  const handleTab = (tab) => setActiveTab(tab)

  const handleEditClick = (field) => {
    setEditableFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const resetEnabledFields = () => setEditableFields(initialEnabledFields)

  const updateDataCompany = () => {
    setUpdating(true)
    companyEndpoints
      .update(company.id, data)
      .then((res) => {
        const { message, companyUpdated } = res.data
        storageUtil.updateStorage('session_info', 'company', companyUpdated)
        setCompany(companyUpdated)
        resetEnabledFields()
        toast.success(message)
      })
      .catch((err) => {
        toast.error('Error al actualizar información. Intente de nuevo.')
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  useEffect(() => {
    setData(company)
  }, [company])

  return (
    <main className="flex flex-col px-5">
      <h2 className="text-3xl font-bold text-[#00b4b7] mb-5">Configuración</h2>

      {/* Menú */}
      <nav className="border-b border-gray-200 flex flex-row">
        <button
          className={`pr-10 py-5 border-b-2  font-bold ${
            activeTab === 'general'
              ? 'text-[#00b4b7]  border-[#00b4b7] '
              : 'text-[#78838B] border-b-transparent'
          }`}
          onClick={() => handleTab('general')}
        >
          Información general
        </button>
        <button
          className={`pr-10 py-5 border-b-2 font-bold  ${
            activeTab === 'login'
              ? 'text-[#00b4b7]  border-[#00b4b7] '
              : 'text-[#78838B] border-b-transparent'
          }`}
          onClick={() => handleTab('login')}
        >
          Inicio y Seguridad
        </button>
      </nav>

      <div className="mt-5">
        {activeTab === 'general' && (
          <div className="flex flex-col">
            {/* Foto de perfil */}
            <div className="w-[200px] h-[200px] rounded-full border-4 border-[#00b4b7] relative">
              <img
                src="/public/company-default.png"
                alt=""
                className="absolute w-full h-full object-cover rounded-full"
              />

              <button className="w-12 h-12 rounded-full bg-[#00b4b7] absolute bottom-1 right-2 border border-gray-200 flex justify-center items-center">
                <RiCamera3Fill size={21} color="#fff" />
              </button>
            </div>

            <div className="mt-10 w-[1000px] flex flex-col px-5 pb-20">
              <div className="flex flex-col border-b border-gray-300 py-5">
                <div className="flex flex-row justify-between">
                  <h3 className="text-[#0A243F] text-md">Nombre</h3>
                  <button
                    className="text-[#83BEBE]"
                    onClick={() => handleEditClick('name')}
                  >
                    {editableFields['name'] ? 'Bloquear' : 'Editar'}
                  </button>
                </div>
                <input
                  type="text"
                  className="mt-2 outline-none text-[#778694]"
                  // value={data?.name}
                  defaultValue={data?.name}
                  name="name"
                  readOnly={!editableFields['name']}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col border-b border-gray-300 py-5">
                <div className="flex flex-row justify-between">
                  <h3 className="text-[#0A243F] text-md">RUC</h3>
                  <button
                    className="text-[#83BEBE]"
                    onClick={() => handleEditClick('ruc')}
                  >
                    {editableFields['ruc'] ? 'Bloquear' : 'Editar'}
                  </button>
                </div>
                <input
                  type="number"
                  className="mt-2 outline-none text-[#778694]"
                  defaultValue={data?.ruc}
                  name="ruc"
                  readOnly={!editableFields['ruc']}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col border-b border-gray-300 py-5">
                <div className="flex flex-row justify-between">
                  <h3 className="text-[#0A243F] text-md">Email</h3>
                  <button
                    className="text-[#83BEBE]"
                    onClick={() => handleEditClick('email')}
                  >
                    {editableFields['email'] ? 'Bloquear' : 'Editar'}
                  </button>
                </div>
                <input
                  type="text"
                  className="mt-2 outline-none text-[#778694]"
                  defaultValue={data?.email}
                  readOnly={!editableFields['email']}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col border-b border-gray-300 py-5">
                <div className="flex flex-row justify-between">
                  <h3 className="text-[#0A243F] text-md">Teléfono</h3>
                  <button
                    className="text-[#83BEBE]"
                    onClick={() => handleEditClick('phone')}
                  >
                    {editableFields['phone'] ? 'Bloquear' : 'Editar'}
                  </button>
                </div>
                <input
                  type="text"
                  className="mt-2 outline-none text-[#778694]"
                  defaultValue={data?.phone}
                  readOnly={!editableFields['phone']}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col border-b border-gray-300 py-5">
                <div className="flex flex-row justify-between">
                  <h3 className="text-[#0A243F] text-md">Ubicación</h3>
                  <button
                    className="text-[#83BEBE]"
                    onClick={() => handleEditClick('location')}
                  >
                    {editableFields['location'] ? 'Bloquear' : 'Editar'}
                  </button>
                </div>
                <input
                  type="text"
                  className="mt-2 outline-none text-[#778694]"
                  defaultValue={data?.location}
                  readOnly={!editableFields['location']}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col border-b border-gray-300 py-5">
                <div className="flex flex-row justify-between">
                  <h3 className="text-[#0A243F] text-md">Industria</h3>
                  <button
                    className="text-[#83BEBE]"
                    onClick={() => handleEditClick('industry')}
                  >
                    {editableFields['industry'] ? 'Bloquear' : 'Editar'}
                  </button>
                </div>
                <input
                  type="text"
                  className="mt-2 outline-none text-[#778694]"
                  defaultValue={data?.industry}
                  readOnly={!editableFields['industry']}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col border-b border-gray-300 py-5">
                <div className="flex flex-row justify-between">
                  <h3 className="text-[#0A243F] text-md">Website</h3>
                  <button
                    className="text-[#83BEBE]"
                    onClick={() => handleEditClick('website')}
                  >
                    {editableFields['website'] ? 'Bloquear' : 'Editar'}
                  </button>
                </div>
                <input
                  type="text"
                  className="mt-2 outline-none text-[#778694]"
                  defaultValue={data?.website}
                  readOnly={!editableFields['website']}
                  onChange={handleChange}
                />
              </div>

              <button
                className="w-full flex flex-row items-center justify-center gap-2 py-3 bg-[#00b4b7] rounded-lg hover:bg-[#4fc5c7] transition-colors duration-300 mt-3"
                onClick={updateDataCompany}
              >
                {updating ? (
                  <>
                    <RiLoader4Fill
                      size={25}
                      color="white"
                      className="animate-spin"
                    />
                    <p className="text-white text-xl font-bold">Actualizando</p>
                  </>
                ) : (
                  <>
                    <RiSave2Line size={25} color="white" />
                    <p className="text-white text-xl font-bold">Actualizar</p>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'login' && (
          <div className="flex flex-col w-[1000px] ">
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-bold">Actualizar contraseña</h3>
              <div className="mt-5 flex flex-col">
                <div className="flex flex-col  py-4 border-b border-gray-200">
                  <h3>Nueva contraseña</h3>
                  <input
                    type="text"
                    className="mt-3 outline-none"
                    onChange={handlePassword}
                    value={password}
                  />
                </div>
                <div className="flex flex-col py-4 ">
                  <h3>Confirmar contraseña</h3>
                  <input
                    type="text"
                    className="mt-3 outline-none"
                    onChange={handleConfirmPassword}
                    value={confirmPassword}
                  />
                </div>

                {password.length > 0 &&
                  confirmPassword.length > 0 &&
                  (isPasswordMatch ? (
                    <p className="text-green-800 text-sm  py-2">
                      Las contraseñas coinciden
                    </p>
                  ) : (
                    <p className="text-red-800 text-sm  py-2">
                      Las contraseñas no coinciden
                    </p>
                  ))}

                <button
                  className={`mt-2 w-full flex flex-row items-center justify-center gap-2 py-3  text-white ${
                    isPasswordMatch ? 'bg-[#00B4B7]' : 'bg-gray-400'
                  }`}
                  onClick={updatePassword}
                  disabled={!isPasswordMatch}
                >
                  {updatingPassword ? (
                    <>
                      <RiLoader4Fill size={25} className="animate-spin" />
                      <p className="text-lg font-bold">Actualizando</p>
                    </>
                  ) : (
                    <>
                      <RiSaveFill size={23} />
                      <p className="text-lg font-bold">Actualizar contraseña</p>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-5">
              <h3 className="text-2xl font-bold">General</h3>
              <div className="mt-2 flex flex-col py-3 border-b border-gray-200">
                <div className="flex flex-row items-center justify-between">
                  <h3 className="text-lg font-bold">Eliminar cuenta</h3>
                  <button
                    className="px-5 py-2 flex flex-row items-center justify-center gap-2 bg-red-700 text-white"
                    onClick={questionDeleteAccount}
                  >
                    <RiDeleteBinFill size={16} />
                    <p className="text-sm font-bold">Eliminar</p>
                  </button>
                </div>

                <div className="mt-2 w-full border border-dashed px-3 py-5 bg-red-300 rounded-lg flex flex-col gap-2">
                  <div className="flex flex-row items-center gap-2">
                    <RiAlarmWarningLine size={20} color="#450a0a" />
                    <h5 className="text-[#450A0A] text-lg">Advertencia</h5>
                  </div>

                  <p>
                    Este proceso eliminará todas las ofertas de trabajo
                    publicadas anteriormente. Esta acción es irreversible. Si
                    estás seguro de continuar, haz clic en Eliminar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Toaster richColors expand={true} />
    </main>
  )
}

export default ConfiguracionEmpresa
