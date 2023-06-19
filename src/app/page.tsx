'use client'
import { useSession } from 'next-auth/react'
import React from 'react'
import LoadingLayout from '../layouts/loading/loading.layout'
import { useRouter } from 'next/navigation'

export default function Home () {
  let component = (<></>)

  const router = useRouter()
  const { data: session, status } = useSession()

  if (status === 'unauthenticated') {
    router.push('/auth/signin')
  }

  if (status === 'loading') {
    // Circular LoadingComponent
    component = (<>Loading or not authenticated...</>)
  }

  if (session) {
    // Progress bar LoadingFromApi component
    router.push('/dashboard')
  }

  return (
    <LoadingLayout type=''>
      {component}
    </LoadingLayout>
  )
}
