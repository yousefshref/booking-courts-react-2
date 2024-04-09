import React, { createContext } from 'react'
import axios from 'axios'
import { server } from '../utlits/Variables'

const ApiContext = ({ children }) => {
  const header = {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  }

  const loginFunction = async (phone, password) => {
    const res = await axios.post(`${server}login/`, {
      phone: phone,
      password: password
    })
    return res
  }

  const getUser = async () => {
    const res = await axios.get(`${server}user/`, header)
    return res
  }

  const checkProfile = async () => {
    const res = await axios.get(`${server}user/profile/`, header)
    return res
  }


  const getCourts = async () => {
    const res = await axios.get(`${server}courts/`, header)
    return res
  }

  return (
    <ApiContextProvider.Provider value={{
      loginFunction,

      getUser,
      checkProfile,

      getCourts,
    }}>
      {children}
    </ApiContextProvider.Provider>
  )
}

export const ApiContextProvider = createContext()
export default ApiContext