import { Route, Routes } from 'react-router-dom'
import { Home, Login, Register } from '../pages/index.pages'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/inicio_sesion" element={<Login />} />
      <Route path="/registro" element={<Register />} />
    </Routes>
  )
}

export default AppRouter
