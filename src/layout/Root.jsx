import { Outlet } from 'react-router-dom'
import { Nav } from '../components/index.components'
import { ChatbotProvider } from '../context/ChatbotContext'
import { useState } from 'react'

const Root = () => {
  return (
    <ChatbotProvider>
      <div>
        <Nav />
        <main className="w-3/4 mx-auto pt-24">
          <Outlet />
        </main>
      </div>
    </ChatbotProvider>
  )
}

export default Root
