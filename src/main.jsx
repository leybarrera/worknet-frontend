import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { VoiceProvider } from './context/VoiceContext.jsx'

createRoot(document.getElementById('root')).render(
  <VoiceProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </VoiceProvider>
)
