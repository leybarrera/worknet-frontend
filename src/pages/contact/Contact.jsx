import { useEffect, useState } from 'react'
import Loader from '../../components/loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { connectionAPI } from '../../api/connection/connection.api'
import { toast, Toaster } from 'sonner'
import { storageUtil } from '../../utils/index.utils'
import LottieView from 'lottie-react'
import noData from '../../assets/no-data.json'
import { setContacts } from '../../redux/slices/applicants.slice'

const Contact = () => {
  const [id, setId] = useState(null)
  const [hovered, setHovered] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [contactsList, setContactsList] = useState([])
  const { contacts } = useSelector((state) => state.applicants)
  const { users } = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true)
    }, 3500)
  }, [])

  useEffect(() => {
    const data = storageUtil.getFromLocalStorage('session_info')
    if (data) {
      const { user } = data
      setId(user.id)
    }
  }, [])

  useEffect(() => {
    if (id) {
      getAll()
    }
  }, [id])

  useEffect(() => {
    filterUsers()
  }, [contacts, users])

  const getAll = () => {
    if (!id) return

    connectionAPI
      .getByUser(id)
      .then((res) => {
        const { connections } = res.data
        dispatch(setContacts(connections))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const filterUsers = () => {
    const contactsID = contacts.map((contact) => contact.UserTargetId)
    const usersFiltered = users.filter((user) => contactsID.includes(user.id))
    setContactsList(usersFiltered)
  }

  const unfollowUser = (user_id) => {
    if (!id) return

    connectionAPI
      .removeConnection({ UserSourceId: id, UserTargetId: user_id })
      .then((res) => {
        toast.success(res.data.message)
        getAll()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const renderContact = (contact) => (
    <div
      className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-xl p-4 hover:bg-gray-100 transition-colors"
      key={contact.id}
    >
      <div className="flex items-center">
        <img
          src="https://randomuser.me/api/portraits/men/15.jpg"
          alt="Contacto"
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <p className="text-lg font-semibold">
            {contact.name} {contact.surname}
          </p>
          <p className="text-sm text-gray-500">{contact.email}</p>
        </div>
      </div>
      <button
        className={`px-4 py-1 text-sm rounded-md transition-all ${
          hovered ? 'bg-[#f00] text-white' : 'bg-gray-300 text-gray-600'
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => unfollowUser(contact.id)}
      >
        {hovered ? 'Dejar de seguir' : 'Siguiendo'}
      </button>
    </div>
  )

  if (!isMounted) return <Loader text={'Cargando contactos...'} />

  return (
    <>
      {contactsList.length > 0 ? (
        <main className="flex-1 max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">Mis Contactos</h1>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Conexiones
            </h2>
            <div className="space-y-4">
              {contactsList.map((contact) => renderContact(contact))}
            </div>
          </section>

          {contactsList.length > 10 && (
            <button className="px-6 py-2 text-sm text-white bg-[#00b4b7] rounded-md hover:bg-[#00a7a3] transition-colors w-full">
              Ver Más Contactos
            </button>
          )}
        </main>
      ) : (
        <div className="w-full h-full flex-1 flex flex-col justify-center items-center">
          <LottieView
            animationData={noData}
            autoPlay
            loop={true}
            style={{ width: '300px', height: '300px' }}
          />
          <h2 className="text-3xl font-semibold mt-4 text-gray-400 text-center">
            Proximamente. Sección de contactos y mensajes....
          </h2>
        </div>
      )}
      <Toaster richColors />
    </>
  )
}

export default Contact
