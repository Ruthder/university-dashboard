'use client'

import styles from './page.module.css'
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

export default function Home () {
  let component = (<></>)

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated () {
      signIn()
    }
  })

  if (status === 'loading') {
    return 'Loading or not authenticated...'
  }

  if (session) {
    component = (
      <p>
        Active user:&nbsp;
        <code className={styles.code}>Hi! {session?.user?.name}</code>
        <button onClick={() => {
          signOut()
        }}
        >logOut
        </button>
      </p>
    )
  }

  return (
    <main className={styles.main}>
      {component}
    </main>
  )
}
