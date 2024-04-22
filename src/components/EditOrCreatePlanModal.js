import { Button, Input, message, Modal, Popconfirm } from 'antd'
import React, { useContext, useEffect } from 'react'
import { ApiContextProvider } from '../contexts/ApiContext'

const EditOrCreatePlanModal = ({ open, setOpen, create, getSubscribePlans, academy, plan }) => {

  const apiContext = useContext(ApiContextProvider)


  const [messageApi, contextHolder] = message.useMessage();

  const error = (message) => {
    messageApi.error(message);
  };


  const [nameState, setNameState] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [pricePerClassState, setPricePerClassState] = React.useState(null)
  const [pricePerWeekState, setPricePerWeekState] = React.useState(null)
  const [pricePerMonthState, setPricePerMonthState] = React.useState(null)
  const [pricePerYearState, setPricePerYearState] = React.useState(null)



  useEffect(() => {
    if (!create && plan?.id) {
      plan?.name && setNameState(plan?.name)
      plan?.description && setDescription(plan?.description)
      plan?.price_per_class && setPricePerClassState(plan?.price_per_class)
      plan?.price_per_week && setPricePerWeekState(plan?.price_per_week)
      plan?.price_per_month && setPricePerMonthState(plan?.price_per_month)
      plan?.price_per_year && setPricePerYearState(plan?.price_per_year)
    }
  }, [create, plan?.id])


  const updateSubscribePlan = async () => {
    try {
      const res = await apiContext?.updateSubscribePlan(plan?.id, {
        name: nameState,
        description: description,
        price_per_class: pricePerClassState,
        price_per_week: pricePerWeekState,
        price_per_month: pricePerMonthState,
        price_per_year: pricePerYearState
      })
      if (res?.data?.id) {
        setOpen(false)
        getSubscribePlans()
      } else {
        Object?.entries(res?.data || {}).forEach(([key, value]) => error(`${key}: ${value?.join(', ')}`))
      }
    } catch (err) {
      console.log(err);
    }
  }


  const createSubscribePlan = async () => {
    try {
      const res = await apiContext?.createSubscribePlan({
        academy: academy?.id,
        name: nameState,
        description: description,
        price_per_class: pricePerClassState,
        price_per_week: pricePerWeekState,
        price_per_month: pricePerMonthState,
        price_per_year: pricePerYearState
      })
      if (res?.data?.id) {
        setOpen(false)
        getSubscribePlans()
      } else {
        Object?.entries(res?.data || {}).forEach(([key, value]) => error(`${key}: ${value?.join(', ')}`))
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Modal
      centered
      open={open}
      onOk={() => {
        if (!create) {
          updateSubscribePlan()
        } else {
          // create funcion
          createSubscribePlan()
        }
      }}
      onCancel={() => setOpen(false)}
      closeIcon={false}
    >

      {contextHolder}

      <div className='p-4 relative bg-indigo-200 flex rounded-lg flex-col gap-3'>

        <div className='bg-white p-3 rounded-lg flex flex-col gap-1'>
          <p>اسم الخطة *</p>
          <Input placeholder='مثال: خطة الاطفال / الخطة السنوية' value={nameState} onChange={(e) => setNameState(e.target.value)} />
        </div>
        <div className='bg-white p-3 rounded-lg flex flex-col gap-1'>
          <p>وصف بسيط *</p>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className='bg-white p-3 rounded-lg flex flex-col gap-1'>
          <p>السعر المدفوع من كل حصة</p>
          <Input type='number' value={pricePerClassState} onChange={(e) => setPricePerClassState(e.target.value)} placeholder='السعر المدفوع من كل حصة' />
        </div>
        <div className='bg-white p-3 rounded-lg flex flex-col gap-1'>
          <p>السعر المدفوع في الاسبوع</p>
          <Input type='number' value={pricePerWeekState} onChange={(e) => setPricePerWeekState(e.target.value)} placeholder='السعر المدفوع في الاسبوع' />
        </div>
        <div className='bg-white p-3 rounded-lg flex flex-col gap-1'>
          <p>السعر المدفوع في الشهر</p>
          <Input type='number' value={pricePerMonthState} onChange={(e) => setPricePerMonthState(e.target.value)} placeholder='السعر المدفوع في الشهر' />
        </div>
        <div className='bg-white p-3 rounded-lg flex flex-col gap-1'>
          <p>السعر المدفوع في السنة</p>
          <Input type='number' value={pricePerYearState} onChange={(e) => setPricePerYearState(e.target.value)} placeholder='السعر المدفوع في السنة' />
        </div>



        {
          !create &&
          <Popconfirm
            title="هل تريد حذف هذه الخطة"
            onConfirm={async () => {
              await apiContext?.deleteSubscribePlan(plan?.id)
              await getSubscribePlans()
              setOpen(false)
            }}
            okText="نعم"
            cancelText="لا"
          >
            <Button type='primary' className='w-full bg-red-500 font'>حذف الخطة</Button>
          </Popconfirm>
        }

      </div>

    </Modal>
  )
}

export default EditOrCreatePlanModal