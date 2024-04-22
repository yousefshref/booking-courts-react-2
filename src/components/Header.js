import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApiContextProvider } from '../contexts/ApiContext'
import { Button, Dropdown } from 'antd'

const Header = () => {
  const navigate = useNavigate()

  const apiContext = useContext(ApiContextProvider)

  const [user, setUser] = useState({})
  const getUser = async () => {
    try {
      const res = await apiContext?.getUser()
      setUser(res?.data)
    } catch (err) {
      console.log(err);
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('email')
      window.location.reload()
    }
  }
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUser()
    }
  }, [])


  const [checkProfile, setCheckProfile] = useState(null)
  const getCheckProfile = async () => {
    const res = await apiContext?.checkProfile(localStorage.getItem('token'))
    setCheckProfile(res?.data)
  }
  useEffect(() => {
    getCheckProfile()
  }, [])

  const items = [
    {
      key: '1',
      label: (
        <p onClick={() => {
          if (checkProfile?.manager) {
            navigate(`/manager/${user?.username}/profile`)
          } else if (checkProfile?.staff) {
            navigate(`/staff/${user?.username}/profile`)
          } else {
            navigate(`/profile/${user?.username}/`)
          }
        }} className='my-auto'>أهلا, {localStorage.getItem('username')}</p>
      ),
    },
    {
      key: '2',
      label: (
        <p onClick={() => {
          localStorage.removeItem('token')
          localStorage.removeItem('username')
          localStorage.removeItem('email')
          window.location.reload()
        }} className='font text-red-500'>تسجيل الخروج</p>
      ),
    },
  ];

  return (
    <header className='flex justify-between p-2 bg-white'>
      <h3 className='text-2xl font-bold my-auto hidden md:flex'>لينكاوي</h3>
      <div className='navs flex gap-2 my-auto'>
        {
          checkProfile?.manager && (
            <>
              <p onClick={() => navigate(`/manager/${user?.username}/courts`)} className='cursor-pointer transition-all hover:text-blue-800 md:text-base text-sm'>الملاعب</p>
              <p onClick={() => navigate(`/manager/${user?.username}/academies`)} className='cursor-pointer transition-all hover:text-blue-800 md:text-base text-sm'>الأكاديميات</p>
              <p onClick={() => navigate(`/manager/${user?.username}/books`)} className='cursor-pointer transition-all hover:text-blue-800 md:text-base text-sm'>الحجوزات</p>
              <p onClick={() => navigate(`/manager/${user?.username}/staffs`)} className='cursor-pointer transition-all hover:text-blue-800 md:text-base text-sm'>الموظفين</p>
              <p onClick={() => navigate(`/manager/${user?.username}/settings`)} className='cursor-pointer transition-all hover:text-blue-800 md:text-base text-sm'>الاعدادات</p>
            </>
          )
        }
        {
          checkProfile?.staff && (
            <>
              <p onClick={() => navigate(`/staff/${user?.username}/courts`)} className='cursor-pointer transition-all hover:text-blue-800 md:text-base text-sm'>الملاعب</p>
              <p onClick={() => navigate(`/staff/${user?.username}/academies`)} className='cursor-pointer transition-all hover:text-blue-800 md:text-base text-sm'>الأكاديميات</p>
              <p onClick={() => navigate(`/staff/${user?.username}/books`)} className='cursor-pointer transition-all hover:text-blue-800 md:text-base text-sm'>الحجوزات</p>
              <p onClick={() => navigate(`/staff/${user?.username}/settings`)} className='cursor-pointer transition-all hover:text-blue-800 md:text-base text-sm'>الاعدادات</p>
            </>
          )
        }
        {
          checkProfile?.user && (
            <>
              <p onClick={() => navigate(`/courts`)} className='cursor-pointer transition-all hover:text-blue-800 md:text-base text-sm'>الملاعب</p>
              <p onClick={() => navigate(`/academies/`)} className='cursor-pointer transition-all hover:text-blue-800 md:text-base text-sm'>الأكاديميات</p>
              <p onClick={() => navigate(`/profile/${user?.username}`)} className='cursor-pointer transition-all hover:text-blue-800 md:text-base text-sm'>الحجوزات</p>
            </>
          )
        }
      </div>
      <div className='flex gap-1'>
        <Dropdown
          menu={{
            items,
          }}
          placement="bottom"
        >
          <span>
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt={localStorage.getItem('username')} width={40} height={40} />
          </span>
        </Dropdown>
      </div>
    </header>
  )
}

export default Header
