import React, { createContext, useState } from 'react'

export const VoiceContext = createContext()

export const VoiceProvider = ({ children }) => {
  const [voiceCommand, setVoiceCommand] = useState('')
  const [dictatedText, setDictatedText] = useState('')

  return (
    <VoiceContext.Provider
      value={{ voiceCommand, setVoiceCommand, dictatedText, setDictatedText }}
    >
      {children}
    </VoiceContext.Provider>
  )
}
