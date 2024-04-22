import React, { useContext, useEffect, useRef, useState } from 'react'
import Header from './Header'
import { ApiContextProvider } from '../contexts/ApiContext'
import { Backdrop, CircularProgress } from '@mui/material'
import { Alert, AutoComplete, Button, DatePicker, message, Modal, Select } from 'antd'
import { getCurrentDate } from '../utlits/Functions'
import dayjs from 'dayjs'
import BookCard from './BookCard'
import UpdatedBook from '../components/UpdateBook'



const { Option } = AutoComplete;
const ManagerBooks = () => {

  const apiContext = useContext(ApiContextProvider)


  const [dateFrom, setDateFrom] = useState(getCurrentDate())
  const [dateTo, setDateTo] = useState(getCurrentDate())
  const [court, setCourt] = useState('')
  const [isCancelled, setIsCancelled] = useState('False')
  const [isPaied, setIsPaied] = useState('True')
  const [paied, setPaied] = useState('')


  const [dataSource, setDataSource] = useState([]);
  const getCourts = async () => {
    const res = await apiContext?.getCourts()
    setDataSource(res.data)
  }
  useEffect(() => {
    getCourts()
  }, [])


  const [options, setOptions] = useState([]);

  const handleSearch = (searchText) => {
    setCourt(searchText);
    // Filter the dataSource based on the search text
    const filteredOptions = dataSource.filter(option =>
      option.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setOptions(filteredOptions);
  };



  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  const getBooks = async () => {
    setLoading(true)
    try {
      const res = await apiContext?.getBooks(dateFrom, dateTo, court, isCancelled, isPaied, paied)
      setBooks(res.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getBooks()
  }, [])



  // get book
  const swiperRef = useRef(null);

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

      <div className='flex flex-col gap-4 p-5'>

        <div className='search flex flex-col gap-2 bg-white p-4 rounded-md'>
          <div className='flex flex-col sm:flex-row gap-5'>
            <div className='flex flex-col gap-2 sm:w-1/3'>
              <div className='flex flex-col gap-1 w-full'>
                <p>تاريخ حجز من</p>
                <DatePicker style={{ width: '100%' }} value={dateFrom ? dayjs(dateFrom, 'YYYY-MM-DD') : ''} onChange={(e) => {
                  if (!e) {
                    setDateFrom('')
                  } else {
                    setDateFrom(e.format('YYYY-MM-DD'))
                  }
                }} placeholder='أختر تاريخ الحجز' />
              </div>
              <div className='flex flex-col gap-1 w-full'>
                <p>تاريخ حجز حتي</p>
                <DatePicker style={{ width: '100%' }} value={dateTo ? dayjs(dateTo, 'YYYY-MM-DD') : ''} onChange={(e) => {
                  if (!e) {
                    setDateTo('')
                  } else {
                    setDateTo(e.format('YYYY-MM-DD'))
                  }
                }} placeholder='أختر تاريخ الحجز' />
              </div>
            </div>
            <div className='flex flex-col gap-2 sm:w-1/3'>
              <div className='w-full'>
                <p>حجوزات ملعب...</p>
                <AutoComplete
                  style={{ width: '100%' }}
                  dataSource={options.map(option => ({ value: option.id.toString(), text: option.name }))}
                  placeholder="اسم الملعب"
                  value={court}
                  onChange={handleSearch}
                >
                  {options.map((option) => (
                    <Option key={option.id} value={option.id.toString()}>
                      {option.name}
                    </Option>
                  ))}
                </AutoComplete>
              </div>
              <div className='w-full'>
                <div className='flex flex-col gap-2 w-full'>
                  <p>هل تم الغاء الحجز؟</p>
                  <Select
                    style={{ width: '100%' }}
                    placeholder="أختر حالة الحجز"
                    value={isCancelled}
                    onChange={(e) => {
                      setIsCancelled(e)
                    }}
                  >
                    <Select.Option value={'True'}>نعم</Select.Option>
                    <Select.Option value={'False'}>لا</Select.Option>
                  </Select>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-2 sm:w-1/3'>
              <div className='w-full'>
                <p>هل تم الدفع</p>
                <Select
                  style={{ width: '100%' }}
                  placeholder="أختر حالة الدفع"
                  value={isPaied}
                  onChange={(e) => {
                    setIsPaied(e)
                  }}
                >
                  <Select.Option value={'True'}>نعم</Select.Option>
                  <Select.Option value={'False'}>لا</Select.Option>
                </Select>
              </div>
              <div className='w-full'>
                <div className='flex flex-col gap-2 w-full'>
                  <p>مدفوع ب...</p>
                  <Select
                    style={{ width: '100%' }}
                    placeholder="أختر الدفع بواسطة"
                    value={paied}
                    onChange={(e) => {
                      setPaied(e)
                    }}
                  >
                    <Select.Option value={""}>أختر</Select.Option>
                    <Select.Option value={"عند الحضور"}>عند الحضور</Select.Option>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <Button onClick={() => getBooks()} type='primary' className='h-[40px] rounded-full w-[120px]'>بحث</Button>
        </div>


        <div className='flex flex-col gap-2 bg-white p-3 rounded-lg'>

          <div className='flex justify-between gap-5 w-fit'>
            <p className='font-bold'>إجمالي المدفوع: </p>
            <p className='font-bold'>{parseFloat(books?.filter(x => x?.is_paied == true)?.reduce((acc, cur) => acc + cur?.total_price, 0))} EGP</p>
          </div>

          <div className='flex justify-between gap-5 w-fit'>
            <p className='font-bold'>إجمالي المنتظر: </p>
            <p className='font-bold'>{parseFloat(books?.filter(x => x?.is_paied == false)?.reduce((acc, cur) => acc + cur?.total_price, 0))} EGP</p>
          </div>

        </div>


        <div className='flex flex-wrap gap-4 justify-around'>
          {
            books?.length > 0 ?
              books?.map((book, index) => (
                <BookCard setBookOpne={setBookOpne} key={index} book={book} apiContext={apiContext} />
              ))
              : <Alert
                message="لا يوجد حجوزات"
                type="warning"
                className='w-full'
              />
          }
        </div>

        {/* update book */}
        <UpdatedBook book={book} settings={settings} setBookOpne={setBookOpne} bookOpen={bookOpen} getBooks={getBooks} setLoading={setLoading} />


      </div>
    </div>
  )
}

export default ManagerBooks
