'use client'
import { NextPage } from 'next'
import { signOut, useSession } from 'next-auth/react'

interface Props { }

const Page: NextPage<Props> = () => {
  const { data: session } = useSession()
  return (
    <div>
      <div>Hi! {session?.user?.name}</div>
      <button onClick={() => {
        signOut()
      }}
      >logOut
      </button>
    </div>
  )
}

export default Page
