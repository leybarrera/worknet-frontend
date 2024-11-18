import React, { useState } from 'react'
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

const Settings = () => {
  const { education, updateEducation } = useEducation()
  const { experience, updateExperience } = useExperience()
  const { reference, updateReference } = useReferences()
  const { skill, updateSkill } = useSkill()
  const { language, updateLanguage } = useLanguage()
  const { user, updateUser } = useProfile()

  const [educationList, setEducationList] = useState([])
  const [experienceList, setExperienceList] = useState([])
  const [skillsList, setSkillsList] = useState([])
  const [languageList, setLanguageList] = useState([])
  const [referencesList, setReferencesList] = useState([])

  const [resume, setResume] = React.useState(null)

  const handleResumeChange = (event) => {
    const file = event.target.files[0]
    if (file && file.size <= 2 * 1024 * 1024) {
      setResume(file)
    } else {
      alert('El archivo supera el tamaño permitido (2MB).')
    }
  }

  const handleSave = () => {
    console.log(education)
  }

  const handleCancel = () => {
    setResume(null)
  }

  const addItem = (list, setList, item, resetItem) => {
    if (Object.values(item).some((value) => value === '')) return // Evitar agregar vacíos
    setList([...list, item])
    resetItem()
  }

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
            <img
              src={user.profile_picture || '/public/profile.png'}
              alt="Perfil"
              className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover"
            />
            <button className="absolute bottom-2 right-2 w-10 h-10 rounded-full flex items-center justify-center bg-[#00b4b7]">
              <RiCameraFill size={20} className="text-white" />
            </button>
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
                accept=".pdf, .doc, .docx"
                className="hidden"
                // onChange={handleResumeChange}
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
          </div>
        </div>
      </div>

      {/* Educacion */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#333333] mb-2">
          Educación
        </h2>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <input
            type="text"
            defaultValue={education.institution}
            onChange={updateEducation}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
            placeholder="Institución"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <input
            type="text"
            defaultValue={education.degree_obtained}
            onChange={updateEducation}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
            placeholder="Grado obtenido"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="grid grid-cols-1 gap-2">
            <label htmlFor="" className="text-lg font-semibold">
              Fecha de Inicio
            </label>
            <input
              type="date"
              name="start_date"
              defaultValue={education.start_date}
              onChange={updateEducation}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
            />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <label htmlFor="" className="text-lg font-semibold">
              Fecha de Finalización
            </label>
            <input
              type="date"
              name="end_date"
              defaultValue={education.end_date}
              onChange={updateEducation}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
            />
          </div>
        </div>

        <button
          onClick={() =>
            addItem(educationList, setEducationList, education, () =>
              updateEducation({
                institution: '',
                degree_obtained: '',
                start_date: '',
                end_date: '',
              })
            )
          }
          className="px-5 py-2 text-sm text-white bg-[#00b4b7] rounded-md hover:bg-[#00a7a3] transition-colors"
        >
          Agregar educación
        </button>

        {/* Lista de educación */}
        <TransitionGroup className="mt-4">
          {educationList.map((edu, index) => (
            <CSSTransition key={index} timeout={300} classNames="fade">
              <div className="flex justify-between items-center p-2 bg-gray-100 rounded-lg mb-2">
                <div>
                  <p className="font-semibold">{edu.institution}</p>
                  <p className="text-sm">
                    {edu.degree_obtained} - {edu.start_date} a {edu.end_date}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEducationList(
                      educationList.filter((_, i) => i !== index)
                    )
                  }
                  className="text-red-500 font-bold"
                >
                  X
                </button>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>

      {/* Experiencia Laboral */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#333333] mb-2">
          Experiencia Laboral
        </h2>

        <div className="grid grid-cols-1 gap-4 mb-4">
          <input
            type="text"
            value={experience.company}
            onChange={updateExperience}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
            placeholder="Empresa"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            value={experience.position}
            onChange={updateExperience}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
            placeholder="Puesto"
          />
          <input
            type="text"
            value={experience.duration}
            onChange={updateExperience}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
            placeholder="Duración"
          />
        </div>

        <button
          onClick={() =>
            addItem(experienceList, setExperienceList, experience, () =>
              updateExperience({ company: '', position: '', duration: '' })
            )
          }
          className="px-5 py-2 text-sm text-white bg-[#00b4b7] rounded-md hover:bg-[#00a7a3] transition-colors"
        >
          Agregar experiencia
        </button>

        <TransitionGroup className="mt-4">
          {experienceList.map((exp, index) => (
            <CSSTransition key={index} timeout={300} classNames="fade">
              <div className="flex justify-between items-center p-2 bg-gray-100 rounded-lg mb-2">
                <div>
                  <p className="font-semibold">{exp.company}</p>
                  <p className="text-sm">
                    {exp.position} - {exp.duration}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setExperienceList(
                      experienceList.filter((_, i) => i !== index)
                    )
                  }
                  className="text-red-500 font-bold"
                >
                  X
                </button>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>

      {/* Habilidades  */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#333333] mb-2">
          Habilidades
        </h2>

        {/* Campos para añadir habilidad y años de experiencia */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            defaultValue={skill.SkillId}
            onChange={updateSkill}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
            placeholder="Ejemplo: React, JavaScript, Liderazgo"
          />
          <input
            type="number"
            defaultValue={skill.years_of_experience}
            onChange={updateSkill}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
            placeholder="Años de experiencia"
          />
        </div>

        {/* Botón para agregar habilidades */}
        <button className="px-5 py-2 text-sm text-white bg-[#00b4b7] rounded-md hover:bg-[#00a7a3] transition-colors">
          Añadir habilidad
        </button>

        {/* Lista de habilidades */}
        <TransitionGroup className="mt-4">
          {skillsList.map((item, index) => (
            <CSSTransition key={index} timeout={300} classNames="fade">
              <div className="flex justify-between items-center p-2 bg-gray-100 rounded-lg mb-2">
                <div>
                  <p className="font-semibold">{item.skill}</p>
                  <p className="text-sm text-gray-600">
                    {item.years} año(s) de experiencia
                  </p>
                </div>
                <button
                  onClick={() =>
                    setSkillsList(skillsList.filter((_, i) => i !== index))
                  }
                  className="text-red-500 font-bold"
                >
                  X
                </button>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>

      {/* Idiomas */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#333333] mb-2">Idiomas</h2>

        {/* Campos para añadir idioma y nivel */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            defaultValue={language.LanguageId}
            onChange={updateLanguage}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
            placeholder="Ejemplo: Español, Inglés, Francés"
          />
          <select
            defaultValue={language.proficiency}
            onChange={updateLanguage}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
          >
            <option value="" disabled>
              Selecciona nivel
            </option>
            <option value="Básico">Básico</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
            <option value="Nativo">Nativo</option>
          </select>
        </div>

        {/* Botón para agregar idiomas */}
        <button className="px-5 py-2 text-sm text-white bg-[#00b4b7] rounded-md hover:bg-[#00a7a3] transition-colors">
          Añadir idioma
        </button>

        {/* Lista de idiomas */}
        <TransitionGroup className="mt-4">
          {languageList.map((item, index) => (
            <CSSTransition key={index} timeout={300} classNames="fade">
              <div className="flex justify-between items-center p-2 bg-gray-100 rounded-lg mb-2">
                <div>
                  <p className="font-semibold">{item.language}</p>
                  <p className="text-sm text-gray-600">
                    Nivel: {item.proficiency}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setLanguageList(languageList.filter((_, i) => i !== index))
                  }
                  className="text-red-500 font-bold"
                >
                  X
                </button>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>

      {/* Referencias */}

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#333333] mb-2">
          Referencias
        </h2>

        {/* Campos para añadir referencias */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            value={reference.name}
            onChange={updateReference}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
            placeholder="Nombre completo"
          />
          <input
            type="text"
            value={reference.relationship}
            onChange={updateReference}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
            placeholder="Relación (Ej: Exjefe, Profesor)"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <input
            type="text"
            value={reference.contact}
            onChange={updateReference}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4b7]"
            placeholder="Número de contacto"
          />
        </div>

        {/* Botón para agregar referencias */}
        <button className="px-5 py-2 text-sm text-white bg-[#00b4b7] rounded-md hover:bg-[#00a7a3] transition-colors">
          Añadir referencia
        </button>

        {/* Lista de referencias */}
        <TransitionGroup className="mt-4">
          {referencesList.map((ref, index) => (
            <CSSTransition key={index} timeout={300} classNames="fade">
              <div className="flex justify-between items-center p-2 bg-gray-100 rounded-lg mb-2">
                <div>
                  <p className="font-semibold">{ref.name}</p>
                  <p className="text-sm text-gray-600">
                    {ref.relationship} - {ref.contact}
                  </p>
                </div>
                <button className="text-red-500 font-bold">X</button>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>

      <button
        className="px-5 py-3 text-lg text-white bg-[#00b4b7] rounded-md hover:bg-[#00a7a3] transition-colors w-full"
        onClick={handleSave}
      >
        Guardar cambios
      </button>
    </div>
  )
}

export default Settings
