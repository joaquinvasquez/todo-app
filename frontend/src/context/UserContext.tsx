import { createContext, useEffect, useState } from 'react'
import { type UserType, type UserContextType } from '../types'

const UserContext = createContext<UserContextType>(null!)

interface Props {
  children: React.ReactNode
}

const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<UserType>('')

  const createUser = async (): Promise<void> => {
    try {
      const res = await fetch(
        'https://todo-app-jvasquez-dev.onrender.com/users',
        {
          method: 'POST',
        }
      )
      const newUser: UserType = await res.json()
      setUser(newUser)
      localStorage.setItem('user', newUser)
    } catch (e) {
      console.log('Error creating user')
      throw e
    }
  }

  const data = { user }

  useEffect(() => {
    const localUser: UserType = localStorage.getItem('user') ?? ''
    if (localUser !== '') {
      setUser(localUser)
    } else {
      void createUser()
    }
  }, [])

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>
}

export { UserProvider }
export default UserContext
