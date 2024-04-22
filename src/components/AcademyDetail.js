import { Button } from 'antd'
import React, { useContext, useEffect } from 'react'
import { BsClock } from 'react-icons/bs'
import { ApiContextProvider } from '../contexts/ApiContext'
import { convertToAMPM } from '../utlits/Functions'
import { server } from '../utlits/Variables'
import Header from './Header'

const AcademyDetail = () => {
  const apiContext = useContext(ApiContextProvider)

  const id = window.location.pathname.split('/')[2]

  const [loading, setLoading] = React.useState(true)

  const [academy, setAcademy] = React.useState({})

  const getAcademy = async () => {
    setLoading(true)
    try {
      const res = await apiContext?.getAcademy(id)
      setAcademy(res?.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAcademy()
  }, [])


  const [academyTimes, setAcademyTimes] = React.useState([])

  const getAcademyTimes = async () => {
    setLoading(true)
    try {
      const res = await apiContext?.getAcademyTimes(id)
      setAcademyTimes(res?.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAcademyTimes()
  }, [])



  const [academyPlans, setAcademyPlans] = React.useState([])

  const getSubscribePlans = async () => {
    setLoading(true)
    try {
      const res = await apiContext?.getSubscribePlans(id)
      setAcademyPlans(res?.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getSubscribePlans()
  }, [])


  const [trainers, setTrainers] = React.useState([])

  const getAcademyTrainers = async () => {
    setLoading(true)
    try {
      const res = await apiContext?.getAcademyTrainers(id)
      setTrainers(res?.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAcademyTrainers()
  }, [])


  return (
    <div className='flex flex-col'>
      <Header />
      <div className='flex flex-col gap-4 w-full max-w-6xl mx-auto mt-8 p-5'>
        <div className='flex flex-wrap gap-4 justify-around bg-white p-5 rounded-lg'>

          {
            academy?.image &&
            <img src={server + academy?.image} className='w-full h-fit my-auto max-w-[300px] rounded-lg' alt={academy?.name} />
          }

          <div className='flex flex-col gap-2 p-5 rounded-lg my-auto bg-indigo-100 h-fit md:w-fit md:max-w-xs w-full'>
            <h3 className='text-2xl font-bold'>{academy?.name}</h3>
            <p className='text-zinc-600'>{academy?.type_details?.name}</p>
            <p className='text-zinc-600'>{academy?.location}</p>
            {
              academy?.location_url &&
              <small onClick={() => window.open(academy?.location_url)} className='text-blue-600 cursor-pointer underline underline-offset-4 w-full max-w-xs'>رابط خرائط جوجل</small>
            }
            {
              academy?.website &&
              <small onClick={() => window.open(academy?.website, '_blank')} className='text-blue-600 flex cursor-pointer underline underline-offset-4 w-full max-w-xs'>رابط موقع الكتروني</small>
            }
          </div>

        </div>

        <div className='flex gap-3 flex-col text-center bg-white p-3 rounded-lg'>
          <h3 className='text-3xl'>اوقات التدريب</h3>
          <hr />
          <div className='flex flex-wrap gap-3 justify-around'>

            {
              academyTimes?.map((time, index) => (
                <div className='flex flex-col gap-1 from-indigo-300 to-blue-200 bg-gradient-to-br p-3 rounded-lg w-full sm:max-w-[150px]' key={index}>
                  <b>{time?.day_name}</b>
                  <div className='flex gap-1 mx-auto'>
                    <span className='my-auto text-green-700'>
                      <BsClock />
                    </span>
                    <p className='my-auto'>
                      {convertToAMPM(time?.start_time?.slice(0, 5))}
                    </p>
                  </div>
                  <div className='flex gap-1 mx-auto'>
                    <span className='my-auto text-red-700'>
                      <BsClock />
                    </span>
                    <p>{convertToAMPM(time?.end_time?.slice(0, 5))}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        <div className='flex flex-col gap-3 text-center bg-white p-3 rounded-lg'>
          <h3 className='text-3xl'>اوقات التدريب</h3>
          <hr />
          <div className='flex flex-wrap gap-3 justify-around max-h-[400px] min-h-fit overflow-scroll'>
            {
              academyPlans?.map((plan, index) => (
                <div className='p-3 rounded-lg from-sky-200 to-blue-200 gap-4 flex flex-col bg-gradient-to-tr w-full max-w-xs' key={index}>
                  <h3 className='text-2xl text-zinc-700'>{plan?.name}</h3>
                  <p>{plan?.description}</p>
                  <div className='flex flex-col gap-1 p-3 rounded-lg bg-indigo-200'>
                    <p>{plan?.price_per_class} EGP / في الحصة</p>
                    <p>{plan?.price_per_week} EGP / في الاسبوع</p>
                    <p>{plan?.price_per_month} EGP / في الشهر</p>
                    <p>{plan?.price_per_year} EGP / في السنة</p>
                  </div>
                  <Button size='large' href={`https://wa.me/20${plan?.academy_details?.manager_details?.user_details?.phone}`} className='font rounded-full' type='primary'>تفاصيل</Button>
                </div>
              ))
            }
          </div>
        </div>


        <div className='flex flex-col gap-3 text-center bg-white p-3 rounded-lg'>
          <h3 className='text-3xl'>المدربين</h3>
          <hr />
          <div className='flex flex-wrap gap-3 justify-around max-h-[400px] min-h-fit overflow-scroll'>
            {
              trainers?.map((trainer, index) => (
                <div className='p-3 rounded-lg from-sky-200 to-blue-200 gap-4 flex flex-col bg-gradient-to-tr w-full max-w-xs' key={index}>
                  <h3 className='text-2xl text-zinc-700'>{trainer?.trainer}</h3>
                  <div className='flex flex-col gap-1 p-3 rounded-lg bg-indigo-200'>
                    <p>{trainer?.price_per_class} EGP / في الحصة</p>
                    <p>{trainer?.price_per_week} EGP / في الاسبوع</p>
                    <p>{trainer?.price_per_month} EGP / في الشهر</p>
                    <p>{trainer?.price_per_year} EGP / في السنة</p>
                  </div>
                  <Button size='large' href={`https://wa.me/20${trainer?.manager_details?.user_details?.phone}`} className='font rounded-full' type='primary'>تفاصيل</Button>
                </div>
              ))
            }
          </div>
        </div>

      </div>
    </div>
  )
}

export default AcademyDetail