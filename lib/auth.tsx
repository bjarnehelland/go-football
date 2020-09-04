import React, { useState, useEffect, useContext, createContext } from 'react'
import Router from 'next/router'

import firebase from './firebase'
import { createUser } from './db'

type ContextProps = {
  user?: {
    uid: string
    email: string
    name: string
    token: string
    provider: string
    photoUrl: string
  }

  loading: boolean
  signinWithGoogle: (redirect?: string) => Promise<void>
  signout: Function
}

const authContext = createContext<Partial<ContextProps>>({})

export function AuthProvider({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser)
      const { token, ...userWithoutToken } = user

      createUser(user.uid, userWithoutToken)
      setUser(user)
      setLoading(false)
      return user
    } else {
      setUser(false)
      setLoading(false)
      return false
    }
  }

  const signinWithGoogle = (redirect) => {
    setLoading(true)
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        handleUser(response.user)

        if (redirect) {
          Router.push(redirect)
        }
      })
  }

  const signout = () => {
    Router.push('/')

    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false))
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser)

    return () => unsubscribe()
  }, [])

  return {
    user,
    loading,
    signinWithGoogle,
    signout,
  }
}

const getClaim = async (claimId, defaultValue) => {
  await firebase.auth().currentUser.getIdToken(true)
  const decodedToken = await firebase.auth().currentUser.getIdTokenResult()
  return decodedToken.claims[claimId] || defaultValue
}

const formatUser = async (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    token: user.xa,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    //claim: await getClaim('claimId', 'free'),
  }
}
