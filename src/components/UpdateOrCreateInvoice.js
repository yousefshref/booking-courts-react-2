import { Button, DatePicker, Input, InputNumber, message, Modal } from 'antd'
import dayjs from 'dayjs'
import React, { useContext, useState } from 'react'
import { ApiContextProvider } from '../contexts/ApiContext'

const UpdateOrCreateInvoice = ({ open, setOpen, invoice, create, getInvoices, court, book, academy }) => {

  const apiContext = useContext(ApiContextProvider)



  const [messageApi, contextHolder] = message.useMessage();

  const error = (message) => {
    messageApi.error(message);
  }


  const [courtId, setCourtId] = useState(court?.id || null)
  const [bookId, setBookId] = useState(book?.id || null)
  const [academyId, setAcademyId] = useState(academy?.id || null)

  const [startDate, setStartDate] = useState(invoice?.start_date || null)
  const [endDate, setEndDate] = useState(invoice?.end_date || null)

  const [amount, setAmount] = useState(invoice?.amount || null)

  const [name, setName] = useState(invoice?.name || null)
  const [phone, setPhone] = useState(invoice?.phone || null)

  const [description, setDescription] = useState(invoice?.description || '')



  const updateInvoice = async () => {
    const res = await apiContext?.updateInvoice(invoice?.id, {
      start_date: startDate,
      end_date: endDate,
      amount: amount,
      name: name,
      phone: phone,
      description: description
    })
    if (res?.data?.id) {
      getInvoices()
      setOpen(false)
    } else {
      Object?.entries(res?.data || {}).forEach(([key, value]) => error(`${key}: ${value?.join(', ')}`))
    }
  }


  const createInvoice = async () => {
    const res = await apiContext?.createInvoice({
      court: courtId,
      book: bookId,
      academy: academyId,
      start_date: startDate,
      end_date: endDate,
      amount: amount,
      name: name,
      phone: phone,
      description: description
    })
    if (res?.data?.id) {
      getInvoices()
      setOpen(false)
    } else {
      Object?.entries(res?.data || {}).forEach(([key, value]) => error(`${key}: ${value?.join(', ')}`))
    }
  }





  const deleteInvoice = async () => {
    const res = await apiContext?.deleteInvoice(invoice?.id)
    getInvoices()
    setOpen(false)
  }




  return (
    <Modal
      open={open}
      okText='تم'
      cancelText='الغاء'
      onOk={() => {
        if (create) {
          createInvoice()
        } else {
          updateInvoice()
        }
      }}
      onCancel={() => setOpen(false)}
      width={450}
      centered
      closeIcon={false}
    >

      {contextHolder}

      <div className='flex flex-col gap-3 p-4'>

        {
          !create &&
          <Button className='w-full font' type='primary' danger onClick={deleteInvoice}>
            حذف الفاتورة
          </Button>
        }


        <div className='flex gap-3 flex-col'>
          <p className=''>تاريخ بدء (بدأ اصلاح مثلا) :</p>
          <DatePicker
            className='w-full'
            value={startDate ? dayjs(startDate, 'YYYY-MM-DD') : null}
            onChange={(date, dateString) => {
              if (dateString) {
                setStartDate(dateString)
              } else {
                setStartDate(null)
              }
            }}
          />
        </div>

        <div className='flex gap-3 flex-col'>
          <p className=''>الى (الانتهاء من الاصلاح):</p>
          <DatePicker
            className='w-full'
            value={endDate ? dayjs(endDate, 'YYYY-MM-DD') : null}
            onChange={(date, dateString) => {
              if (dateString) {
                setEndDate(dateString)
              } else {
                setEndDate(null)
              }
            }}
          />
        </div>

        <div className='flex gap-3 flex-col'>
          <div className='flex gap-2'>
            <p className=''>المبلغ :</p>
          </div>
          <small className='text-red-500'>لو المبلغ خصم اكتب المبلغ بالسالب هكذا (-400) لو المبلغ تحصيل اكتب المبلغ بالكامل (400)</small>
          <InputNumber
            className='w-full'
            value={amount}
            onChange={setAmount}
          />
        </div>

        <div className='flex gap-3 flex-col'>
          <div className='flex gap-2'>
            <p className=''>الاسم :</p>
          </div>
          <Input
            className='w-full font'
            value={name}
            placeholder='اسم مشترك مثلا (أختياري)'
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='flex gap-3 flex-col'>
          <div className='flex gap-2'>
            <p className=''>رقم الهاتق :</p>
          </div>
          <Input
            className='w-full font'
            placeholder='رقم هاتف مشترك مثلا (أختياري)'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className='flex gap-3 flex-col'>
          <p className=''>معلومات اضافية :</p>
          <Input.TextArea
            className='w-full'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>


    </Modal>
  )
}

export default UpdateOrCreateInvoice