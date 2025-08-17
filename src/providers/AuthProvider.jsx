import React, { useState } from 'react'
import { AuthContext } from '../context'

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})
    
  return (
    <AuthContext value={{auth, setAuth}}>
        {children}
    </AuthContext>
  )
}
