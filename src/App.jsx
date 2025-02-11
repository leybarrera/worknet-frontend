import { useEffect, useState } from 'react'
import AppRouter from './router/AppRouter'
import { setOfertas } from './redux/slices/ofertas.slices'
import { useDispatch } from 'react-redux'
import { userEndpoints } from './api/user/user.api'
import { setUsers } from './redux/slices/users.slices'
import { storageUtil } from './utils/index.utils'
import { skillsEndpoints } from './api/skills/skills.api'
import { setAllSkills } from './redux/slices/skills.slices'
import { useNavigate } from 'react-router-dom'
import { offersAPI } from './api/ofertas/ofertas.api'
import Loader from './components/loader/Loader'
import { setCompany, setIsLogin } from './redux/slices/session.slice'

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const session_info = storageUtil.getFromLocalStorage('session_info')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (!session_info) {
      navigate('inicio_sesion')
      setLoading(false)
      return
    }

    const { company } = session_info
    if (company) {
      dispatch(setCompany(company))
    }

    offersAPI
      .getAll()
      .then((res) => {
        dispatch(setOfertas(res.data.jobOffers))
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false)
      })

    userEndpoints
      .getRecommendations(session_info && session_info.token)
      .then((res) => {
        dispatch(setUsers(res.data.users))
      })
      .catch((err) => console.log(err))

    skillsEndpoints
      .getAll()
      .then((res) => {
        const { code, skills } = res.data
        dispatch(setAllSkills(skills))
      })
      .catch((err) => console.log(err))
  }, [dispatch, session_info])

  return loading ? <Loader /> : <AppRouter />
}

export default App
