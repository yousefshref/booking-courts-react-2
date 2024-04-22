import { Button, Input, message, Modal, Select } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { ApiContextProvider } from '../contexts/ApiContext'

const CreateAcademyButton = ({ getAcademies }) => {

  const apiContext = useContext(ApiContextProvider)

  const [open, setOpen] = useState(false)

  const [types, setTypes] = useState([])
  const getAcademyTypes = async () => {
    const res = await apiContext?.getAcademyTypes()
    setTypes(res?.data)
  }
  useEffect(() => {
    getAcademyTypes()
  }, [])


  const [messageApi, contextHolder] = message.useMessage();

  const error = (message) => {
    messageApi.error(message);
  };

  const success = (message) => {
    messageApi.success(message);
  };


  const [image, setImage] = useState(null)
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [location, setLocation] = useState('')
  const [locationUrl, setLocationUrl] = useState('')
  const [website, setWebsite] = useState('')


  const createAcademy = async () => {
    const data = new FormData()

    data.append('image', image)
    data.append('name', name)
    data.append('type', type)
    data.append('location', location)
    data.append('location_url', locationUrl)
    data.append('website', website)

    const res = await apiContext?.createAcademy(data)
    if (res?.data?.id) {
      setOpen(false)
      getAcademies()
      success('تم انشاء الاكاديمية بنجاح')
      setName('')
      setType('')
      setLocation('')
      setLocationUrl('')
      setWebsite('')
    } else {
      Object?.entries(res?.data || {}).forEach(([key, value]) => error(`${key}: ${value?.join(', ')}`))
    }
  }

  return (
    <div className='createAcademy'>
      {contextHolder}

      <Button onClick={() => setOpen(true)} className='bg-green-500 font' type='primary' size='large'>انشاء اكاديمية</Button>

      <Modal
        centered
        width={650}
        closeIcon={false}
        open={open}
        onOk={createAcademy}
        onCancel={() => setOpen(false)}
      >
        <div className='flex flex-col gap-3 max-h-[500px] bg-indigo-500 rounded-md p-3 min-h-fit overflow-scroll'>

          <div className='flex flex-col p-3 rounded-md bg-white'>
            <p>صورة للأكاديمية</p>
            <Input type='file' onChange={(e) => setImage(e.target.files[0])} placeholder='اسم الاكاديمية' className='w-full' />
          </div>


          <div className='flex flex-col p-3 rounded-md bg-white'>
            <p>اسم الاكاديمية *</p>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder='اسم الاكاديمية' className='w-full' />
          </div>

          <div className='flex flex-col p-3 rounded-md bg-white'>
            <p>نوع الاكاديمية *</p>
            <Select value={type} onChange={(e) => setType(e)}>
              <Select.Option value=''>أختر نوع الاكاديمية</Select.Option>
              {
                types?.map((type, index) => (
                  <Select.Option key={index} value={type?.id}>{type?.name}</Select.Option>
                ))
              }
            </Select>
          </div>

          <div className='flex flex-col p-3 rounded-md bg-white'>
            <p>عنوان الاكاديمية *</p>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder='عنوان الاكاديمية' className='w-full' />
          </div>


          <div className='flex flex-col p-3 rounded-md bg-white'>
            <p>رابط خرائظ جوجل (أختياري)</p>
            <Input value={locationUrl} onChange={(e) => setLocationUrl(e.target.value)} placeholder='رابط خرائط جوجل' className='w-full' />
          </div>

          <div className='flex flex-col p-3 rounded-md bg-white'>
            <p>موقع الكتروني (أختياري)</p>
            <Input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder='موقع الكتروني' className='w-full' />
          </div>

        </div>
      </Modal>

    </div>
  )
}

export default CreateAcademyButton
