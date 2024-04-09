import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  return (
    <header className='flex justify-between p-2 bg-white'>
      <h3 className='text-2xl font-bold my-auto'>لينكاوي</h3>
      <div className='navs flex gap-2 my-auto'>
        <p onClick={() => navigate(`${window.location.pathname}/courts`)} className='cursor-pointer transition-all hover:text-blue-800'>الملاعب</p>
        <p onClick={() => navigate(`${window.location.pathname}/books`)} className='cursor-pointer transition-all hover:text-blue-800'>الحجوزات</p>
        <p onClick={() => navigate(`${window.location.pathname}/settings`)} className='cursor-pointer transition-all hover:text-blue-800'>الاعدادات</p>
      </div>
      <div className='flex gap-1'>
        <p className='my-auto'>أهلا, {localStorage.getItem('username')}</p>
        <span>
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" width={40} height={40} />
        </span>
      </div>
    </header>
  )
}

export default Header
