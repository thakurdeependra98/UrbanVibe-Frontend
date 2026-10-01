import React from 'react'
import Route from './routes/route'
import { ToastProvider } from './componets/common/Toast'

const App = () => {
  return (
    <ToastProvider>
      <div className='bg-primary overflow-hidden'>
        <Route/>
      </div>
    </ToastProvider>
  )
}

export default App