import { useState, useEffect, useRef } from 'react'
import { VscRobot } from 'react-icons/vsc'
import { RiArrowDownSLine } from 'react-icons/ri'

const Chatbot = ({ setIsOpen }) => {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte?',
    },
  ])
  const [text, setText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const messagesEndRef = useRef(null) // Referencia al contenedor de mensajes

  // Cuando se agregan nuevos mensajes, hacer scroll al último
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages]) // Este efecto se ejecutará cada vez que los mensajes cambien

  const rules = {
    hola: [
      'hola',
      'buenos días',
      'buenas tardes',
      'buenas noches',
      'hey',
      'holi',
      'qué tal',
      'cómo estás',
      'hola, ¿qué tal?',
    ],
    '¿qué es esta plataforma?': [
      '¿qué es esta plataforma?',
      '¿qué es esto?',
      '¿qué hacen aquí?',
      '¿de qué trata la plataforma?',
      '¿para qué sirve esta plataforma?',
      '¿puedes explicar qué es?',
      '¿en qué consiste esto?',
      '¿qué finalidad tiene?',
      '¿por qué existe esta plataforma?',
    ],
    '¿cómo funciona?': [
      '¿cómo funciona?',
      '¿cómo trabaja esto?',
      '¿cómo puedo usar esta plataforma?',
      '¿cómo opera?',
      '¿cómo lo utilizo?',
      'explícame cómo funciona',
      '¿me puedes explicar cómo usarla?',
      '¿cómo es el procedimiento?',
    ],
    '¿que haces?': [
      '¿qué haces?',
      '¿qué nomás haces?',
      '¿para que nomás sirves?',
    ],
    '¿cómo me registro?': [
      '¿cómo me registro?',
      '¿cómo puedo registrarme?',
      '¿cómo hacer un perfil?',
      '¿cómo me inscribo?',
      '¿cómo creo una cuenta?',
      '¿qué pasos debo seguir para registrarme?',
      '¿es necesario registrarme?',
      '¿cómo iniciar sesión?',
    ],
    horarios: [
      'hora',
      'hasta que hora?',
      '¿Hasta que hora?',
      'atención',
      'atiendan',
      'horario',
      'horarios',
      '¿cuáles son sus horarios?',
      '¿a qué hora atienden?',
      '¿cuándo están disponibles?',
      '¿qué horario manejan?',
      '¿qué horario tienen?',
      '¿están abiertos todo el día?',
      '¿a qué horas puedo contactarlos?',
    ],
    precios: [
      '¿cuánto cuesta?',
      '¿es gratis?',
      '¿tiene costo?',
      '¿cuál es el precio?',
      '¿hay planes de pago?',
      '¿cuánto debo pagar?',
      '¿tienen tarifas?',
      '¿es una plataforma gratuita?',
    ],
    contacto: [
      '¿cómo los contacto?',
      '¿tienen un número de teléfono?',
      '¿dónde puedo escribirles?',
      '¿cuál es su email?',
      '¿cómo puedo comunicarme con ustedes?',
      'necesito hablar con alguien',
      '¿tienen un chat?',
      '¿cómo puedo enviar un mensaje?',
    ],
    'problemas técnicos': [
      'tengo un problema técnico',
      'la página no funciona',
      'no puedo registrarme',
      'no puedo iniciar sesión',
      'no puedo acceder a mi cuenta',
      'la plataforma está caída',
      '¿cómo reporto un problema?',
      'algo no funciona bien',
    ],
    gracias: [
      'gracias',
      'muchas gracias',
      'gracias por la info',
      '¡gracias!',
      'te agradezco',
      'gracias por tu ayuda',
      'eres de gran ayuda',
      'muy amable, gracias',
    ],
    adios: [
      'adios',
      'adios, gracias',
      'bye',
      'goodbye',
      'adiosito',
      'nos vemos',
      'hasta luego',
      'hasta pronto',
      'chau',
    ],
    insultos: [
      'idiota',
      'tonto',
      'imbécil',
      'estúpido',
      'vete a la mierda',
      'maldito',
      'bobo',
      'tarado',
      'payaso',
      'mierda',
      'no sirves',
      'no sirves para nada',
      'incompetente',
      'plataforma basura',
      'basura',
      'caca',
      'inservible',
      'plataforma obsoleta',
    ],
    disculpas: [
      'perdón',
      'lo siento',
      'me disculpo',
      'me arrepiento',
      'estoy arrepentido',
      'me equivoqué',
      'perdoname',
      'sorry',
      'im sorry',
      'i sorry',
    ],
    default: [
      'default',
      'no entiendo',
      'qué?',
      'puedes repetir?',
      'no sé cómo preguntar',
    ],
  }

  const responses = {
    hola: '¡Hola! ¿En qué puedo ayudarte hoy?',
    '¿qué es esta plataforma?':
      'Esta es una plataforma diseñada para facilitar la conexión laboral entre empresas y candidatos. Aquí puedes encontrar ofertas laborales, publicar vacantes, y mucho más.',
    '¿cómo funciona?':
      'La plataforma funciona de manera sencilla: si eres candidato, puedes crear tu perfil, buscar ofertas laborales y postularte. Si eres empresa, puedes publicar vacantes y gestionar postulaciones.',
    '¿cómo me registro?':
      'Para registrarte, solo selecciona tu rol (empresa o candidato) y llena el formulario con tus datos. Es un proceso rápido y sencillo.',
    horarios:
      'Nuestros horarios de atención son de lunes a viernes de 9:00 a 18:00 horas. Fuera de este horario, puedes dejarnos un mensaje y responderemos lo antes posible.',
    precios:
      '¡Es completamente gratis para los candidatos! Las empresas pueden optar por planes gratuitos o pagos, dependiendo de las funciones adicionales que necesiten.',
    contacto:
      'Puedes contactarnos enviando un correo a contacto@ejemplo.com, llamando al +593-123-456-789 o a través del chat de la plataforma.',
    'problemas técnicos':
      'Si tienes un problema técnico, por favor escríbenos a soporte@ejemplo.com detallando el inconveniente o utiliza la sección de ayuda en la plataforma.',
    gracias: '¡De nada! Si tienes más preguntas, no dudes en escribir.',
    adios: '¡Hasta luego! Que tengas un excelente día.',
    insultos:
      'Por favor, mantengamos una conversación respetuosa. Estoy aquí para ayudarte.',
    '¿que haces?':
      'Como plataforma puedo hacer muchas cosas. Registrar candidatos, empresas que buscan trabajadores, evaluar perfiles para asegurar un máximo de compatibilidad del candidato con el puesto de trabajo, funciono con comandos de voz y tengo un ChatBot súper intuitivo que podrá resolver algunas de tus dudas. ¿Tienes alguna duda? Recuerda que puedes usar palabras claves como: horarios, contacto, precios...etc. Me han entrenado para comprender tus necesidades. Si no las entiendo me sirve para seguir aprendiendo.',
    disculpas:
      'No te preocupes. Sigamos adelante. Si puedo ayudarte lo haré con gusto, siempre manteniendo el respeto.',
    default:
      'Lo siento, no entiendo esa pregunta. ¿Podrías intentar reformularla? Estoy aquí para ayudarte.',
  }

  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
  }

  const getResponse = (input) => {
    const normalizedInput = normalizeText(input)

    for (const [key, synonyms] of Object.entries(rules)) {
      if (
        synonyms.some((synonym) =>
          normalizedInput.includes(normalizeText(synonym))
        )
      ) {
        return responses[key]
      }
    }

    return responses.default // Respuesta predeterminada
  }

  const handleText = (e) => setText(e.target.value)

  const handleSend = () => {
    if (!text.trim()) return

    const userMessage = { sender: 'user', text }
    setMessages((prev) => [...prev, userMessage])
    setText('')

    // Simula que el bot está escribiendo
    setIsTyping(true)

    // Genera la respuesta del bot después de un retraso
    setTimeout(() => {
      const botResponse = {
        sender: 'bot',
        text: getResponse(text),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 2000) // 2 segundos de espera
  }

  // Maneja el evento cuando el usuario presiona la tecla "Enter"
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault() // Evita el salto de línea
      handleSend()
    }
  }

  return (
    <div className="fixed bottom-16 right-4 w-[400px] h-[600px] bg-white/80 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg animate-slide-up flex flex-col">
      {/* Encabezado del Chatbot */}
      <div className="bg-[#00BCB8] text-white p-3 rounded-t-lg flex justify-between items-center shadow-md">
        <div className="flex flex-row gap-2 items-center">
          <VscRobot className="text-white" size={30} />
          <span className="font-bold text-lg">Chatbot</span>
        </div>
        <button
          className="text-white hover:bg-white/20 p-2 rounded-full transition-all"
          aria-label="Cerrar chatbot"
          onClick={() => setIsOpen(false)}
        >
          <RiArrowDownSLine size={30} />
        </button>
      </div>

      {/* Contenedor de Mensajes con Scroll */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto overflow-x-hidden">
        {messages.map((message, idx) => (
          <div
            key={idx}
            className={`my-3 transition-transform transform ${
              message.sender === 'bot'
                ? 'text-left animate-slide-in-left'
                : 'text-right animate-slide-in-right'
            }`}
          >
            <span
              className={`inline-block p-[12px] rounded-2xl shadow-sm ${
                message.sender === 'bot'
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-[#00BCB8] text-white'
              }`}
            >
              {message.text}
            </span>
          </div>
        ))}

        {/* Animación de "Escribiendo..." */}
        {isTyping && (
          <div className="text-left animate-fade-in">
            <span className="inline-block p-[10px] rounded-2xl bg-gray-200 text-black">
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></span>
              </div>
            </span>
          </div>
        )}

        {/* Referencia para hacer scroll automático */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input del Chat */}
      <div className="p-3 border-t border-gray-200 flex items-center">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          className="flex-1 px-4 py-2 border rounded-full text-sm outline-none focus:ring-2 focus:ring-[#00BCB8] focus:border-[#00BCB8] transition-all"
          value={text}
          onChange={handleText}
          onKeyDown={handleKeyDown} // Se agrega el manejador de la tecla "Enter"
        />
      </div>
    </div>
  )
}

export default Chatbot
