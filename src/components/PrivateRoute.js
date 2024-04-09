import React, { useContext, useEffect, useState } from 'react'
import { ApiContextProvider } from '../contexts/ApiContext'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const apiContext = useContext(ApiContextProvider)

  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(false)
  const getUser = async () => {
    try {
      const res = await apiContext?.getUser()
      setUser(res.data)
    } catch (err) {
      setErr(true)
      console.log(err);
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getUser()
  }, [])

  // return user.id && !loading ? children : <Navigate to="/auth/login" />
  if (!loading && user.id) {
    return children
  } else if (err) {
    <Navigate to={"/auth/login"} />
  }

}

export default PrivateRoute