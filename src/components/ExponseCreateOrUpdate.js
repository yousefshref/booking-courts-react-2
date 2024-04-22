import { Input, Modal } from 'antd'
import React, { useContext, useState } from 'react'
import { ApiContextProvider } from '../contexts/ApiContext'

const ExponseCreateOrUpdate = ({ open, setOpen, getExpenses, success, error, addBookToCreateExpense }) => {

  const apiContext = useContext(ApiContextProvider)



  const [amount, setAmount] = useState(0)
  const [description, setDescription] = useState('')


  const createExpense = async () => {
    try {
      const data = {
        amount: amount,
        description: description,
        book: addBookToCreateExpense?.id ? addBookToCreateExpense?.id : null
      }

      const res = await apiContext?.createExpense(data)
      if (res?.data?.id) {
        getExpenses()
        success('تم انشاء فاتورة خسارة بنجاح')

        setOpen(false)
        setAmount(0)
        setDescription('')
      } else {
        const keys = Object.keys(res?.data)
        const values = Object.values(res?.data)

        keys.forEach((key, index) => {
          error(`${key}: ${values[index]}`)
        })
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Modal
      centered
      width={700}
      visible={open}
      onOk={() => { createExpense() }}
      onCancel={() => setOpen(false)}
      okText='حسنا'
      cancelText='اغلاق'
    >
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gaap-1'>
          <p>المبلغ *</p>
          <Input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='ادخل المبلغ' type='number' className='w-full' />
        </div>
        <div className='flex flex-col gaap-1'>
          <p>هل هناك اي وصف</p>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder='اختياري' className='w-full' />
        </div>
      </div>
    </Modal>
  )
}

export default ExponseCreateOrUpdate
