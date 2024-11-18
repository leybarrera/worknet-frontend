import { Navigate, Route, Routes } from 'react-router-dom'
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
import DashboardLayout from '../layout/DashboardLayout'
import {
  Candidatos,
  Empresas,
  OfertasDeTrabajo,
  Postulaciones,
  Reportes,
  Soporte,
} from '../pages/dashboard'
import EmpresaDashboard from '../layout/EmpresaDashboard.layout'
import {
  OfertasEmpresa,
  PostulacionesCandidatos,
} from '../pages/empresa-dashboard'

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

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Navigate to={'/dashboard/candidatos'} />} />
        <Route path="/dashboard/candidatos" element={<Candidatos />} />
        <Route path="/dashboard/empresas" element={<Empresas />} />
        <Route path="/dashboard/ofertas" element={<OfertasDeTrabajo />} />
        <Route path="/dashboard/postulaciones" element={<Postulaciones />} />
        <Route path="/dashboard/soporte" element={<Soporte />} />
        <Route path="/dashboard/reportes" element={<Reportes />} />
      </Route>

      <Route path="/empresa-dashboard" element={<EmpresaDashboard />}>
        <Route path="/empresa-dashboard/ofertas" element={<OfertasEmpresa />} />
        <Route
          path="/empresa-dashboard/postulaciones"
          element={<PostulacionesCandidatos />}
        />
      </Route>
    </Routes>
  )
}

export default AppRouter
