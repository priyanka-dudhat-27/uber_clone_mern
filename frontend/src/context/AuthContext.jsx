import React from 'react'

export const UserDataContext = React.createContext()

const AuthContext = ({children}) => {
    const user="priyanka"
  return (
    <UserDataContext.Provider value={user}>
      {children}
    </UserDataContext.Provider>
  )
}

export default AuthContext