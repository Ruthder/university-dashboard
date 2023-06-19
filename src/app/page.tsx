'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import LoadingLayout from '../layouts/loading/loading.layout'

export default function Home () {
  let component = (<></>)

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated () {
      signIn()
    }
  })

  if (status === 'loading') {
    // Circular LoadingComponent
    component = (<p>Loading or not authenticated...</p>)
  }

  if (session) {
    // Progress bar LoadingFromApi component
    component = (
      <p>
        <p>Hi! {session?.user?.name}</p>
        <button onClick={() => {
          signOut()
        }}
        >logOut
        </button>
      </p>
    )
  }

  return (
    <LoadingLayout type=''>
      {component}
    </LoadingLayout>
  )
}
