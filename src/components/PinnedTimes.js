import { message, Modal } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { ApiContextProvider } from '../contexts/ApiContext'
import { Delete, Restore } from '@mui/icons-material'

const PinnedTimes = ({ open, setOpen, book, getBooks }) => {
  const apiContext = useContext(ApiContextProvider)

  const [pinnedTimes, setPinnedTimes] = useState([])

  const getPinnedTimes = async () => {
    try {
      const res = await apiContext?.pinnedTimes(book?.id)
      setPinnedTimes(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    book?.id && getPinnedTimes()
  }, [book?.id])


  const [messageApi, messageApiContext] = message.useMessage()

  const success = (text) => {
    message.success({ content: text, style: { marginTop: '20vh' } })
  }

  return (
    <Modal
      centered
      width={700}
      visible={open}
      onOk={() => { }}
      onCancel={() => { setOpen(false) }}
      okText='تحديث'
      cancelText='اغلاق'
    >
      {messageApiContext}
      <div className='flex flex-col gap-3'>
        <p>الحجوزات المثبتة</p>
        <hr />
        <div className='flex flex-col gap-3 p-3 bg-indigo-100'>
          {
            pinnedTimes?.map((time, index) => (
              <div key={index} className='flex justify-between p-4 rounded-md bg-white'>
                <p>تاريخ: {time?.date} - نفس الوقت</p>
                {
                  time?.is_cancelled ? (
                    <span onClick={async () => {
                      await apiContext?.pinnedTimesUpdate(time?.id, { is_cancelled: 'False' })
                      await getBooks()
                      getPinnedTimes()
                      success('تم استرجاع الوقت بنجاح')
                    }} className='text-green-400 cursor-pointer transition-all hover:text-green-500'>
                      <Restore />
                    </span>
                  ) : (
                    <span onClick={async () => {
                      await apiContext?.pinnedTimesUpdate(time?.id, { is_cancelled: 'True' })
                      await getBooks()
                      getPinnedTimes()
                      success('تم الغاء الوقت بنجاح')
                    }} className='text-red-400 cursor-pointer transition-all hover:text-red-500'>
                      <Delete />
                    </span>
                  )
                }
              </div>
            ))
          }
        </div>
      </div>
    </Modal>
  )
}

export default PinnedTimes
