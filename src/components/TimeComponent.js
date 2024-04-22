import React from 'react'
import { BsClock } from 'react-icons/bs'
import { convertToAMPM } from '../utlits/Functions'
import { BiEdit } from 'react-icons/bi'
import EditOrCreateTimeModal from './EditOrCreateTimeModal'

const TimeComponent = ({ time, getAcademyTimes }) => {

  const [editOpen, setEditOpen] = React.useState(false)

  return (
    <div className='p-2 flex justify-between flex-wrap gap-2 rounded-lg bg-indigo-100 w-full' key={time?.id}>
      <p>{time?.day_name}</p>
      <div className='flex flex-row gap-3'>
        <p className='flex gap-1'>
          <BsClock className='text-green-500 my-auto' />
          {convertToAMPM(time?.start_time?.slice(0, 5))}
        </p>
        <p>-</p>
        <p className='flex gap-1'>
          <BsClock className='text-red-500 my-auto' />
          {convertToAMPM(time?.end_time?.slice(0, 5))}
        </p>
      </div>
      <span onClick={() => setEditOpen(true)}>
        <BiEdit className='text-sm text-blue-700 cursor-pointer' />
      </span>

      <EditOrCreateTimeModal getAcademyTimes={getAcademyTimes} time={time} setOpen={setEditOpen} open={editOpen} />
    </div>
  )
}

export default TimeComponent
