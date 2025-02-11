import { useEffect, useState } from 'react'
import { RiCamera3Fill, RiLoader4Fill, RiSave2Line } from 'react-icons/ri'
import { storageUtil } from '../../utils/index.utils'
import { userEndpoints } from '../../api/user/user.api'
import { toast, Toaster } from 'sonner'

const ProfileTab = () => {
  const [data, setData] = useState(null)
  const [updating, setUpdating] = useState(false)
  const [image, setImage] = useState(null)
  const [imageUri, setImageUri] = useState(null)

  const initialEnabledFields = {
    name: false,
    surname: false,
    email: false,
    phone: false,
    dni: false,
    location: false,
    gender: false,
  }

  const [editableFields, setEditableFields] = useState(initialEnabledFields)

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

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const uri = URL.createObjectURL(file)
      setImageUri(uri)
      setImage(file)
    }
  }
  const updateLocalStorage = () => {
    const dataStorage = storageUtil.getFromLocalStorage('session_info')
    const { token } = dataStorage

    userEndpoints.getById(data.id).then((res) => {
      const { user } = res.data
      storageUtil.saveToLocalStorage('session_info', {
        token,
        user,
      })
    })
  }

  const handleSubmit = () => {
    const formData = new FormData()

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })

    if (image) {
      formData.append('profile_picture', image)

      userEndpoints
        .updateWithImage(formData)
        .then((res) => {
          const { message } = res.data
          toast.success(message)
          updateLocalStorage()
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      userEndpoints
        .updateWithoutImage(formData)
        .then((res) => {
          const { message } = res.data
          toast.success(message)
          updateLocalStorage()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  useEffect(() => {
    const { user } = storageUtil.getFromLocalStorage('session_info')
    if (user !== null || user !== undefined) {
      setData(user)
    }
  }, [])

  return (
    <div className="flex flex-col ">
      <div className="w-[200px] h-[200px] rounded-full border-4 border-[#00b4b7] relative">
        <img
          src={imageUri || data?.profile_picture || '/men.png'}
          alt="Profile"
          className="absolute w-full h-full object-cover rounded-full"
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="imageUpload"
          onChange={handleImageChange}
        />
        <label
          htmlFor="imageUpload"
          className="w-12 h-12 rounded-full bg-[#00b4b7] absolute bottom-1 right-2 border border-gray-200 flex justify-center items-center cursor-pointer"
        >
          <RiCamera3Fill size={21} color="#fff" />
        </label>
      </div>

      <div className="mt-10 w-[1000px] flex flex-col px-5 pb-20">
        {['name', 'surname', 'email', 'phone', 'location'].map((field) => (
          <div
            key={field}
            className="flex flex-col border-b border-gray-300 py-5"
          >
            <div className="flex flex-row justify-between">
              <h3 className="text-[#0A243F] text-md">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </h3>
              <button
                className="text-[#83BEBE]"
                onClick={() => handleEditClick(field)}
              >
                {editableFields[field] ? 'Bloquear' : 'Editar'}
              </button>
            </div>
            <input
              type="text"
              className="mt-2 outline-none text-[#778694]"
              defaultValue={data?.[field]}
              name={field}
              readOnly={!editableFields[field]}
              onChange={handleChange}
            />
          </div>
        ))}

        <div className="flex flex-col border-b border-gray-300 py-5">
          <div className="flex flex-row justify-between">
            <h3 className="text-[#0A243F] text-md">DNI</h3>
          </div>
          <input
            type="number"
            className="mt-2 outline-none text-[#778694]"
            defaultValue={data?.dni}
            readOnly={true}
          />
        </div>

        <button
          className="w-full flex flex-row items-center justify-center gap-2 py-3 bg-[#00b4b7] rounded-lg hover:bg-[#4fc5c7] transition-colors duration-300 mt-3"
          onClick={handleSubmit}
        >
          {updating ? (
            <>
              <RiLoader4Fill size={25} color="white" className="animate-spin" />
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
      <Toaster richColors />
    </div>
  )
}

export default ProfileTab
