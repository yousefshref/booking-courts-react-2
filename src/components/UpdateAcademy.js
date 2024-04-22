import { Button, Input, message, Modal, Popconfirm, Select } from 'antd'
import React, { useEffect } from 'react'
import { ApiContextProvider } from '../contexts/ApiContext'
import { server } from '../utlits/Variables'

const UpdateAcademy = ({ open, setOpen, getAcademies, academy }) => {

  const apiContext = React.useContext(ApiContextProvider)

  const [types, setTypes] = React.useState([])
  const getAcademyTypes = async () => {
    const res = await apiContext?.getAcademyTypes()
    setTypes(res?.data)
  }
  useEffect(() => {
    getAcademyTypes()
  }, [])

  const [image, setImage] = React.useState(null)
  const [name, setName] = React.useState('')
  const [type, setType] = React.useState('')
  const [location, setLocation] = React.useState('')
  const [locationUrl, setLocationUrl] = React.useState('')
  const [website, setWebsite] = React.useState('')

  useEffect(() => {
    if (academy) {
      setImage(academy?.image)
      setName(academy?.name)
      setType(academy?.type)
      setLocation(academy?.location)
      setLocationUrl(academy?.location_url)
      setWebsite(academy?.website)
    }
  }, [academy])


  const [messageApi, contextHolder] = message.useMessage();

  const error = (message) => {
    messageApi.error(message);
  };

  const updateAcademy = async () => {
    const data = new FormData()

    data.append('image', image)
    data.append('name', name)
    data.append('type', type)
    data.append('location', location)
    data.append('location_url', locationUrl)
    data.append('website', website)

    const res = await apiContext?.updateAcademy(academy?.id, data)
    if (res?.data?.id) {
      setOpen(false)
      getAcademies()
    } else {
      Object?.entries(res?.data || {}).forEach(([key, value]) => error(`${key}: ${value?.join(', ')}`))
    }
  }



  const isUrl = (string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }



  return (
    <Modal
      centered
      width={650}
      closeIcon={false}
      onOk={updateAcademy}
      open={open}
      onCancel={() => setOpen(false)}
    >
      <div className='flex flex-col gap-3 max-h-[500px] bg-indigo-500 rounded-md p-3 min-h-fit overflow-scroll'>


        <div className='flex flex-col p-3 rounded-md bg-white'>
          <img src={server + image ? server + image : URL.createObjectURL(image)} />
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

        <Popconfirm
          title="هل تريد حذف هذه الاكاديمية"
          onConfirm={async () => {
            await apiContext?.deleteAcademy(academy?.id)
            await getAcademies()
            setOpen(false)
          }}
          okText="نعم"
          cancelText="لا"
        >
          <Button type='primary' className='w-full bg-red-500 font'>حذف الاكاديمية</Button>
        </Popconfirm>

      </div>
    </Modal>
  )
}

export default UpdateAcademy