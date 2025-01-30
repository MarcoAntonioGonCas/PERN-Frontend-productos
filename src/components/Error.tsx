import React from 'react'

export default function Error({
  children
}:{children: React.ReactNode}) {
  return (
    <div className='bg-red-200 border-l-4 border-red-500 text-red-700 font-bold p-4 mb-5 ' role='alert'>
      {children}
    </div>
  )
}
