import { useEffect, useState } from "react"
import { LocalStorageRepository } from "../modules/Users/infrastructure/LocalStorageRepository"
import { Outlet, Navigate } from "react-router-dom"

function ProtectedRoutes() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { getUser } = LocalStorageRepository()
      const userData = await getUser()
      setUser(userData)
      setIsLoading(false)
    }
    fetchUser()
  }, [])

  if (isLoading) {
    return <div>Loading...</div> // O un spinner
  }

  if (!user) {
    return <Navigate to="/" />
  }

  return <Outlet />
}

export default ProtectedRoutes
