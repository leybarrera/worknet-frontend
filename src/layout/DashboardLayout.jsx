import { Outlet, useNavigate } from 'react-router-dom'
import Aside from '../shared/Aside'
import { useEffect } from 'react'
import { storageUtil } from '../utils/index.utils'

const DashboardLayout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const { user } = storageUtil.getFromLocalStorage('session_info')
    if (!user || user.role !== 'Administrador') {
      navigate('/')
    }
  }, [navigate])
  return (
    <>
      <Aside />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default DashboardLayout
