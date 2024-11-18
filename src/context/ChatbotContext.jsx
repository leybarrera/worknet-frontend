// context/ChatbotContext.jsx
import { createContext, useState } from 'react'

export const ChatbotContext = createContext()

export const ChatbotProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false) // Estado para abrir y cerrar el chatbot
  const [inputText, setInputText] = useState('') // Estado para el texto dictado en el input

  return (
    <ChatbotContext.Provider
      value={{ isOpen, setIsOpen, inputText, setInputText }}
    >
      {children}
    </ChatbotContext.Provider>
  )
}
