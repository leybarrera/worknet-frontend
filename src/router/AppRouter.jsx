import { Navigate, Route, Routes } from 'react-router-dom'
import { Home, Login, Register } from '../pages/index.pages'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={'/inicio_sesion'} />} />
      <Route path="/inicio_sesion" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/inicio" element={<Home />} />
    </Routes>
  )
}

export default AppRouter
