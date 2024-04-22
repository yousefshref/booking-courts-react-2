import React, { useContext, useEffect, useState } from 'react'
import { ApiContextProvider } from '../contexts/ApiContext'
import { Button, Input } from 'antd'

const ManagerSettingsComponent = ({ success, error }) => {
  const apiContext = useContext(ApiContextProvider)

  const [settings, setSettings] = useState({})
  const getSettings = async () => {
    const res = await apiContext?.getSettings()
    setSettings(res?.data)
  }
  useEffect(() => {
    getSettings()
  }, [])


  const [bookingWarning, setBookingWarning] = useState('')
  const [limitOfPayingInMinuts, setLimitOfPayingInMinuts] = useState('')
  const [limitOfCancelingInMinuts, setLimitOfCancelingInMinuts] = useState('')


  useEffect(() => {
    if (settings?.id) {
      setBookingWarning(settings?.booking_warning)
      setLimitOfPayingInMinuts(settings?.limit_of_paying_in_minuts)
      setLimitOfCancelingInMinuts(settings?.limit_of_canceling_in_minuts)
    }
  }, [settings?.id])

  const updateSettings = async () => {
    const res = await apiContext?.updateSettings(bookingWarning, limitOfPayingInMinuts, limitOfCancelingInMinuts)
    if (res.data.id) {
      success('تم تحديث الاعدادات بنجاح')
      getSettings()
    } else {
      error('حدث خطأ ما')
    }
  }


  return (
    <div className='flex flex-col gap-4 p-4 w-full max-w-4xl mx-auto'>
      <p>الاعدادات</p>
      <hr />
      <div className='flex flex-col gap-4 bg-white p-4 shadow-md'>
        <div className='flex flex-col gap-2'>
          <p>تحذير/ رسالة قبل حجز اللاعب للملعب</p>
          <Input className='p-4' onChange={(e) => setBookingWarning(e.target.value)} value={bookingWarning} />
          {
            !settings?.booking_warning && <p className='text-red-700'>لا يوجد تنبيه قبل الحجز</p>
          }
        </div>
        <div className='flex flex-col gap-2'>
          <p>اقصي وقت للدفع بعد الحجز (بالدقائق)</p>
          <Input type='number' className='p-4' onChange={(e) => setLimitOfPayingInMinuts(e.target.value)} value={limitOfPayingInMinuts} />
          {
            !settings?.limit_of_paying_in_minuts && <p className='text-red-700'>لا يوجد وقت معين للدفع, يعني يمكنة الدفع في اي وقت</p>
          }
        </div>
        <div className='flex flex-col gap-2'>
          <p>اقصي وقت للالغاء بعد الحجز (بالدقائق)</p>
          <Input type='number' className='p-4' onChange={(e) => setLimitOfCancelingInMinuts(e.target.value)} value={limitOfCancelingInMinuts} />
          {
            !settings?.limit_of_canceling_in_minuts && <p className='text-red-700'>لا يمكنة الالغاء</p>
          }
        </div>
        <Button onClick={updateSettings} type='primary' className='w-fit bg-green-600'>تحديث البيانات</Button>
      </div>
    </div>
  )
}

export default ManagerSettingsComponent