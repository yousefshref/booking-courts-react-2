import React, { useContext, useEffect, useState } from 'react'
import { ApiContextProvider } from '../contexts/ApiContext'
import Loading from './Loading'
import { server } from '../utlits/Variables'
import { FaClock } from 'react-icons/fa'
import { convertToAMPM } from '../utlits/Functions'
import { BiFootball, BiSolidOffer } from 'react-icons/bi'
import { Event } from '@mui/icons-material'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const Court = ({ court }) => {

  const navigate = useNavigate()

  const apiContext = useContext(ApiContextProvider)

  const [images, setImages] = useState([])
  const [load, setLoad] = useState(true)
  const getCourtImages = async () => {
    setLoad(true)
    try {
      const res = await apiContext?.getCourtImages(court?.id)
      setImages(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoad(false)
    }
  }
  useEffect(() => {
    court?.id && getCourtImages()
  }, [court?.id])


  return (
    <div className='p-4 flex flex-col h-fit gap-3 w-full max-w-xs bg-white rounded-md shadow-md'>
      {
        load ? <Loading /> : (
          <span>
            <img src={server + images[0]?.image} alt={court?.name} className='w-full rounded-md' />
          </span>
        )
      }
      <div className='flex flex-col'>
        <span className='text-lg font-bold'>{court?.name}</span>
        <span className='text-sm text-zinc-600'>{court?.state_details?.name}</span>
        <div className='flex gap-3'>
          <span className={`${court?.offer_price && court?.offer_time_from && court?.offer_time_to ? "line-through" : ""} text-sm text-zinc-600`}>{court?.price_per_hour?.split('.')[0]} EGP</span>
          {
            court?.offer_price && court?.offer_time_from && court?.offer_time_to ?
              <span className={`font-bold text-sm text-green-600`}>{court?.offer_price?.split('.')[0]} EGP</span>
              : null
          }
        </div>
      </div>
      <hr />
      <div className='flex flex-wrap justify-between gap-4'>
        <div className='flex gap-1'>
          <span className='text-green-700 my-auto'>
            <FaClock />
          </span>
          <p>{convertToAMPM(court?.open_from?.slice(0, 5))}</p>
        </div>
        <div className='flex gap-1'>
          <span className='text-red-700 my-auto'>
            <FaClock />
          </span>
          <p>{convertToAMPM(court?.open_to?.slice(0, 5))}</p>
        </div>
      </div>
      <hr />
      <div className='flex-wrap flex gap-3 justify-around'>
        {
          court?.offer_price && court?.offer_time_from && court?.offer_time_to ? (
            <div className='flex text-center flex-col'>
              <span className='text-indigo-700 my-auto mx-auto text-2xl'>
                <BiSolidOffer />
              </span>
              <small>عرض محدود</small>
            </div>
          )
            : null
        }
        <div className='flex text-center flex-col'>
          <span className='text-orange-700 my-auto mx-auto text-2xl'>
            <Event />
          </span>
          <small>حجز للمناسبات</small>
        </div>
        <div className='flex text-center flex-col'>
          <span className='text-yellow-700 my-auto mx-auto text-2xl'>
            <BiFootball />
          </span>
          <small>توجد كرة</small>
        </div>
      </div>
      <hr />
      <div className='actions flex flex-col gap-2'>
        <Button onClick={() => navigate(`/court/${court?.name?.split(' ').join('-')}/${court?.id}`)} type='primary' className='w-full bg-indigo-600 font text-white rounded-full h-[45px]'>
          تفاصيل الملعب
        </Button>
      </div>
    </div>
  )
}

export default Court
