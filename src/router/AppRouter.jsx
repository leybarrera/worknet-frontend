import { Navigate, Route, Routes } from 'react-router-dom'
import {
  Applications,
  Contact,
  Home,
  Login,
  JobDetails,
  Settings,
  RegisterUser,
  RegisterCompany,
  Profile,
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
  UserInfo,
} from '../pages/dashboard'
import EmpresaDashboard from '../layout/EmpresaDashboard.layout'
import {
  ConfiguracionEmpresa,
  OfertasEmpresa,
  PostulacionesCandidatos,
} from '../pages/empresa-dashboard'
import RegisterOption from '../pages/register/RegisterOption'
import Activation from '../pages/activation/Activation'
import ProtectedRoute from '../components/protected-route/ProtectedRoute'
import EmpresaHome from '../pages/empresa-home/EmpresaHome'
import Offers from '../pages/offers/Offers'

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/inicio_sesion"
        element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/registro/usuario"
        element={
          <ProtectedRoute>
            <RegisterUser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/registro/empresa"
        element={
          <ProtectedRoute>
            <RegisterCompany />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register_option"
        element={
          <ProtectedRoute>
            <RegisterOption />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account-activation"
        element={
          <ProtectedRoute>
            <Activation />
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/empresa-inicio" element={<EmpresaHome />} />
        <Route path="/aplicaciones" element={<Applications />} />
        <Route path="/mis_contactos" element={<Contact />} />
        <Route path="/ofertas" element={<Offers />} />
        <Route path="/detalle_oferta" element={<JobDetails />} />
        <Route path="/ajustes" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Navigate to={'/dashboard/candidatos'} />} />
        <Route path="/dashboard/candidatos" element={<Candidatos />} />
        <Route path="/dashboard/empresas" element={<Empresas />} />
        <Route path="/dashboard/ofertas" element={<OfertasDeTrabajo />} />
        <Route path="/dashboard/postulaciones" element={<Postulaciones />} />
        <Route path="/dashboard/soporte" element={<Soporte />} />
        <Route path="/dashboard/reportes" element={<Reportes />} />
        <Route
          path="/dashboard/candidatos/user-info/:id"
          element={<UserInfo />}
        />
      </Route>

      <Route path="/empresa-dashboard" element={<EmpresaDashboard />}>
        <Route
          index
          element={<Navigate to={'/empresa-dashboard/configuracion'} />}
        />
        <Route path="/empresa-dashboard/ofertas" element={<OfertasEmpresa />} />
        <Route
          path="/empresa-dashboard/postulaciones"
          element={<PostulacionesCandidatos />}
        />
        <Route
          path="/empresa-dashboard/configuracion"
          element={<ConfiguracionEmpresa />}
        />
      </Route>
    </Routes>
  )
}

export default AppRouter
