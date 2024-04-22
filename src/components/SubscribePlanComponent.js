import React from 'react'
import { BiEdit } from 'react-icons/bi'
import EditOrCreatePlanModal from './EditOrCreatePlanModal'

const SubscribePlanComponent = ({ plan, getSubscribePlans }) => {
  const [editOpen, setEditOpen] = React.useState(false)

  return (
    <div className='relative p-3 flex flex-col gap-1 bg-indigo-100 rounded-lg'>
      <span onClick={() => setEditOpen(true)} className='absolute top-1 left-1 text-blue-600 cursor-pointer text-sm'>
        <BiEdit />
      </span>
      <b>{plan?.name}</b>
      <hr className='bg-blue-500 py-[0.5px]' />
      <div className='flex flex-col'>
        {
          plan?.price_per_class ?
            <p className='flex gap-1'>
              <span>{plan?.price_per_class} EGP</span>
              <span>/</span>
              <span>في الحصة</span>
            </p> : null
        }
        {
          plan?.price_per_week ?
            <p className='flex gap-1'>
              <span>{plan?.price_per_week} EGP</span>
              <span>/</span>
              <span>في الاسبوع</span>
            </p> : null
        }
        {
          plan?.price_per_month ?
            <p className='flex gap-1'>
              <span>{plan?.price_per_month} EGP</span>
              <span>/</span>
              <span>في الشهر</span>
            </p> : null
        }
        {
          plan?.price_per_year ?
            <p className='flex gap-1'>
              <span>{plan?.price_per_year} EGP</span>
              <span>/</span>
              <span>في السنة</span>
            </p> : null
        }
      </div>
      <hr className='bg-blue-500 py-[0.5px]' />
      {
        plan?.description &&
        <p>{plan?.description?.length > 30 ? plan?.description?.slice(0, 30) + '...' : plan?.description}</p>
      }

      <EditOrCreatePlanModal open={editOpen} setOpen={setEditOpen} plan={plan} getSubscribePlans={getSubscribePlans} />
    </div>
  )
}

export default SubscribePlanComponent