import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { ApiContextProvider } from '../contexts/ApiContext'
import { Swiper, SwiperSlide } from 'swiper/react';
import Loading from '../components/Loading';
import { server } from '../utlits/Variables';

import dayjs from 'dayjs';

import { Autoplay } from 'swiper/modules';
import { Alert, DatePicker, Input, message, Modal, Select } from 'antd';

import 'swiper/css';
import 'swiper/css/autoplay'; // Import Swiper styles
import { convertToAMPM, getCurrentDate } from '../utlits/Functions';
import Slot from '../components/Slot';
import moment from 'moment';
import CourtDetail from './Client/CourtDetail';
import { useNavigate } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';

const CourtBook = () => {
  const apiContext = useContext(ApiContextProvider)

  const id = window.location.pathname.split('/')[3]

  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  const getCourtImages = async () => {
    setLoading(true)
    try {
      const res = await apiContext?.getCourtImages(id)
      setImages(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCourtImages()
  }, [id])



  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState(getCurrentDate())
  const [tools, setTools] = useState([])
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [pinnedTo, setPinnedTo] = useState(null)
  const [withBall, setWithBall] = useState(false)
  const [eventTime, setEventTime] = useState(false)
  const [offerTime, setOfferTime] = useState(false)
  const [isPaied, setIsPaied] = useState(false)
  const [paiedWith, setPaiedWith] = useState('عند الحضور')



  const [courtData, setCourtData] = useState({})
  const [settingsData, setSettingsData] = useState({})

  const [slots, setSlots] = useState([])
  const [closedSlots, setClosedSlots] = useState([])
  const [bookedSlots, setBookedSlots] = useState([])
  const [pinnedSlots, setPinnedSlots] = useState([])

  const getCourtBooksDetails = async (court_id, date) => {
    const res = await apiContext?.getCourtBooksDetails(court_id, date)
    setSlots(res?.data?.all_slots)
    setClosedSlots(res?.data?.closed_slots)
    setBookedSlots(res?.data?.booked_slots)
    setPinnedSlots(res?.data?.pinned)
    setCourtData(res?.data?.court)
    setSettingsData(res?.data?.settings)
  }

  useEffect(() => {
    id && getCourtBooksDetails(id, date)
  }, [date, id])


  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [visible3, setVisible3] = useState(false)


  const [messageApi, contextHolder] = message.useMessage();

  const info = (message) => {
    messageApi.info(message);
  };
  const warning = (message) => {
    messageApi.warning(message);
  };
  const success = (message) => {
    messageApi.success(message);
  };
  const error = (message) => {
    messageApi.error(message);
  };



  const isEventTime = () => {
    if (courtData?.event_time_from && courtData?.event_time_to && courtData?.event_price) {
      const start = moment(courtData.event_time_from, 'HH:mm');
      const end = moment(courtData.event_time_to, 'HH:mm');
      const startTimeMoment = moment(startTime, 'HH:mm');
      const endTimeMoment = moment(endTime, 'HH:mm');
      return start.isBefore(startTimeMoment) && end.isAfter(endTimeMoment)
    }
  }



  const isOfferTime = () => {
    if (courtData?.offer_time_from && courtData?.offer_time_to && courtData?.offer_price) {
      const start = moment(courtData.offer_time_from, 'HH:mm');
      const end = moment(courtData.offer_time_to, 'HH:mm');
      const startTimeMoment = moment(startTime, 'HH:mm');
      const endTimeMoment = moment(endTime, 'HH:mm');
      setOfferTime(true)
      return start.isBefore(startTimeMoment) && end.isAfter(endTimeMoment)
    }
  }


  const [totalPrice, setTotalPrice] = useState(0)


  useEffect(() => {
    if (isOfferTime()) {
      setTotalPrice(courtData?.offer_price ?? 0)
    } else {
      if (isEventTime() && eventTime) {
        setTotalPrice(courtData?.event_price ?? 0)
      } else {
        setTotalPrice(courtData?.price_per_hour ?? 0)
      }
    }

    if (withBall && courtData?.has_ball && courtData?.ball_price) {
      setTotalPrice(parseFloat(totalPrice) + parseFloat(courtData?.ball_price))
    }

    tools?.map(t => {
      setTotalPrice(parseFloat(totalPrice) + parseFloat(t?.price))
    })

  }, [courtData, withBall, eventTime, startTime, endTime, tools]);



  const [courtTools, setCourtTools] = useState([])
  const getCourtTools = async () => {
    const res = await apiContext?.getCourtTools(id)
    setCourtTools(res?.data)
  }
  useEffect(() => {
    getCourtTools()
  }, [id])


  const [user, setUser] = useState(null)
  const getUser = async () => {
    const res = await apiContext?.getUser()
    setUser(res?.data)
  }
  useEffect(() => {
    getUser()
  }, [])

  const navigate = useNavigate()

  const [loadingSubmit, setLoadingSubmit] = useState(false)

  const bookCourt = async () => {
    setLoadingSubmit(true)

    try {
      const data = {
        'court': courtData?.id,
        'user': user?.id,
        'name': name,
        'phone': phone,
        'date': date,
        'start_time': startTime,
        'end_time': endTime,
        'pinned_to': pinnedTo,
        'with_ball': withBall,
        'event_time': eventTime,
        'offer_time': offerTime,
        'is_paied': isPaied,
        'paied_with': paiedWith,
        'is_cancelled': false,
        'total_price': totalPrice,
        'tools': tools?.map((e) => e?.id),
      }


      const res = await apiContext?.bookCourt(data)

      if (res?.data && !res?.data?.id) {
        const keys = Object.keys(res?.data)
        const values = Object.values(res?.data)

        keys.forEach((key, index) => {
          error(`${key}: ${values[index]}`)
        })
      } else {
        setVisible3(false)

        setName('')
        setPhone('')
        setDate(getCurrentDate())
        setTools([])
        setStartTime(null)
        setEndTime(null)
        setPinnedTo(null)
        setWithBall(false)
        setEventTime(false)
        setOfferTime(false)
        setIsPaied(false)
        setPaiedWith('عند الحضور')

        const updateBook = await apiContext?.updateBook(res?.data?.id, {

        })

        if (window.confirm("هل تريد حجز وقت اخر ؟") == true) {
          window.location.reload()
        } else {
          navigate(`/profile/${user?.username}/`)
        }

      }
    }

    finally {
      setLoadingSubmit(false)
    }


  }




  const [profile, setProfile] = useState(null)
  const getProfile = async () => {
    const res = await apiContext?.checkProfile(localStorage.getItem('token'))
    setProfile(res?.data)
  }
  useEffect(() => {
    getProfile()
  }, [])


  return (
    <div>
      {contextHolder}

      <Header />


      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingSubmit}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className='p-6 w-full max-w-3xl mx-auto'>
        <Swiper
          modules={Autoplay}
          spaceBetween={50}
          slidesPerView={1}
          style={{ padding: "17px", height: "300px", minHeight: "fit-content", width: "600px", maxWidth: "100%" }}
          autoplay
          loop
          speed={3000}
        >
          {
            loading ? <Loading /> : images.map((image, index) => (
              <SwiperSlide
                className='rounded-md overflow-hidden'
                key={index}
              >
                <img className='w-full' src={server + image?.image} alt={image?.image} />
              </SwiperSlide>
            ))
          }
        </Swiper>


        <div className='bg-white p-5 rounded-md shadow-md flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <p className='text-zinc-700'>الأسم</p>
            <Input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='اسم اللاعب' />
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-zinc-700'>الهاتف</p>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} type='number' placeholder='رقم الهاتف' />
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-zinc-700'>متي تريد الحجز؟</p>
            <DatePicker value={dayjs(date, 'YYYY-MM-DD')} onChange={(e) => {
              const date1 = new Date(e.format('YYYY-MM-DD'));
              const date2 = new Date(getCurrentDate());
              if (date1 < date2) {
                error('لا يمكنك حجز هذا التاريخ')
                setDate(getCurrentDate())
              } else {
                setDate(e.format('YYYY-MM-DD'))
              }
            }} placeholder='أختر تاريخ الحجز' />
          </div>
          <hr />
          <div className='times flex p-2 bg-zinc-300 gap-3 rounded-md flex-wrap justify-between'>
            {
              slots?.map(slot => (
                <Slot
                  setVisible={setVisible}
                  visible={visible}
                  key={slot}
                  slot={slot}
                  date={date}
                  pinnedSlots={pinnedSlots}
                  bookedSlots={bookedSlots}
                  closedSlots={closedSlots}
                  warning={warning}
                  success={success}
                  error={error}
                  endTime={endTime}
                  startTime={startTime}
                  setEndTime={setEndTime}
                  setStartTime={setStartTime}
                />
              ))
            }
          </div>
        </div>


        <Modal
          width={800}
          centered
          okText='التالي'
          cancelText='الغاء'
          visible={visible}
          onOk={() => {
            setVisible(false)
            setVisible2(true)
          }}
          title={`حجز ${courtData?.name} بين ${convertToAMPM(startTime ?? "")} و ${convertToAMPM(endTime ?? "")} في ${date}`}
          onCancel={() => setVisible(false)}
        >
          <div className='flex flex-col gap-4'>

            <div className='flex flex-col gap-1 p-3 rounded-md border'>
              <p className='text-zinc-600'>هل تريد التثبيت ؟</p>
              <DatePicker value={pinnedTo ? dayjs(pinnedTo, 'YYYY-MM-DD') : ""} onChange={(e) => setPinnedTo(!e ? "" : e.format('YYYY-MM-DD'))} placeholder='أختر تاريخ التثبيت' />
              <small className='text-red-500'>سوف يتم حجز نفس الفترة كل 7 ايام من تاريخ الحجز</small>
            </div>

            {
              courtData?.has_ball && courtData?.ball_price ? (
                <div className='flex flex-col gap-1 p-3 rounded-md border'>
                  <p className='text-zinc-600'>هل تريد حجز كرة الكرة معها ؟</p>
                  <Select
                    value={withBall}
                    onChange={e => {
                      setWithBall(e)
                      if (e) info(`تم اضافة سعر الكرة ${parseFloat(courtData?.ball_price)}`)
                    }}

                    options={[
                      { label: 'لا', value: false },
                      { label: 'نعم', value: true },
                    ]}
                  />
                </div>
              ) : null
            }

            {
              isEventTime() &&
              <div className='flex flex-col gap-1 p-3 rounded-md border'>
                <p className='text-zinc-600'>هل تريد حجز مناسبات ؟</p>
                <Select
                  value={eventTime}
                  onChange={e => {
                    setEventTime(e)
                    if (e) info('تم اضافة سعر المناسبات')
                  }}
                  options={[
                    { label: 'لا', value: false },
                    { label: 'نعم', value: true },
                  ]}
                />
              </div>
            }

            <hr className='my-2 bg-indigo-500 py-[0.5px]' />

            <div className='p-4 rounded-md bg-indigo-200'>
              <p>اجمالي المبلغ: {totalPrice}</p>
            </div>

          </div>
        </Modal>

        <Modal
          width={800}
          centered
          okText='التالي'
          cancelText='الغاء'
          visible={visible2}
          onOk={() => {
            setVisible2(false)
            setVisible3(true)
          }}
          title={`حجز ${courtData?.name} بين ${convertToAMPM(startTime ?? "")} و ${convertToAMPM(endTime ?? "")} في ${date}`}
          onCancel={() => setVisible2(false)}
        >
          <div className='flex flex-col gap-4'>

            <div className='tools rounded-md flex flex-wrap justify-between gap-3 bg-zinc-300 min-h-fit max-h-[300px] p-3'>
              {
                courtTools?.map(tool => (
                  <div
                    onClick={() => {
                      const exist = tools?.find(f => f.id === tool?.id)
                      if (exist) {
                        setTools(tools?.filter(f => f.id !== tool?.id))
                      } else {
                        setTools(prev => [...prev, tool])
                        info(`تم اضافة ${tool?.name} بسعر ${parseFloat(tool?.price)} EGP`)
                      }
                    }}
                    key={tool?.id} className={`
                    p-3 text-center rounded-md
                    cursor-pointer transition-all duration-300
                    ${tools?.find(f => f.id === tool?.id) ? "bg-indigo-300" : "bg-white"}
                  `}>
                    <strong className='text-zinc-600'>{tool?.name}</strong>
                    <p className='text-green-700'>{parseFloat(tool?.price)} EGP</p>
                  </div>
                ))
              }
            </div>

            <div className='p-4 rounded-md bg-indigo-200'>
              <p>اجمالي المبلغ: {parseFloat(totalPrice)} EGP</p>
            </div>

          </div>
        </Modal>


        <Modal
          width={800}
          centered
          okText='حجز'
          cancelText='الغاء'
          visible={visible3}
          onOk={() => bookCourt()}
          title={`حجز ${courtData?.name} بين ${convertToAMPM(startTime ?? "")} و ${convertToAMPM(endTime ?? "")} في ${date}`}
          onCancel={() => setVisible3(false)}
        >
          <div className='flex flex-col gap-4'>

            <div className='flex flex-col gap-2'>
              <p className='text-zinc-600'>طريقة الدفع</p>
              <Select
                value={paiedWith}
                onChange={(e) => setPaiedWith(e)}
                options={[
                  { label: 'الدفع في الملعب', value: 'عند الحضور' },
                ]}
              />
            </div>

            {
              profile?.manager || profile?.staff ? (
                <div className='flex flex-col gap-2'>
                  <p className='text-zinc-600'>هل تم الدفع</p>
                  <Select
                    value={isPaied}
                    onChange={(e) => setIsPaied(e)}
                    options={[
                      { label: 'نعم', value: true },
                      { label: 'لا', value: false },
                    ]}
                  />
                </div>
              ) : null
            }

            {
              settingsData?.booking_warning &&
              <Alert
                message="معلومات قبل الحجز"
                description={settingsData?.booking_warning}
                type="warning"
              />
            }

            <div className='p-4 rounded-md bg-indigo-200'>
              <p>اجمالي المبلغ: {parseFloat(totalPrice)} EGP</p>
            </div>

          </div>
        </Modal>


      </div>

    </div >
  )
}

export default CourtBook
