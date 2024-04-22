import { Button, message } from 'antd'
import React, { useContext } from 'react'
import { ApiContextProvider } from '../contexts/ApiContext'
import { useNavigate } from 'react-router-dom'

const ChooseProfile = () => {
  const apiContext = useContext(ApiContextProvider)

  const navigate = useNavigate()

  const [msg, setMsg] = message.useMessage();

  const success = (text) => {
    msg.success(text);
  }

  const error = (text) => {
    msg.error(text);
  }

  const createManagerProfile = async () => {
    try {
      const res = await apiContext?.createManagerProfile()
      success('تم انشاء ملفك الشخصي بنجاح')
      navigate(`/manager/${res.data.user_details?.username}`)
    } catch (err) {
      error("يوجد هناك مشكلة ما")
    }
  }

  const createClientsProfile = async () => {
    try {
      const res = await apiContext?.createClientsProfile()
      success('تم انشاء ملفك الشخصي بنجاح')
      navigate(`/courts`)
    } catch (err) {
      error("يوجد هناك مشكلة ما")
    }
  }
  return (
    <div className='h-screen p-4 flex flex-col justify-center w-full max-w-[800px] mx-auto'>
      {setMsg}
      <div className='p-4 shadow-md justify-around bg-white rounded-md flex flex-wrap gap-4'>
        <div onClick={createManagerProfile} className='w-full bg-blue-100 rounded-md cursor-pointer transition-all hover:bg-blue-200 max-w-[300px] p-3 flex flex-col justify-center'>
          <p className='mx-auto'>اكاديمية/ مدير ملاعب</p>
        </div>
        <div onClick={createClientsProfile} className='w-full bg-blue-100 rounded-md cursor-pointer transition-all hover:bg-blue-200 max-w-[300px] p-3 flex flex-col justify-center'>
          <p className='mx-auto'>لاعب</p>
        </div>
      </div>
    </div>
  )
}

export default ChooseProfile