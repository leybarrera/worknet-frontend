const Contact = () => {
  return (
    <main className="flex-1 max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl shadow-md p-6">
      <h1 className="text-2xl font-bold mb-4">Mis Contactos</h1>
      <p className="text-gray-700 mb-6">
        Aquí puedes ver todos tus contactos y gestionar tus conexiones.
      </p>

      {/* Sección de contactos */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Conexiones</h2>
        <div className="space-y-4">
          {/* Contacto 1 */}
          <div className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-xl p-4 hover:bg-gray-100 transition-colors">
            <div className="flex items-center">
              <img
                src="https://randomuser.me/api/portraits/men/15.jpg"
                alt="Contacto"
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <p className="text-lg font-semibold">Juan Pérez</p>
                <p className="text-sm text-gray-500">Desarrollador Backend</p>
                <p className="text-sm text-gray-600 mt-2">
                  Conexión desde: 3 meses
                </p>
              </div>
            </div>
            <button className="px-6 py-2 text-sm text-white bg-[#00b4b7] rounded-md hover:bg-[#00a7a3] transition-colors">
              Enviar mensaje
            </button>
          </div>

          {/* Contacto 2 */}
          <div className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-xl p-4 hover:bg-gray-100 transition-colors">
            <div className="flex items-center">
              <img
                src="https://randomuser.me/api/portraits/women/20.jpg"
                alt="Contacto"
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <p className="text-lg font-semibold">Ana García</p>
                <p className="text-sm text-gray-500">Diseñadora UI/UX</p>
                <p className="text-sm text-gray-600 mt-2">
                  Conexión desde: 5 meses
                </p>
              </div>
            </div>
            <button className="px-6 py-2 text-sm text-white bg-[#00b4b7] rounded-md hover:bg-[#00a7a3] transition-colors">
              Enviar mensaje
            </button>
          </div>

          {/* Contacto 3 */}
          <div className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-xl p-4 hover:bg-gray-100 transition-colors">
            <div className="flex items-center">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Contacto"
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <p className="text-lg font-semibold">Carlos Fernández</p>
                <p className="text-sm text-gray-500">Community Manager</p>
                <p className="text-sm text-gray-600 mt-2">
                  Conexión desde: 1 mes
                </p>
              </div>
            </div>
            <button className="px-6 py-2 text-sm text-white bg-[#00b4b7] rounded-md hover:bg-[#00a7a3] transition-colors">
              Enviar mensaje
            </button>
          </div>
        </div>
      </section>

      {/* Sección opcional para agregar más contactos */}
      <section className="mt-8">
        <div className="text-center">
          <button className="px-6 py-2 text-sm text-white bg-[#00b4b7] rounded-md hover:bg-[#00a7a3] transition-colors">
            Ver Más Contactos
          </button>
        </div>
      </section>
    </main>
  )
}

export default Contact
