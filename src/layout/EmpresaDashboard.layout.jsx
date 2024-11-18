import { Outlet } from 'react-router-dom'
import Sidebar from '../shared/Sidebar'

const EmpresaDashboard = () => {
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
