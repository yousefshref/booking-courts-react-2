import React, { useEffect } from 'react'
import { ApiContextProvider } from '../contexts/ApiContext'
import { server } from '../utlits/Variables'
import { Button, Input, Select } from 'antd'
import { Backdrop, CircularProgress } from '@mui/material'

const AcademiesContainer = () => {

  const apiContext = React.useContext(ApiContextProvider)

  const [loading, setLoading] = React.useState(true)

  const [types, setTypes] = React.useState([])

  const getAcademyTypes = async () => {
    const res = await apiContext?.getAcademyTypes()
    setTypes(res?.data)
  }

  useEffect(() => {
    getAcademyTypes()
  }, [])


  const [name, setName] = React.useState('')
  const [type, setType] = React.useState('')

  const [academies, setAcademies] = React.useState([])

  const getAcademies = async () => {
    setLoading(true)
    try {
      const res = await apiContext?.getAcademies(name, type)
      setAcademies(res?.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAcademies()
  }, [])

  return (
    <div className='flex flex-col gap-5 w-full max-w-6xl mx-auto mt-5 p-4'>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className='p-3 flex flex-wrap rounded-lg bg-white'>
        <div className='flex flex-col gap-2 w-full'>
          <label className='text-lg font-bold'>البحث</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} className='w-full font rounded-lg p-3' type="text" placeholder='اسم الكلية' />
        </div>
        <div className='flex flex-col gap-2 w-full'>
          <label className='text-lg font-bold'>نوع الاكاديمية</label>
          <Select size='large' value={type} onChange={(e) => setType(e)}>
            <Select.Option value={''}>{'أختر نوع الاكاديمية'}</Select.Option>
            {
              types?.map((type, index) => (
                <Select.Option key={index} value={type?.id}>{type?.name}</Select.Option>
              ))
            }
          </Select>
        </div>
        <Button size='large' className='font mt-3' onClick={getAcademies} type='primary'>بحث</Button>
      </div>
      <div className='flex flex-col gap-3'>
        {
          academies?.map((academy, index) => (
            <div className='flex bg-white p-3 rounded-lg w-full max-w-xs flex-col gap-3' key={index}>
              <img className='w-full rounded-lg' alt={academy?.name} src={server + academy?.image} />
              <hr />
              <h3 className='text-lg font-bold'>{academy?.name}</h3>
              <p className='text-zinc-600'>{academy?.type_details?.name}</p>
              <small className='text-zinc-600'>{academy?.location}</small>
              <Button onClick={() => window.location.href = `/academies/${academy?.id}`} className='font h-[50px] rounded-full' type='primary'>تفاصيل</Button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AcademiesContainer