/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { NextPage } from 'next'
import { ClientSafeProvider, getProviders, signIn as signin, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

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
    <>
      {providers && !!Object.keys(providers).length && Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <button onClick={() => signin(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  )
}

export default signIn
