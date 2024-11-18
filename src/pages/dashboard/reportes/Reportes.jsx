import { RiBarChartLine, RiFileTextLine, RiPieChartLine } from 'react-icons/ri'

const Reportes = () => {
  return (
    <section className="pl-[320px] p-8 w-full">
      <h2 className="text-2xl font-semibold mb-8">Reportes</h2>

      {/* Filtros de fecha */}
      <div className="flex gap-4 mb-8">
        <div className="flex items-center gap-2">
          <label
            htmlFor="fechaInicio"
            className="text-sm font-medium text-gray-600"
          >
            Desde:
          </label>
          <input
            type="date"
            id="fechaInicio"
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="fechaFin"
            className="text-sm font-medium text-gray-600"
          >
            Hasta:
          </label>
          <input
            type="date"
            id="fechaFin"
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Cards de Resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-700">
              Total de Usuarios
            </h3>
            <p className="text-3xl font-bold text-blue-500">1,245</p>
          </div>
          <RiFileTextLine size={40} className="text-blue-500" />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-700">
              Ofertas de Trabajo Activas
            </h3>
            <p className="text-3xl font-bold text-green-500">35</p>
          </div>
          <RiBarChartLine size={40} className="text-green-500" />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-700">
              Postulaciones Pendientes
            </h3>
            <p className="text-3xl font-bold text-yellow-500">58</p>
          </div>
          <RiPieChartLine size={40} className="text-yellow-500" />
        </div>
      </div>

      {/* Gráficos de rendimiento */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Rendimiento de Ofertas de Trabajo
          </h3>
          <div className="h-64 bg-gray-100 flex justify-center items-center">
            <span className="text-gray-500">Gráfico de barras aquí</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Distribución de Postulaciones
          </h3>
          <div className="h-64 bg-gray-100 flex justify-center items-center">
            <span className="text-gray-500">Gráfico circular aquí</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reportes
