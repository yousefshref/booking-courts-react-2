import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import { server } from '../utlits/Variables'
import { convertToAMPM } from '../utlits/Functions'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import DisplayInvoicesModal from './DisplayInvoicesModal'

const BookCard = ({ book, apiContext, setBookOpne }) => {

  const navigate = useNavigate()

  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  const getCourtImages = async () => {
    setLoading(true)
    try {
      const res = await apiContext?.getCourtImages(book?.court)
      setImages(res.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    book?.court && getCourtImages()
  }, [book?.court])


  const [canCancel, setCanCancel] = useState(false)
  const getBook = async (id) => {
    try {
      const res = await apiContext?.getBook(id, true)
      setCanCancel(res.data.can_cancel)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getBook(book?.id)
  }, [])


  const [user, setuser] = useState(false)
  const checkProfile = async (id) => {
    try {
      const res = await apiContext?.checkProfile(localStorage.getItem('token'))
      setuser(res.data)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    checkProfile(book?.id)
  }, [])



  const [openInvoices, setOpenInvoices] = useState(false)

  return (
    <div className='book w-full sm:max-w-[250px] bg-white p-3 rounded-md'>
      <span className='w-full max-w-[250px] overflow-hidden rounded-md'>
        {
          loading ? <Loading /> : <img src={server + images[0]?.image} alt={book?.name} />
        }
      </span>
      <div className='flex flex-col gap-1'>
        <p>{book?.name}</p>
        <p>{book?.phone}</p>
        {
          book?.is_cancelled &&
          <small className='text-red-700'>تم الالغاء</small>
        }
        {
          book?.is_paied &&
          <small className='text-green-700'>تم الدفع</small>
        }
        {
          !book?.is_paied &&
          <small className='text-blue-700'>في انتظار الدفع</small>
        }
        <small className='text-green-700'>{book?.total_price} EGP</small>
        <hr className='my-2' />
        <small>من: {convertToAMPM(book?.start_time?.slice(0, 5))} - الي: {convertToAMPM(book?.end_time?.slice(0, 5))}</small>
        <small>يبدأ في: {book?.date}</small>
        <hr className='my-2' />
        <small onClick={() => navigate(`/court/${book?.court_details?.name?.replace(' ', '-')}/${book?.court}`)} className='text-blue-700 cursor-pointer'>ملعب {book?.court_details?.name}</small>
        {
          user?.manager || user?.staff ? (
            <>
              <hr className='my-2' />
              <Button onClick={() => setOpenInvoices(true)} className='h-fit rounded-full bg-green-500' type='primary'>فواتير الحجز</Button>
            </>
          )
            : null
        }

        <DisplayInvoicesModal open={openInvoices} setOpen={setOpenInvoices} book={book} />

        <hr className='my-2' />
        <Button onClick={() => setBookOpne(book?.id)} className='h-[40px] rounded-full bg-indigo-500' type='primary'>تفاصيل الحجز</Button>
        {
          canCancel && !book?.is_cancelled ?
            <Button onClick={async () => {
              const res = await apiContext?.updateBook(book?.id, { is_cancelled: true })
              window.location.reload()
            }} className='h-[40px] rounded-full border-red-500 text-red-600'>الغاء الحجز</Button>
            : null
        }
        {
          canCancel && book?.is_cancelled ?
            <Button onClick={async () => {
              const res = await apiContext?.updateBook(book?.id, { is_cancelled: false })
              window.location.reload()
            }} className='h-[40px] rounded-full border-green-500 text-green-600'>ارجاع الحجز</Button>
            : null
        }
      </div>
    </div>
  )
}

export default BookCard
