import React, { useContext, useEffect, useRef, useState } from 'react'
import Header from '../../components/Header'
import { ApiContextProvider } from '../../contexts/ApiContext'
import { Backdrop, CircularProgress } from '@mui/material'
import BookCard from '../../components/BookCard'
import { Alert, Button, DatePicker } from 'antd'
import dayjs from 'dayjs';
import { getCurrentDate } from '../../utlits/Functions'
// Import Swiper styles


import UpdatedBook from '../../components/UpdateBook'


const UserProfile = () => {
  const apiContext = useContext(ApiContextProvider)


  const [profile, setProfile] = useState({})
  const [loading, setLoading] = useState(true)
  const checkProfile = async () => {
    setLoading(true)
    try {
      const res = await apiContext?.checkProfile(localStorage.getItem('token'))
      setProfile(res?.data?.user)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    checkProfile()
  }, [])



  const [dateFrom, setDateFrom] = useState(getCurrentDate())
  const [dateTo, setDateTo] = useState(getCurrentDate())
  const [isCancelled, setIsCancelled] = useState('')
  const [isPaied, setIsPaied] = useState('')



  const [books, setBooks] = useState([])

  const getBooks = async () => {
    setLoading(true)
    try {
      const res = await apiContext?.getBooks(dateFrom, dateTo, '', isCancelled, isPaied, '')
      setBooks(res?.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getBooks()
  }, [])


  const [bookOpen, setBookOpne] = useState(null)

  const [book, setBook] = useState({})
  const [settings, setSettings] = useState({})

  const getBook = async (id) => {
    setLoading(true)
    try {
      const res = await apiContext?.getBook(id)
      setBook(res.data?.book)
      setSettings(res.data?.settings)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (bookOpen) {
      getBook(bookOpen)
    }
  }, [bookOpen])


  return (
    <div className='flex flex-col'>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Header />
      <div className='flex flex-col gap-5 p-4 w-full max-w-6xl mx-auto'>

        <div className='profile p-3 flex gap-3 flex-wrap h-fit justify-between bg-white rounded-md'>
          <div className='flex gap-3 flex-wrap'>
            <span className='w-full max-w-[250px] rounded-full overflow-hidden'>
              <img className='w-full' src={'https://previews.123rf.com/images/blankstock/blankstock2303/blankstock230301517/200668125-user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-neutral-gender.jpg'} alt={profile?.user_details?.username} />
            </span>
            <div className='my-auto'>
              <h3 className='text-3xl text-zinc-600'>{profile?.user_details?.username}</h3>
              <p>{profile?.user_details?.email}</p>
              <p>{profile?.user_details?.phone}</p>
            </div>
          </div>
          <div className='flex flex-col h-full gap-4 p-4 bg-indigo-100 rounded-md'>
            <p>رصيدك الحالي:</p>
            <div className='flex flex-col gap-4 justify-between'>
              <div className='p-2 text-center bg-green-100 rounded-md flex flex-col justify-center'>
                <p>0 EGP</p>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <div className='search gap-3 p-3 rounded-md w-full flex flex-col bg-white'>
            <div className='flex flex-row gap-2'>
              <div className='flex flex-col gap-1 w-1/4'>
                <p>تاريخ بدأ الحجز من:</p>
                <DatePicker placeholder='من تاريخ' value={dateFrom ? dayjs(dateFrom, 'YYYY-MM-DD') : undefined} onChange={(date) => {
                  if (!date) {
                    setDateFrom(undefined)
                  } else {
                    setDateFrom(date.format('YYYY-MM-DD'))
                  }
                }} />
              </div>
              <div className='flex flex-col gap-1 w-1/4'>
                <p>تاريخ بدأ الحجز حتي:</p>
                <DatePicker placeholder='من تاريخ' value={dateTo ? dayjs(dateTo, 'YYYY-MM-DD') : undefined} onChange={(date) => {
                  if (!date) {
                    setDateTo(undefined)
                  } else {
                    setDateTo(date.format('YYYY-MM-DD'))
                  }
                }} />
              </div>
              <div className='flex flex-col gap-1 w-1/4'>
                <p>هل تم الدفع:</p>
                <select
                  value={isPaied} onChange={value => setIsPaied(value)}
                  className='p-2 rounded-md outline-none border transition-all hover:border-blue-500 focus:border-blue-600'
                >
                  <option value={false}>لا</option>
                  <option value={true}>نعم</option>
                </select>
              </div>
              <div className='flex flex-col gap-1 w-1/4'>
                <p>هل تم الالغاء:</p>
                <select
                  value={isCancelled} onChange={value => setIsCancelled(value)}
                  className='p-2 rounded-md outline-none border transition-all hover:border-blue-500 focus:border-blue-600'
                >
                  <option value={false}>لا</option>
                  <option value={true}>نعم</option>
                </select>
              </div>
            </div>
            <Button onClick={() => getBooks()} type='primary' className='h-[40px] rounded-full w-[120px]'>بحث</Button>
          </div>

          <div className='flex flex-col gap-3'>
            <div className='flex flex-wrap gap-5 justify-around'>
              {
                books?.length > 0 ?
                  books?.map((book, index) => (
                    <BookCard setBookOpne={setBookOpne} key={index} book={book} settings={settings} apiContext={apiContext} />
                  ))
                  : <Alert
                    message="لا يوجد حجوزات"
                    type="warning"
                    className='w-full'
                  />
              }
            </div>
          </div>
        </div>


        <UpdatedBook book={book} settings={settings} setBookOpne={setBookOpne} bookOpen={bookOpen} getBooks={getBooks} setLoading={setLoading} />

      </div>
    </div>
  )
}

export default UserProfile
