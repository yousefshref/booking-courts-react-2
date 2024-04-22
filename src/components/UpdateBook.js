import { Alert, Button, DatePicker, message, Modal } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import moment from 'moment'
import 'swiper/css';
import 'swiper/css/autoplay';
import { ApiContextProvider } from '../contexts/ApiContext';
import { convertToAMPM, getCurrentDate } from '../utlits/Functions';
import dayjs from 'dayjs';
import PinnedTimes from './PinnedTimes';
import { Delete } from '@mui/icons-material';
import ExponseCreateOrUpdate from './ExponseCreateOrUpdate';


const UpdateBook = ({ setLoading, getBooks, bookOpen, setBookOpne, settings, book }) => {

  const apiContext = useContext(ApiContextProvider)


  const [user, setUser] = useState({})
  const checkProfile = async () => {
    setLoading(true)
    try {
      const res = await apiContext?.checkProfile(localStorage.getItem('token'))
      setUser(res?.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkProfile()
  }, [localStorage.getItem('token')])


  const swiperRef = useRef(null);

  // update
  const [court, setCourt] = useState({})
  const getCourtDetail = async () => {
    setLoading(true)
    try {
      const res = await apiContext?.getCourtDetail(book?.court)
      setCourt(res.data)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (book?.id) {
      getCourtDetail()
    }
  }, [book])

  const [courtTools, setCourtTools] = useState([])
  const getCourtTools = async () => {
    setLoading(true)
    try {
      const res = await apiContext?.getCourtTools(court?.id)
      setCourtTools(res.data)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (court?.id) {
      getCourtTools()
    }
  }, [court, book])



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
  const [isPaiedData, setIsPaiedData] = useState(false)
  const [isCancelledData, setIsCancelledData] = useState(false)
  const [paiedWith, setPaiedWith] = useState('عند الحضور')

  useEffect(() => {
    if (book) {
      setName(book?.name)
      setPhone(book?.phone)
      setDate(book?.date)
      setStartTime(book?.start_time)
      setEndTime(book?.end_time)
      setPinnedTo(book?.pinned_to)
      setIsCancelledData(book?.is_cancelled)
      setWithBall(book?.with_ball)
      setEventTime(book?.event_time)
      setOfferTime(book?.offer_time)
      setIsPaiedData(book?.is_paied)
      setPaiedWith(book?.paied_with)
    }
  }, [book])

  useEffect(() => {
    setTools(courtTools?.filter(obj => book?.tools?.includes(obj.id)))
  }, [courtTools])



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
    if (court?.event_time_from && court?.event_time_to && court?.event_price) {
      const start = moment(court.event_time_from, 'HH:mm');
      const end = moment(court.event_time_to, 'HH:mm');
      const startTimeMoment = moment(startTime, 'HH:mm');
      const endTimeMoment = moment(endTime, 'HH:mm');
      return start.isBefore(startTimeMoment) && end.isAfter(endTimeMoment)
    }
  }



  const isOfferTime = () => {
    if (court?.offer_time_from && court?.offer_time_to && court?.offer_price) {
      const start = moment(court.offer_time_from, 'HH:mm');
      const end = moment(court.offer_time_to, 'HH:mm');
      const startTimeMoment = moment(startTime, 'HH:mm');
      const endTimeMoment = moment(endTime, 'HH:mm');
      setOfferTime(true)
      return start.isBefore(startTimeMoment) && end.isAfter(endTimeMoment)
    }
  }


  const updateBook = async () => {
    setLoading(true)
    try {
      const data = {}

      if (pinnedTo) {
        data.pinned_to = pinnedTo
      } else {
        data.pinned_to = null
      }
      data.with_ball = withBall
      data.event_time = eventTime
      data.is_paied = isPaiedData
      data.is_cancelled = isCancelledData
      data.paied_with = paiedWith
      data.tools = tools?.map(t => t?.id)

      const res = await apiContext?.updateBook(book?.id, data)
      if (res?.data?.id) {
        success('تم تحديث الحجز بنجاح')
        setBookOpne(false)
        getBooks()
        await apiContext?.updateBook(book?.id, {})
      }
    } catch (err) {
      error('حدث خطأ ما')
    } finally {
      setLoading(false)
    }
  }


  const [pinnedToDisplay, setPinnedToDisplay] = useState(false)




  return (
    <Modal
      centered
      width={700}
      visible={bookOpen}
      onCancel={() => {
        setBookOpne(null)
      }}
      okText='التالي'
      onOk={() => {
        if (swiperRef.current && swiperRef.current.swiper) {
          swiperRef.current.swiper.slideNext();
        }
      }}
      cancelText='الغاء'
      title="تعديل الحجز"
    >
      {contextHolder}
      <Swiper
        modules={Autoplay}
        spaceBetween={50}
        slidesPerView={1}
        autoplay
        loop
        id='s'
        speed={1000}
        ref={swiperRef}
      >
        <SwiperSlide className='1'>
          <div id='1' className='1 flex flex-col gap-4'>

            <div className='flex flex-col gap-1 p-3 rounded-md border'>
              <p className='text-zinc-600'>هل تريد التثبيت ؟</p>
              <DatePicker value={pinnedTo ? dayjs(pinnedTo, 'YYYY-MM-DD') : ""} onChange={(e) => setPinnedTo(!e ? "" : e.format('YYYY-MM-DD'))} placeholder='أختر تاريخ التثبيت' />
              <small className='text-red-500'>سوف يتم حجز نفس الفترة كل 7 ايام من تاريخ الحجز</small>
              {
                book?.pinned_to &&
                <Button onClick={() => setPinnedToDisplay(true)} type='link' className='w-fit'>
                  رؤية الحجوزات المثبتة
                </Button>
              }
              <PinnedTimes getBooks={getBooks} book={book} open={pinnedToDisplay} setOpen={setPinnedToDisplay} />
            </div>

            {
              court?.has_ball && court?.ball_price ? (
                <div className='flex flex-col gap-1 p-3 rounded-md border'>
                  <div className='text-zinc-600 flex gap-1'>
                    <p>هل تريد حجز كرة الكرة معها ؟</p>
                    <small className='text-red-400'>سيتم اضافة {court?.ball_price}  EGP</small>
                  </div>

                  <select
                    value={withBall}
                    onChange={e => {
                      setWithBall(e.target.value)
                      if (e) info(`تم اضافة سعر الكرة ${parseFloat(court?.ball_price)}`)
                    }}
                    className='p-2 rounded-md outline-none border transition-all hover:border-blue-500 focus:border-blue-600'
                  >
                    <option value={false}>لا</option>
                    <option value={true}>نعم</option>
                  </select>
                </div>
              ) : null
            }

            {
              isEventTime() &&
              <div className='flex flex-col gap-1 p-3 rounded-md border'>
                <div className='text-zinc-600 flex gap-1'>
                  <p className='text-zinc-600'>هل تريد حجز مناسبات ؟</p>
                  <small className='text-red-400'>سيتم اضافة {parseFloat(court?.event_price)}  EGP</small>
                </div>
                <select
                  value={eventTime}
                  onChange={e => {
                    setEventTime(e.target.value)
                    if (e) info('تم اضافة سعر المناسبات')
                  }}
                  className='p-2 rounded-md outline-none border transition-all hover:border-blue-500 focus:border-blue-600'
                >
                  <option value={false}>لا</option>
                  <option value={true}>نعم</option>
                </select>
              </div>
            }

            <hr className='my-2 bg-indigo-500 py-[0.5px]' />

          </div>
        </SwiperSlide>

        <SwiperSlide>
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

          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className='flex flex-col gap-4'>

            <div className='flex flex-col gap-2'>
              <p className='text-zinc-600'>طريقة الدفع</p>
              <select
                value={paiedWith}
                onChange={(e) => setPaiedWith(e.target.value)}
                className='p-2 rounded-md outline-none border transition-all hover:border-blue-500 focus:border-blue-600'
              >
                <option className='nodrag' value={'عند الحضور'}>الدفع في الملعب</option>
              </select>
            </div>

            {
              user?.user ? (
                null
              ) : (
                <div className='flex flex-col gap-2'>
                  <p className='text-zinc-600'>هل تم الدفع</p>
                  <select
                    value={isPaiedData}
                    onChange={(e) => setIsPaiedData(e.target.value)}
                    className='p-2 rounded-md outline-none border transition-all hover:border-blue-500 focus:border-blue-600'
                  >
                    <option className='nodrag' value={true}>نعم</option>
                    <option className='nodrag' value={false}>لا</option>
                  </select>
                </div>
              )
            }

            {
              settings?.booking_warning &&
              <Alert
                message="معلومات قبل الحجز"
                description={settings?.booking_warning}
                type="warning"
              />
            }

            <Button type='primary' className='bg-green-500' onClick={updateBook}>حفظ</Button>

          </div>
        </SwiperSlide>

      </Swiper>
    </Modal>
  )
}

export default UpdateBook
