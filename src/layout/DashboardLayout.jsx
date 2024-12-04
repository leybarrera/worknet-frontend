import { Outlet, useNavigate } from 'react-router-dom'
import Aside from '../shared/Aside'
import { useEffect, useState } from 'react'
import { storageUtil } from '../utils/index.utils'
import AccesoDengado from '../pages/acceso-denegado/AccesoDengado'

const DashboardLayout = () => {
  const [showPage, setShowPage] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const isAdmin = storageUtil.getFromLocalStorage('is_admin')
    setShowPage(isAdmin)
  }, [navigate])
  return showPage ? (
    <>
      <Aside />
      <main>
        <Outlet />
      </main>
    </>
  ) : (
    <AccesoDengado />
  )
}

export default DashboardLayout
