import React from 'react'

const JobDetails = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
      {/* Imagen de la oferta de trabajo */}
      <div className="mb-8">
        <img
          src="https://via.placeholder.com/800x400?text=Imagen+de+Trabajo"
          alt="Imagen de oferta de trabajo"
          className="w-full h-56 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Título y nombre de la oferta */}
      <h1 className="text-3xl font-bold text-[#00b4b7] mb-4">
        Desarrollador Frontend
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Publicado el 20 de Noviembre, 2024
      </p>

      {/* Descripción del trabajo */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#333333] mb-2">
          Descripción del trabajo
        </h2>
        <p className="text-gray-700 text-base leading-relaxed">
          Estamos buscando un desarrollador frontend con experiencia en
          React.js, JavaScript y HTML/CSS para unirse a nuestro equipo dinámico.
          El candidato ideal debe ser capaz de crear interfaces de usuario
          interactivas, trabajar en colaboración con el equipo de backend y
          estar dispuesto a aprender nuevas tecnologías y herramientas.
          Ofrecemos un entorno de trabajo flexible y oportunidades de
          crecimiento profesional.
        </p>
      </div>

      {/* Requisitos */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#333333] mb-2">
          Requisitos
        </h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Experiencia en React.js y JavaScript.</li>
          <li>
            Conocimiento en HTML, CSS y herramientas de preprocesadores (SASS,
            LESS).
          </li>
          <li>Familiaridad con herramientas de control de versiones (Git).</li>
          <li>Capacidad para trabajar de manera autónoma y en equipo.</li>
        </ul>
      </div>

      {/* Beneficios */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#333333] mb-2">
          Beneficios
        </h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Salario competitivo</li>
          <li>Oportunidades de crecimiento profesional</li>
          <li>Trabajo remoto</li>
          <li>Horario flexible</li>
        </ul>
      </div>

      {/* Información sobre la empresa */}
      <div className="mb-6 border-t-2 pt-6">
        <h2 className="text-2xl font-semibold text-[#333333] mb-2">
          Acerca de la empresa
        </h2>
        <p className="text-gray-700">
          Nuestra empresa es líder en el desarrollo de software y soluciones
          digitales innovadoras. Buscamos crear un ambiente inclusivo, diverso y
          colaborativo, enfocado en la innovación y el crecimiento tanto de
          nuestros empleados como de nuestros clientes.
        </p>
      </div>

      {/* Información de postulaciones y botón */}
      <div className="flex justify-between items-center mt-8">
        <div>
          <h2 className="text-2xl font-semibold text-[#333333]">
            Postulaciones
          </h2>
          <p className="text-gray-600">
            Total de postulaciones: <span className="font-bold">35</span>
          </p>
        </div>

        <button className="px-8 py-3 bg-[#00b4b7] text-white rounded-lg hover:bg-[#009ea0] transition-all duration-300 text-lg">
          Postúlate ahora
        </button>
      </div>
    </div>
  )
}

export default JobDetails
