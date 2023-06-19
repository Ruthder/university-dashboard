'use client'
import React from 'react'
import LoadingLayout from '@/layouts/loading/loading.layout'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Page = ({ children } : {children: React.ReactNode}) => {
  const router = useRouter()
  const { data: session, status } = useSession()

  if (status === 'unauthenticated') {
    router.push('/auth/signin')
  }

  return (
    <>
      {status === 'loading' || session === null
        ? <LoadingLayout type='' children={undefined} /> : 
        <>
          {children}
        </>}
    </>
  )
}

export default Page
