import React, { useEffect, useState } from 'react'
import { RiCameraFill, RiUploadCloudFill } from 'react-icons/ri'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
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
import { userEndpoints } from '../../api/user/user.api'
import { settingsEndpoint } from '../../api/settings/settings.api'
import { storageUtil } from '../../utils/index.utils'
import { toast, Toaster } from 'sonner'
import { useNavigate } from 'react-router-dom'

const Settings = () => {
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

  const handleSave = () => {
    if (!resume) {
      setError('Por favor, seleccione un curriculum para guardar.')
      return
    }
    setResumeUri(resume)
    setResume(null)
  }

  const handleCancel = () => {
    setResume(null)
    setResumeUri(null)
    setError('')
  }

  const navigate = useNavigate()

  const handleDelete = () => {}

  // Función para ver el currículum (solo como ejemplo, puedes agregar funcionalidad real)
  const handleView = () => {
    alert('Ver currículum: funcionalidad a implementar')
  }

  const addItem = (list, setList, item, resetItem) => {
    console.log(item)
    if (Object.values(item).some((value) => value === '')) return // Evitar agregar vacíos
    setList([...list, item])
    resetItem()
  }

  const createFormData = () => {
    const formData = new FormData()

    // Agregar los datos al FormData
    formData.append('user_info', JSON.stringify(user))
    formData.append('education', JSON.stringify(educationList))
    formData.append('experience', JSON.stringify(experienceList))
    formData.append('skills', JSON.stringify(skillsList))
    formData.append('language', JSON.stringify(languageList))
    formData.append('references', JSON.stringify(referencesList))
    formData.append('resume', resumeUri) // Agregar el archivo resume (File o Blob)
    formData.append('image', image) // Agregar la imagen (File o Blob)

    return formData
    // Imprimir los datos en la consola
    // for (const [key, value] of formData.entries()) {
    //   // Si el valor es un archivo (File o Blob), mostramos detalles como el nombre
    //   if (value instanceof File) {
    //     console.log(`${key}: ${value.name}, ${value.size} bytes, ${value.type}`)
    //   } else if (
    //     key !== 'resume' &&
    //     key !== 'image' &&
    //     value &&
    //     value.startsWith('{')
    //   ) {
    //     // Si es un string que parece JSON, tratamos de parsearlo
    //     try {
    //       console.log(key, JSON.parse(value))
    //     } catch (e) {
    //       console.log(key, value) // Si no es un JSON válido, lo mostramos tal cual
    //     }
    //   } else {
    //     console.log(key, value) // Para otros casos
    //   }
    // }
  }

  const handleSubmit = async () => {
    const data = createFormData()
    settingsEndpoint
      .saveSettings(data, user.id)
      .then((res) => {
        toast.success('Configuración guardada con éxito')
        setTimeout(() => {
          navigate('/')
        }, 1500)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getSkillName = (id) => skills.find((skill) => skill.id === id)?.name

  return (
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
            className="h-full bg-[#00b4b7]"
            style={{ width: `${10}%` }}
          ></div>
        </div>
        <p className="text-sm text-[#666] mt-2">{10}% completado</p>
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
                onClick={handleSave}
                className="px-6 py-3 bg-[#00b4b7] text-white font-semibold rounded-lg hover:bg-[#008d90] transition duration-200"
              >
                Guardar Currículum
              </button>
            </div>

            <TransitionGroup className="mt-4">
              {resumeUri ? (
                <div className="mt-6">
                  <h4 className="font-semibold text-lg">
                    Detalles del archivo:
                  </h4>
                  <table className="min-w-full mt-2 border-collapse">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left border border-gray-300">
                          Nombre del archivo
                        </th>
                        <th className="px-4 py-2 text-left border border-gray-300">
                          Formato
                        </th>
                        <th className="px-4 py-2 text-left border border-gray-300">
                          Tamaño
                        </th>
                        <th className="px-4 py-2 text-left border border-gray-300">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2 border border-gray-300">
                          {resumeUri.name}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {resumeUri.type}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {resumeUri.size / 1024 > 1024
                            ? (resumeUri.size / (1024 * 1024)).toFixed(2) +
                              ' MB'
                            : (resumeUri.size / 1024).toFixed(2) + ' KB'}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          <button
                            onClick={handleView}
                            className="text-blue-500 hover:text-blue-700 mr-2"
                          >
                            Ver
                          </button>
                          <button
                            onClick={() => {
                              setResumeUri(null)
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-gray-500 mt-4">
                  No has subido ningún currículum todavía.
                </p>
              )}
            </TransitionGroup>
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
      />

      {/* Experiencia Laboral */}
      <ExperienciaLaboral
        experience={experience}
        updateExperience={updateExperience}
        addItem={addItem}
        experienceList={experienceList}
        setExperienceList={setExperienceList}
      />

      {/* Habilidades  */}
      <Habilidades
        updateSkill={updateSkill}
        addItem={addItem}
        skillsList={skillsList}
        setSkillsList={setSkillsList}
        skill={skill}
        getSkillName={getSkillName}
      />

      {/* Idiomas */}
      <Language
        addItem={addItem}
        language={language}
        updateLanguage={updateLanguage}
        languageList={languageList}
        setLanguageList={setLanguageList}
      />

      {/* Referencias */}
      <Referencias
        addItem={addItem}
        reference={reference}
        updateReference={updateReference}
        referencesList={referencesList}
        setReferencesList={setReferencesList}
      />

      <button
        className="px-5 py-3 text-lg text-white bg-[#00b4b7] rounded-md hover:bg-[#00a7a3] transition-colors w-full"
        onClick={handleSubmit}
      >
        Guardar cambios
      </button>

      <Toaster richColors />
    </div>
  )
}

export default Settings
