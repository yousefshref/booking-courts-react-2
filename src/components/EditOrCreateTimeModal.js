import { Button, Input, Modal, Popconfirm } from 'antd'
import React, { useContext, useEffect } from 'react'
import { ApiContextProvider } from '../contexts/ApiContext'

const EditOrCreateTimeModal = ({ time, setOpen, open, getAcademyTimes, create, academy }) => {

  const apiContext = useContext(ApiContextProvider)

  const [timeData, setTimeData] = React.useState({})
  const getAcademyTime = async () => {
    try {
      const res = await apiContext?.getAcademyTime(time?.id)
      setTimeData(res?.data)
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (!create && time?.id) getAcademyTime()
  }, [time?.id, create])


  const [dayName, setDayName] = React.useState('')
  const [startTime, setStartTime] = React.useState('')
  const [endTime, setEndTime] = React.useState('')

  useEffect(() => {
    if (!create) {
      timeData?.day_name && setDayName(timeData?.day_name)
      timeData?.start_time && setStartTime(timeData?.start_time)
      timeData?.end_time && setEndTime(timeData?.end_time)
    }
  }, [timeData?.id, timeData, create])



  const updateAcademyTime = async () => {
    try {
      await apiContext?.updateAcademyTime(time?.id, {
        day_name: dayName,
        start_time: startTime,
        end_time: endTime
      })
      setOpen(false)
      getAcademyTimes()
    } catch (err) {
      console.log(err);
    }
  }





  const createAcademyTime = async () => {
    try {
      await apiContext?.createAcademyTime({
        academy: academy?.id,
        day_name: dayName,
        start_time: startTime,
        end_time: endTime
      })
      setOpen(false)
      getAcademyTimes()
    } catch (err) {
      console.log(err);
    }
  }



  return (
    <Modal
      centered
      open={open}
      onOk={() => {
        if (!create) {
          updateAcademyTime()
        } else {
          // create funcion
          createAcademyTime()
        }
      }}
      onCancel={() => setOpen(false)}
      closeIcon={false}
    >

      <div className='p-4 bg-indigo-200 flex rounded-lg flex-col gap-3'>

        <div className='bg-white p-3 rounded-lg flex flex-col gap-1'>
          <p>اسم اليوم</p>
          <Input className='font' placeholder='اسم اليوم' value={dayName} onChange={(e) => setDayName(e.target.value)} />
        </div>

        <div className='bg-white p-3 rounded-lg flex flex-col gap-1'>
          <p>معاد فتح التدريب</p>
          <Input type='time' className='font' placeholder='وقت البدء' value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </div>

        <div className='bg-white p-3 rounded-lg flex flex-col gap-1'>
          <p>معاد اغلاق التدريب</p>
          <Input type='time' className='font' placeholder='وقت الانتهاء' value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </div>

        {
          !create &&
          <Popconfirm
            title="هل تريد حذف هذا الموعد؟"
            onConfirm={async () => {
              await apiContext?.deleteAcademyTime(timeData?.id)
              await getAcademyTimes()
              setOpen(false)
            }}
            okText="نعم"
            cancelText="لا"
          >
            <Button type='primary' className='w-full bg-red-500 font'>حذف الموعد</Button>
          </Popconfirm>
        }

      </div>

    </Modal>
  )
}

export default EditOrCreateTimeModal