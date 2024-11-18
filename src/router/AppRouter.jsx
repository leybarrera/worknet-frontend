import { Route, Routes } from 'react-router-dom'
import {
  Applications,
  Contact,
  Home,
  Login,
  Register,
  JobDetails,
  Settings,
} from '../pages/index.pages'
import Root from '../layout/Root'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/inicio_sesion" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/aplicaciones" element={<Applications />} />
        <Route path="/mis_contactos" element={<Contact />} />
        <Route path="/detalle_oferta" element={<JobDetails />} />
        <Route path="/ajustes" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
