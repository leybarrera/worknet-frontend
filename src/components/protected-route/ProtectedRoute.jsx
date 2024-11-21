import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { storageUtil } from '../../utils/index.utils'

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const user = storageUtil.getFromLocalStorage('session_info')

    if (user) {
      navigate('/')
    }
  }, [navigate])

  return children
}

export default ProtectedRoute
