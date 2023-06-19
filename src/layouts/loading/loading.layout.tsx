import './styles.css'
import React from 'react'

export default function LoadingLayout ({
  children,
  type
}: {
  children: React.ReactNode,
  type: string
}) {
  return (
    <main className='background page container'>
      <div className='relative'>
        <div className='loader-container'>
          <div className='ring' />
          <div className='ring' />
          <div className='ring' />
          <div className='loading'>Loading...</div>
        </div>
        <div className='circle-container' />
      </div>
      <div className='children-container'>
        {children}
      </div>
    </main>
  )
}
