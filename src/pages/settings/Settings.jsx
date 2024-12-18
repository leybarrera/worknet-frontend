import { useEffect, useState } from 'react'
import { RiCameraFill, RiUploadCloudFill } from 'react-icons/ri'
import { TransitionGroup } from 'react-transition-group'
import './Settings.css' // Estilos para animaciones
import {
  useEducation,
  useExperience,
  useLanguage,
  useProfile,
  useReferences,
  useSkill,
} from '../../hooks/index.hooks'
import { useSelector } from 'react-redux'
import Education from '../../components/forms/Education'
import ExperienciaLaboral from '../../components/forms/ExperienciaLaboral'
import Habilidades from '../../components/forms/Habilidades'
import Language from '../../components/forms/Language'
import Referencias from '../../components/forms/Referencias'
import { settingsEndpoint } from '../../api/settings/settings.api'
import { toast, Toaster } from 'sonner'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import { userEndpoints } from '../../api/user/user.api'
import NotificationModal from '../../components/modal/NotificationModal'

const Settings = () => {
  const [profileCompleted, setProfileCompleted] = useState(false)
  // Prra trabajar con la barra de profeso de configuracion
  const [completedSections, setCompletedSections] = useState(1)
  const [widthBar, setWidthBar] = useState(
    Math.floor((completedSections / 7) * 100)
  )

  const widthBarCalc = () => {
    const newWidth = Math.floor((completedSections / 7) * 100)
    setWidthBar((prev) => newWidth)
  }

  const completeSection = () => {
    setCompletedSections((prev) => prev + 1)
  }

  const [isMounted, setIsMounted] = useState(false)
  const [imageUri, setImageUri] = useState(null)
  const [image, setImage] = useState(null)
  const { skills } = useSelector((state) => state.skills)
  const { user, updateUser, updateProfilePicture } = useProfile()

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      const uri = URL.createObjectURL(file)
      setImageUri(uri)
      setImage(file)
    }
  }

  useEffect(() => {
    if (imageUri) {
      updateProfilePicture(imageUri)
    }
  }, [imageUri])

  const { education, updateEducation } = useEducation()
  const { experience, updateExperience } = useExperience()
  const { reference, updateReference } = useReferences()
  const { skill, updateSkill } = useSkill()
  const { language, updateLanguage } = useLanguage()

  const [educationList, setEducationList] = useState([])
  const [experienceList, setExperienceList] = useState([])
  const [skillsList, setSkillsList] = useState([])
  const [languageList, setLanguageList] = useState([])
  const [referencesList, setReferencesList] = useState([])

  const [resume, setResume] = useState(null)
  const [resumeUri, setResumeUri] = useState(null)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleResumeChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('El archivo supera el tamaño permitido (2MB).')
        setResume(null)
      } else {
        const validTypes = ['application/pdf']
        if (validTypes.includes(file.type)) {
          setResume(file)
          setError('')
        } else {
          setError('El archivo debe ser de tipo PDF.')
          setResume(null)
        }
      }
    }
  }

  const handleCancel = () => {
    setResume(null)
    setResumeUri(null)
    setError('')
  }

  const addItem = (list, setList, item, resetItem) => {
    console.log(item)
    if (Object.values(item).some((value) => value === '')) return // Evitar agregar vacíos
    setList([...list, item])
    resetItem()
  }

  const saveInfoUser = async () => {
    const formData = new FormData()
    formData.append('user_info', JSON.stringify(user))

    userEndpoints
      .saveInfoUser(user.id, formData)
      .then((res) => {
        const { message } = res.data
        toast.success(message)
        setCompletedSections((prev) => prev + 1)
      })
      .catch((err) => {
        const { message } = err.response.data
        toast.error(message)
      })
  }
  const saveResume = async () => {
    const formData = new FormData()
    formData.append('resume', resumeUri)
    userEndpoints
      .saveResume(user.id, formData)
      .then((res) => {
        const { message } = res.data
        toast.success(message)
        setCompletedSections((prev) => prev + 1)
      })
      .catch((err) => {
        const { message } = err.response.data
        toast.error(message)
      })
  }
  const saveEducation = async () => {
    userEndpoints
      .saveEducation(user.id, educationList)
      .then((res) => {
        const { message } = res.data
        toast.success(message)
        setCompletedSections((prev) => prev + 1)
      })
      .catch((err) => {
        const { message } = err.response.data
        toast.error(message)
      })
  }
  const saveWorkExperience = async () => {
    userEndpoints
      .saveExperience(user.id, experienceList)
      .then((res) => {
        const { message } = res.data
        toast.success(message)
        setCompletedSections((prev) => prev + 1)
      })
      .catch((err) => {
        const { message } = err.response.data
        toast.error(message)
      })
  }
  const saveSkills = async () => {
    userEndpoints
      .saveSkills(user.id, skillsList)
      .then((res) => {
        const { message } = res.data
        toast.success(message)
        setCompletedSections((prev) => prev + 1)
      })
      .catch((err) => {
        const { message } = err.response.data
        toast.error(message)
      })
  }
  const saveLanguages = async () => {
    userEndpoints
      .saveLanguages(user.id, languageList)
      .then((res) => {
        const { message } = res.data
        toast.success(message)
        setCompletedSections((prev) => prev + 1)
      })
      .catch((err) => {
        const { message } = err.response.data
        toast.error(message)
      })
  }
  const saveReferences = async () => {
    userEndpoints
      .saveReferences(user.id, referencesList)
      .then((res) => {
        const { message } = res.data
        toast.success(message)
        setCompletedSections((prev) => prev + 1)
      })
      .catch((err) => {
        const { message } = err.response.data
        toast.error(message)
      })
  }

  const getSkillName = (id) => skills.find((skill) => skill.id === id)?.name

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true)
    }, 3500)
  }, [])

  useEffect(() => {
    if (profileCompleted) {
      setTimeout(() => {
        navigate('/')
      }, 2500)
    }
  }, [profileCompleted])

  useEffect(() => {
    if (widthBar >= 100) {
      setTimeout(() => {
        setProfileCompleted(true)
      }, 2500)
    }
  }, [widthBar])

  useEffect(() => {
    widthBarCalc()
  }, [completedSections])

  if (!isMounted) return <Loader text={'Cargando configuración...'} />

  return profileCompleted ? (
    <NotificationModal />
  ) : (
    <div className="w-3/4 mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center text-[#333333]">
        Configuración de Cuenta
      </h1>

      {/* Progreso de  configuracion*/}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#333333] mb-2">
          Progreso del Perfil
        </h2>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-[#00b4b7] transition-all duration-300 ease-in-out"
            style={{ width: `${widthBar}%` }}
          ></div>
        </div>
        <p className="text-sm text-[#666] mt-2">{widthBar}% completado</p>
      </div>

      {/* Datos personales */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#333333] mb-2">
          Datos Personales
        </h2>

        {/* Imagen de perfil */}
        <div className="mb-6 flex justify-center items-center">
          <div className="relative">
            {/* Mostrar la imagen de perfil */}
            <img
              src={user.profile_picture || '/public/profile.png'} // Usar la nueva imagen o la predeterminada
              alt="Perfil"
              className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover"
            />

            {/* Botón de la cámara */}
            <label
              htmlFor="file-input"
              className="absolute bottom-2 right-2 w-10 h-10 rounded-full flex items-center justify-center bg-[#00b4b7] cursor-pointer"
            >
              <RiCameraFill size={20} className="text-white" />
            </label>

            {/* Input de tipo file oculto */}
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleImage}
              style={{ display: 'none' }} // Hacer que el input de archivo sea invisible
            />
          </div>
        </div>

        {/* Formulario */}
        <div className="mb-6">
          {/* 2 columnas */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="" className="text-lg font-semibold">
                Nombres
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
                name="name"
                defaultValue={user.name}
                onChange={updateUser}
              />
            </div>

            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="" className="text-lg font-semibold">
                Apellidos
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
                name="surname"
                defaultValue={user.surname}
                onChange={updateUser}
              />
            </div>
          </div>

          {/* 2 columnas */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="" className="text-lg font-semibold">
                DNI
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
                name="dni"
                defaultValue={user.dni}
                onChange={updateUser}
              />
            </div>

            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="" className="text-lg font-semibold">
                Teléfono
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
                name="phone"
                defaultValue={user.phone}
                onChange={updateUser}
              />
            </div>
          </div>

          {/* 2 columnas */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="" className="text-lg font-semibold">
                Email
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
                name="email"
                defaultValue={user.email}
                onChange={updateUser}
              />
            </div>

            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="" className="text-lg font-semibold">
                Contraseña
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
                name="password"
                defaultValue={user.password}
                onChange={updateUser}
              />
            </div>
          </div>

          {/* Botón */}
          <button
            className="w-full py-3 font-semibold text-white bg-[#00b4b7] rounded-lg hover:bg-[#00b4b7]/90 transition"
            onClick={saveInfoUser}
          >
            Guardar cambios
          </button>
        </div>
      </div>

      {/* Curriculum */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#333333] mb-4">
          Subir Currículum
        </h2>

        {/* Contenedor principal */}
        <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
          <div className="grid grid-cols-1 gap-4">
            {/* Título y descripción */}
            <div>
              <h3 className="text-lg font-semibold text-[#333333]">
                Selecciona tu Currículum
              </h3>
              <p className="text-sm text-gray-500">
                Suba un archivo en formato PDF, DOC o DOCX. Tamaño máximo: 2MB.
              </p>
            </div>

            {/* Zona para subir archivo */}
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition">
              <label
                htmlFor="resume"
                className="cursor-pointer flex flex-col items-center"
              >
                <RiUploadCloudFill size={40} className="text-[#00b4b7] mb-2" />
                <span className="text-sm text-gray-600 font-medium">
                  Arrastra tu archivo aquí o haz clic para seleccionarlo
                </span>
              </label>
              <input
                type="file"
                id="resume"
                name="resume"
                accept=".pdf"
                className="hidden"
                onChange={handleResumeChange}
              />
            </div>

            {/* Nombre del archivo subido */}
            {resume && (
              <div className="text-sm text-gray-700 mt-2">
                Archivo seleccionado: <strong>{resume.name}</strong>
              </div>
            )}

            {/* Botones */}
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={handleCancel}
                className="px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={saveResume}
                className="px-6 py-3 bg-[#00b4b7] text-white font-semibold rounded-lg hover:bg-[#008d90] transition duration-200"
              >
                Guardar Currículum
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Educacion */}
      <Education
        education={education}
        updateEducation={updateEducation}
        addItem={addItem}
        educationList={educationList}
        setEducationList={setEducationList}
        saveEducation={saveEducation}
      />

      {/* Experiencia Laboral */}
      <ExperienciaLaboral
        experience={experience}
        updateExperience={updateExperience}
        addItem={addItem}
        experienceList={experienceList}
        setExperienceList={setExperienceList}
        saveWorkExperience={saveWorkExperience}
      />

      {/* Habilidades  */}
      <Habilidades
        updateSkill={updateSkill}
        addItem={addItem}
        skillsList={skillsList}
        setSkillsList={setSkillsList}
        skill={skill}
        getSkillName={getSkillName}
        saveSkills={saveSkills}
      />

      {/* Idiomas */}
      <Language
        addItem={addItem}
        language={language}
        updateLanguage={updateLanguage}
        languageList={languageList}
        setLanguageList={setLanguageList}
        saveLanguages={saveLanguages}
      />

      {/* Referencias */}
      <Referencias
        addItem={addItem}
        reference={reference}
        updateReference={updateReference}
        referencesList={referencesList}
        setReferencesList={setReferencesList}
        saveReferences={saveReferences}
      />
      <Toaster richColors />
    </div>
  )
}

export default Settings
