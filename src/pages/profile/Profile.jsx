import { FaUniversity } from 'react-icons/fa'
import { IoLanguage } from 'react-icons/io5'
import { LuDot } from 'react-icons/lu'
import { MdBusinessCenter } from 'react-icons/md'
import { RiAddFill, RiPencilFill } from 'react-icons/ri'

const Profile = () => {
  return (
    <main className="grid grid-cols-4 gap-2 pb-20">
      <section className="col-span-3 flex flex-col gap-3">
        <section className=" bg-[#F5F9FF] rounded-xl border border-gray-200">
          {/* Portada y Foto de Perfil */}
          <div className="w-full h-[250px] bg-[#027d83] rounded-t-lg relative flex justify-center items-center">
            <button className="absolute w-10 h-10 rounded-full bg-white border border-[#00B4B7] top-3 right-3 flex justify-center items-center z-50 shadow-md hover:bg-gray-100">
              <RiPencilFill size={20} color="#00B4B7" />
            </button>

            {/* Foto de perfil */}
            <div className="w-[150px] h-[150px] rounded-full bg-white absolute -bottom-[75px] left-4 border-4 border-[#00B4B7] z-50 shadow-lg">
              <img
                src="/public/men.png"
                alt="Foto de perfil"
                className="w-full h-full rounded-full object-cover"
              />
            </div>

            {/* Nombre y Email */}
            <div className="z-50 flex flex-col items-center justify-center">
              <h2 className="text-white text-4xl font-bold">
                Cristhian Rodríguez
              </h2>
              <h5 className="text-lg text-[#F5F9FF]">
                crisrodam1996@gmail.com
              </h5>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="mt-[100px] px-6 max-w-[700px]">
            <h2 className="text-3xl font-bold mb-3">Cristhian Rodríguez</h2>
            <div className="flex flex-row flex-wrap mb-1">
              <span className="px-3 py-1 rounded-full bg-[#00B4B7] border border-[#027D83] text-sm text-white mr-1 mb-1">
                ReactJS
              </span>
              <span className="px-3 py-1 rounded-full bg-[#00B4B7] border border-[#027D83] text-sm text-white mr-1 mb-1">
                HTML5
              </span>
              <span className="px-3 py-1 rounded-full bg-[#00B4B7] border border-[#027D83] text-sm text-white mr-1 mb-1">
                JavaScript
              </span>
              <span className="px-3 py-1 rounded-full bg-[#00B4B7] border border-[#027D83] text-sm text-white mr-1 mb-1">
                Python
              </span>
              <span className="px-3 py-1 rounded-full bg-[#00B4B7] border border-[#027D83] text-sm text-white mr-1 mb-1">
                ReactJS
              </span>
              <span className="px-3 py-1 rounded-full bg-[#00B4B7] border border-[#027D83] text-sm text-white mr-1 mb-1">
                HTML5
              </span>
              <span className="px-3 py-1 rounded-full bg-[#00B4B7] border border-[#027D83] text-sm text-white mr-1 mb-1">
                JavaScript
              </span>
              <span className="px-3 py-1 rounded-full bg-[#00B4B7] border border-[#027D83] text-sm text-white mr-1 mb-1">
                Python
              </span>
              <span className="px-3 py-1 rounded-full bg-[#00B4B7] border border-[#027D83] text-sm text-white mr-1 mb-1">
                ReactJS
              </span>
              <span className="px-3 py-1 rounded-full bg-[#00B4B7] border border-[#027D83] text-sm text-white mr-1 mb-1">
                HTML5
              </span>
              <span className="px-3 py-1 rounded-full bg-[#00B4B7] border border-[#027D83] text-sm text-white mr-1 mb-1">
                JavaScript
              </span>
              <span className="px-3 py-1 rounded-full bg-[#00B4B7] border border-[#027D83] text-sm text-white mr-1 mb-1">
                Python
              </span>
            </div>

            {/* Ubicación */}
            <div className="mb-1 flex flex-row items-center gap-1">
              <span className="text-gray-500 text-[14px]">
                El Empalme, Guayas, Ecuador
              </span>
              <p>-</p>
              <button className="underline text-[#00B4B7] hover:text-[#025f61]">
                Información de contacto
              </button>
            </div>

            <button className="font-semibold text-[#00B4B7] hover:underline">
              Más de 0 Contactos
            </button>
          </div>
        </section>

        <section className="bg-[#F5F9FF] rounded-xl px-5 py-3">
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-[#00B4B7] text-2xl font-semibold">
              Acerca de ti
            </h3>

            <button className="w-12 h-12 rounded-full bg-[#00B4B7] flex justify-center items-center">
              <RiPencilFill size={28} color="white" />
            </button>
          </div>

          {/* Si el usuario tiene biografía */}
          {/* <div className="flex flex-col mt-4">
            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
              impedit voluptatibus consequuntur porro veniam in, fuga ipsum
              fugiat quam ullam, voluptates a magnam hic iusto consequatur.
              Harum cum sapiente corrupti eum nam! Quaerat consectetur enim
              expedita, corrupti quidem reprehenderit, eius quibusdam in soluta
              perspiciatis molestias exercitationem provident, eligendi
              veritatis at. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Minima corrupti, placeat incidunt enim obcaecati veritatis
              consectetur corporis dolorem dicta! Illo vero ut deleniti soluta
              voluptatum enim obcaecati tempora voluptates eveniet iusto,
              nostrum necessitatibus nemo assumenda repellat veritatis, vel
              inventore pariatur iure consequuntur quam laborum. Alias tempore
              nostrum enim aliquid eum. Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Velit nulla et minima dolores consequatur
              voluptates ab quae similique excepturi esse ipsum, repudiandae
              ullam culpa totam perferendis magnam. Minima culpa voluptas quae!
              Dolorum magni itaque reprehenderit? Odio velit ipsum eligendi,
              enim, mollitia fugiat unde sunt dicta nobis dolores vero,
              blanditiis deserunt!
            </p>
          </div> */}

          <div className="w-full px-3 py-2 bg-white border border-dashed border-gray-200 mt-4 flex flex-col gap-2">
            <h3 className="text-lg font-bold text-gray-500">
              ¡Haz que tu perfil destaque!
            </h3>
            <h5 className="text-justify text-[17px] text-gray-400">
              Agrega información sobre tu experiencia, logros y habilidades para
              que otros puedan conocerte mejor. Agrega información sobre tu
              experiencia laboral, proyectos destacados y habilidades únicas
              para que otros puedan conocerte mejor y conecten contigo de manera
              más auténtica. Recuerda, un perfil completo no solo habla de lo
              que has hecho, sino también del potencial que tienes para futuros
              desafíos.
            </h5>
          </div>
        </section>

        {/* Experiencia laboral */}
        <section className="bg-[#F5F9FF] rounded-xl px-5 py-3">
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-[#00B4B7] text-2xl font-semibold">
              Experiencia
            </h3>

            <button className="w-12 h-12 rounded-full bg-[#00B4B7] flex justify-center items-center">
              <RiAddFill size={28} color="white" />
            </button>
          </div>

          {/* Caja de trabajos */}
          {/* <div className="flex flex-col">
            <div className="flex flex-row gap-1 py-5">
              <div className="w-[50px] pr-5">
                <MdBusinessCenter size={35} color="#027d83" />
              </div>
              <div className="flex flex-col">
                <h5 className="text-lg font-bold">Puesto de trabajo</h5>
                <div className="flex flex-row items-center ">
                  <h6 className="text-[14px] font-light">Empresa ABC</h6>
                  <LuDot />
                  <h6 className="text-[14px] font-light">3 años</h6>
                </div>
                <p className="text-justify mt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Architecto magni molestias delectus deleniti repellendus quam
                  provident velit libero odit veniam consequuntur iure quibusdam
                  minus, eveniet quo atque! Rerum culpa veniam nam autem,
                  officiis optio atque consequuntur excepturi adipisci porro!
                  Autem dolor asperiores corporis ab pariatur recusandae!
                  Provident amet cupiditate ut dolore minus beatae saepe
                  blanditiis maiores quas ullam perferendis voluptas aperiam
                  delectus sunt ratione autem veniam rerum consectetur officiis
                  magni corporis iste molestiae, perspiciatis nostrum? Sit
                  fugiat officiis delectus sapiente beatae cum dolore labore,
                  saepe consequatur dolores nihil atque quibusdam veniam sed
                  architecto voluptates laborum. Soluta nulla dolor corporis
                  nisi.
                </p>
              </div>
            </div>
          </div> */}
          <div className="w-full px-3 py-2 bg-white border border-dashed border-gray-200 mt-4 flex flex-col gap-2">
            <h3 className="text-lg font-bold text-gray-500">
              ¡Destaca tus experiencias laborales!
            </h3>
            <h5 className="text-justify text-[17px] text-gray-400">
              Comparte detalles sobre tus roles anteriores, responsabilidades y
              logros más destacados. Cada experiencia laboral cuenta una
              historia sobre quién eres como profesional y qué puedes aportar a
              nuevos desafíos. Agregar esta información no solo ayuda a otros a
              comprender tu trayectoria, sino también a descubrir cómo tus
              habilidades pueden marcar la diferencia. Proyectos relevantes,
              resultados medibles y habilidades adquiridas son claves para
              mostrar el valor que puedes ofrecer. Recuerda, un perfil completo
              no solo refleja tu pasado, sino que también abre puertas hacia
              nuevas oportunidades.
            </h5>
          </div>
        </section>

        {/* Estudioss */}

        <section className="bg-[#F5F9FF] rounded-xl px-5 py-3">
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-[#00B4B7] text-2xl font-semibold">Educación</h3>

            <button className="w-12 h-12 rounded-full bg-[#00B4B7] flex justify-center items-center">
              <RiAddFill size={28} color="white" />
            </button>
          </div>

          {/* <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-row gap-1 py-5">
              <div className="w-[50px] pr-5">
                <FaUniversity size={35} color="#027d83" />
              </div>
              <div className="flex flex-col">
                <h5 className="text-lg font-bold">
                  Universidad Técnica de Cotopaxi
                </h5>
                <div className="flex flex-row items-center ">
                  <h6 className="text-[14px] font-light">Título Obtenido</h6>
                </div>
                <div className="flex flex-row items-center ">
                  <h6 className="text-[14px] font-bold">ago 2014</h6>
                  <LuDot />
                  <h6 className="text-[14px] font-bold">mar 2024</h6>
                </div>
              </div>
            </div>
          </div> */}

          <div className="w-full px-3 py-2 bg-white border border-dashed border-gray-200 mt-4 flex flex-col gap-2">
            <h3 className="text-lg font-bold text-gray-500">
              ¡Destaca tu formación educativa!
            </h3>
            <h5 className="text-justify text-[17px] text-gray-400">
              Comparte información sobre tu formación académica, cursos y
              certificaciones. Cada etapa de tu aprendizaje es una pieza clave
              que demuestra tu dedicación, esfuerzo y compromiso con el
              crecimiento profesional. Agregar detalles sobre tus estudios,
              logros académicos y habilidades adquiridas puede inspirar
              confianza y conectar con quienes valoran tu preparación. No
              olvides incluir proyectos destacados, reconocimientos o cualquier
              experiencia formativa que haya marcado tu trayectoria. Recuerda,
              tu educación no solo habla de dónde vienes, sino también de todo
              el potencial que tienes para avanzar hacia nuevas metas.
            </h5>
          </div>
        </section>

        <section className="bg-[#F5F9FF] rounded-xl px-5 py-3">
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-[#00B4B7] text-2xl font-semibold">Idiomas</h3>

            <button className="w-12 h-12 rounded-full bg-[#00B4B7] flex justify-center items-center">
              <RiAddFill size={28} color="white" />
            </button>
          </div>

          {/* <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-row gap-1 py-5">
              <div className="w-[50px] pr-5">
                <IoLanguage size={35} color="#027d83" />
              </div>
              <div className="flex flex-col">
                <h5 className="text-lg font-bold">Inglés</h5>
                <div className="flex flex-row items-center ">
                  <h6 className="text-[14px] font-light">Nivel B1</h6>
                </div>
              </div>
            </div>
          </div> */}

          <div className="w-full px-3 py-2 bg-white border border-dashed border-gray-200 mt-4 flex flex-col gap-2">
            <h3 className="text-lg font-bold text-gray-500">
              ¡Destaca tus habilidades lingüísticas!
            </h3>
            <h5 className="text-justify text-[17px] text-gray-400">
              Los idiomas que dominas son una puerta a nuevas oportunidades y
              conexiones globales. Comparte cuáles hablas, tu nivel de fluidez y
              cómo los has utilizado en tu vida personal o profesional. Hablar
              varios idiomas no solo amplía tu capacidad de comunicarte, sino
              que también refleja tu adaptabilidad y disposición para aprender.
              Agregar esta información puede ser clave para destacar en roles
              internacionales, proyectos multiculturales o con empresas que
              valoren la diversidad lingüística. Recuerda, cada idioma que
              hablas es una herramienta más para construir puentes y destacar en
              un mundo cada vez más conectado.
            </h5>
          </div>
        </section>
      </section>
      <section className=" h-[400px] bg-red-800 px-5 py-3">
        {/* Header */}
      </section>
    </main>
  )
}

export default Profile
