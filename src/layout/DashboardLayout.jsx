import { Outlet } from 'react-router-dom'
import Aside from '../shared/Aside'

const DashboardLayout = () => {
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
