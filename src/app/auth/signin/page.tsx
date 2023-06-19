/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { NextPage } from 'next'
import { ClientSafeProvider, getProviders, signIn as signin, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import LoadingLayout from '@/layouts/loading/loading.layout'

const signIn: NextPage = () => {
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider>>({})
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    async function getProvidersValue () {
      const p = await getProviders()
      setProviders(p as Record<string, ClientSafeProvider>)
    }
    getProvidersValue()
  }, [])

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])
  return (
    <LoadingLayout type=''>
      {providers && !!Object.keys(providers).length && Object.values(providers).map((provider: any) => (
        <button key={provider.name} onClick={() => signin(provider.id)}>
          Sign in with {provider.name}
        </button>
      ))}
    </LoadingLayout>
  )
}

export default signIn
