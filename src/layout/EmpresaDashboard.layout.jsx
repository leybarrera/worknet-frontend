import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../shared/Sidebar'
import { useEffect } from 'react'
import { storageUtil } from '../utils/index.utils'

const EmpresaDashboard = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const { company } = storageUtil.getFromLocalStorage('session_info')
    if (!company) {
      navigate('/')
    }
  }, [navigate])
  return (
    <>
      <Sidebar />
      <main className="pl-[320px] p-8 w-full">
        <Outlet />
      </main>
    </>
  )
}

export default EmpresaDashboard
