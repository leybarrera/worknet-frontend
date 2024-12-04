import { useEffect } from 'react'
import AppRouter from './router/AppRouter'
import { ofertasEndpoints } from './api/ofertas/ofertas.api'
import { setOfertas } from './redux/slices/ofertas.slices'
import { useDispatch } from 'react-redux'
import { userEndpoints } from './api/user/user.api'
import { setUsers } from './redux/slices/users.slices'
import { storageUtil } from './utils/index.utils'
import { skillsEndpoints } from './api/skills/skills.api'
import { setAllSkills } from './redux/slices/skills.slices'
import { useNavigate } from 'react-router-dom'

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const session_info = storageUtil.getFromLocalStorage('session_info')
  useEffect(() => {
    if (!session_info) {
      navigate('inicio_sesion')
    }
    ofertasEndpoints
      .getAll()
      .then((res) => {
        dispatch(setOfertas(res.data.jobOffers))
      })
      .catch((err) => console.log(err))

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

  return <AppRouter />
}

export default App
