import { Button, Input, message, Modal, Popconfirm, Select } from 'antd'
import React, { useEffect } from 'react'
import { ApiContextProvider } from '../contexts/ApiContext'

const UpdateOrCreateTrainerModal = ({ open, setOpen, create, trainer, getAcademyTrainers }) => {

  const apiContext = React.useContext(ApiContextProvider)

  const [types, setTypes] = React.useState([])
  const getAcademyTypes = async () => {
    const res = await apiContext?.getAcademyTypes()
    setTypes(res?.data)
  }
  useEffect(() => {
    getAcademyTypes()
  }, [])


  const [messageApi, contextHolder] = message.useMessage();

  const error = (message) => {
    messageApi.error(message);
  }

  const [trainerName, setTrainerName] = React.useState(trainer?.trainer || '')
  const [type, setType] = React.useState(trainer?.type || '')
  const [pricePerClass, setPricePerClass] = React.useState(trainer?.price_per_class || 0)
  const [pricePerWeek, setPricePerWeek] = React.useState(trainer?.price_per_week || 0)
  const [pricePerMonth, setPricePerMonth] = React.useState(trainer?.price_per_month || 0)
  const [pricePerYear, setPricePerYear] = React.useState(trainer?.price_per_year || 0)



  const createAcademyTrainer = async () => {
    const res = await apiContext?.createAcademyTrainer({
      trainer: trainerName,
      type: type,
      price_per_class: pricePerClass,
      price_per_week: pricePerWeek,
      price_per_month: pricePerMonth,
      price_per_year: pricePerYear
    })
    if (res?.data?.id) {
      setOpen(false)
      getAcademyTrainers()
    } else {
      Object?.entries(res?.data || {}).forEach(([key, value]) => error(`${key}: ${value?.join(', ')}`))
    }
  }

  const updateAcademyTrainer = async () => {
    const res = await apiContext?.updateAcademyTrainer(trainer?.id, {
      trainer: trainerName,
      type: type,
      price_per_class: pricePerClass,
      price_per_week: pricePerWeek,
      price_per_month: pricePerMonth,
      price_per_year: pricePerYear
    })
    if (res?.data?.id) {
      setOpen(false)
      getAcademyTrainers()
    } else {
      Object?.entries(res?.data || {}).forEach(([key, value]) => error(`${key}: ${value?.join(', ')}`))
    }
  }

  return (
    <Modal
      centered
      open={open}
      onCancel={() => setOpen(false)}
      onOk={
        () => {
          if (create) {
            createAcademyTrainer()
          } else {
            updateAcademyTrainer()
          }
        }
      }
      closeIcon={false}
      width={650}
    >

      {contextHolder}

      <div className='flex flex-col gap-3 p-3 rounded-lg bg-indigo-500'>

        <div className='bg-white p-3 rounded-lg flex flex-col gap-1'>
          <p>اسم المدرب *</p>
          <Input placeholder='مثال: محمد علي' value={trainerName} onChange={(e) => setTrainerName(e.target.value)} />
        </div>
        <div className='bg-white p-3 rounded-lg flex flex-col gap-1'>
          <p>المدرب يعمل في/ تخصص المدرب *</p>
          <Select placeholder='مثال: خطة الاطفال / الخطة السنوية' value={type} onChange={(value) => setType(value)}>
            <Select.Option value=''>اختر</Select.Option>
            {
              types?.map((type) => (
                <Select.Option key={type.id} value={type.id}>{type.name}</Select.Option>
              ))
            }
          </Select>
        </div>
        <div className='bg-white p-3 rounded-lg flex flex-col gap-1'>
          <p>سعر الحصة (إختياري)</p>
          <Input type='number' value={pricePerClass} onChange={(value) => setPricePerClass(value.target.value)} />
        </div>
        <div className='bg-white p-3 rounded-lg flex flex-col gap-1'>
          <p>سعر الفترة الأسبوعية (إختياري)</p>
          <Input type='number' value={pricePerWeek} onChange={(value) => setPricePerWeek(value.target.value)} />
        </div>
        <div className='bg-white p-3 rounded-lg flex flex-col gap-1'>
          <p>سعر الفترة الشهرية (إختياري)</p>
          <Input type='number' value={pricePerMonth} onChange={(value) => setPricePerMonth(value.target.value)} />
        </div>
        <div className='bg-white p-3 rounded-lg flex flex-col gap-1'>
          <p>سعر الفترة السنة (إختياري)</p>
          <Input type='number' value={pricePerYear} onChange={(value) => setPricePerYear(value.target.value)} />
        </div>


        {
          !create &&
          <Popconfirm
            title="هل تريد حذف هذا المدرب؟"
            onConfirm={async () => {
              await apiContext?.deleteAcademyTrainer(trainer?.id)
              await getAcademyTrainers()
              setOpen(false)
            }}
            okText="نعم"
            cancelText="لا"
          >
            <Button type='primary' danger className='w-full'>حذف المدرب</Button>
          </Popconfirm>
        }

      </div>

    </Modal>
  )
}

export default UpdateOrCreateTrainerModal