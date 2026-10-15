import React from 'react'

const Loader = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
}

export default Loader;