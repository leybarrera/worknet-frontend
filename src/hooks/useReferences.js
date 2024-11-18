// src/hooks/useReferences.js
import { useState } from 'react'

const useReferences = () => {
  const [reference, setReference] = useState({
    name: '',
    relationship: '',
    phone: '',
    email: '',
  })

  const updateReference = (e) => {
    const { name, value } = e.target
    setReference((prevReferences) => ({
      ...prevReferences,
      [name]: value,
    }))
  }

  return {
    reference,
    updateReference,
  }
}

export default useReferences
