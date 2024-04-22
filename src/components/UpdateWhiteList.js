import React, { useContext, useState } from 'react'
import { ApiContextProvider } from '../contexts/ApiContext'
import { Button, Input, Modal } from 'antd'

const UpdateWhiteList = ({ open, setOpen, getWhiteLists, whitelistData }) => {
  const apiContext = useContext(ApiContextProvider)

  const [whitelist, setWhitelist] = useState({ phone: whitelistData?.phone, image: null, image2: null })


  const updateWhtieList = async () => {
    const data = new FormData()

    data.append('phone', whitelist?.phone)
    if (whitelist?.image) {
      data.append('image', whitelist?.image)
    }
    if (whitelist?.image2) {
      data.append('image2', whitelist?.image2)
    }

    const res = await apiContext?.updateWhtieList(whitelistData?.id, data)

    if (res.data.id) {
      setOpen(false)
      window.location.reload()
    } else {
      Object?.entries(res?.data)?.forEach(([key, value]) => {
        alert(value)
      })
    }

  }

  return (
    <Modal
      visible={open}
      onOk={() => updateWhtieList()}
      onCancel={() => setOpen(false)}
      centered
      width={650}
      closeIcon={false}
    >
      <div className='flex flex-col gap-4 bg-white p-4'>
        <div className='flex flex-col gap-2'>
          <p>رقم هاتف اللاعب</p>
          <Input className='p-4' value={whitelist?.phone} onChange={(e) => setWhitelist({ ...whitelist, phone: e.target.value })} />
        </div>
        <div className='flex flex-col gap-2'>
          <p>صورة 1</p>
          <Input type='file' className='p-4' onChange={(e) => setWhitelist({ ...whitelist, image: e?.target?.files[0] })} />
        </div>
        <div className='flex flex-col gap-2'>
          <p>صورة 2</p>
          <Input type='file' className='p-4' onChange={(e) => setWhitelist({ ...whitelist, image2: e?.target?.files[0] })} />
        </div>
      </div>
    </Modal>
  )
}

export default UpdateWhiteList