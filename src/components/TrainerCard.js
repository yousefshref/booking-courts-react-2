import React from 'react'
import UpdateOrCreateTrainerModal from './UpdateOrCreateTrainerModal'
import { BiEdit } from 'react-icons/bi'

const TrainerCard = ({ trainer, getAcademyTrainers }) => {
  const [open, setOpen] = React.useState(false)
  return (
    <div className='relative p-4 rounded-lg h-fit bg-white w-full max-w-xs flex flex-col gap-3'>

      <div className='flex gap-1 justify-between'>
        <b>{trainer?.trainer}</b>

        <span onClick={() => setOpen(true)} className='edit text-blue-600 text-sm cursor-pointer'>
          <BiEdit />
        </span>

        <UpdateOrCreateTrainerModal create={false} trainer={trainer} getAcademyTrainers={getAcademyTrainers} open={open} setOpen={setOpen} />
      </div>

      <hr />

      <div className='flex flex-col gap-1 text-xs'>
        {
          trainer?.price_per_class !== 0 && (
            <p>{trainer?.price_per_class} EGP / سعر الحصة</p>
          )
        }
        {
          trainer?.price_per_week !== 0 && (
            <p>{trainer?.price_per_week} EGP / سعر الاسبوع</p>
          )
        }
        {
          trainer?.price_per_month !== 0 && (
            <p>{trainer?.price_per_month} EGP / سعر الشهر</p>
          )
        }
        {
          trainer?.price_per_year !== 0 && (
            <p>{trainer?.price_per_year} EGP / سعر السنة</p>
          )
        }
      </div>

    </div>
  )
}

export default TrainerCard