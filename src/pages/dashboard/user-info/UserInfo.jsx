import { useEffect, useState } from 'react'
import { userEndpoints } from '../../../api/user/user.api'
import { useParams } from 'react-router-dom'

const UserInfo = () => {
  const { id } = useParams()
  const [user, setUser] = useState({})

  useEffect(() => {
    userEndpoints
      .getById(id)
      .then((res) => {
        setUser(res.data.user)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id])

  return (
    <main className="pl-[320px] p-8 w-full flex flex-col gap-8 bg-gray-50">
      <section className="flex flex-col gap-6 border-b pb-6">
        <h2 className="text-2xl font-bold text-[#007a7d]">
          Información General
        </h2>

        <div className="grid grid-cols-2 gap-8">
          <div className="flex justify-center items-center">
            <div className="w-52 h-52 rounded-full overflow-hidden shadow-lg border-4 border-[#007a7d]">
              <img
                src="/public/profile.png"
                alt="Perfil"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <InfoCard label="Nombres" value={`${user.name} ${user.surname}`} />
            <InfoCard label="Correo electrónico" value={user.email} />
            <InfoCard label="Teléfono" value={user.phone} />
            <InfoCard label="DNI" value={user.dni} />
            <InfoCard
              label="Género"
              value={
                user.gender === 'F'
                  ? 'Femenino'
                  : user.gender === 'M'
                  ? 'Masculino'
                  : 'Otro'
              }
            />
            <InfoCard label="Ubicación" value={user.location} />
            <InfoCard label="Tipo de usuario" value={user.role} />
          </div>
        </div>
      </section>

      {[
        'Educación',
        'Experiencia Laboral',
        'Currículum',
        'Habilidades',
        'Idiomas',
        'Postulaciones',
        'Contactos',
      ].map((section, index) => (
        <SectionCard key={index} title={section} />
      ))}
    </main>
  )
}

const InfoCard = ({ label, value }) => (
  <div>
    <h3 className="font-semibold text-gray-800">{label}:</h3>
    <p className="text-gray-600">{value || 'No disponible'}</p>
  </div>
)

const SectionCard = ({ title }) => (
  <section className="flex flex-col gap-4 border-b pb-6">
    <h2 className="text-xl font-bold text-[#007a7d]">{title}</h2>
    <p className="text-gray-600">Información no disponible.</p>
  </section>
)

export default UserInfo
