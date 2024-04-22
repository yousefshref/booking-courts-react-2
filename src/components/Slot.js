import React from 'react'
import { convertToAMPM, getCurrentTime } from '../utlits/Functions'

const Slot = ({ slot, closedSlots, pinnedSlots, date, bookedSlots, visible, setVisible, warning, success, error, endTime, startTime, setEndTime, setStartTime }) => {
  const first_slot = slot?.split("-")[0]
  const sec_slot = slot?.split("-")[1]


  const currentTime = new Date("2000-01-01T" + getCurrentTime());


  const firstSlot = new Date("2000-01-01T" + first_slot);
  const secSlot = new Date("2000-01-01T" + sec_slot);

  const firstCloseTime = new Date("2000-01-01T" + closedSlots[0]);
  const secCloseTime = new Date("2000-01-01T" + closedSlots[closedSlots.length - 1]);

  const isFirstSlotClosed = firstSlot > firstCloseTime && firstSlot < secCloseTime;
  const isSecSlotClosed = secSlot > firstCloseTime && secSlot < secCloseTime;


  const pinned = pinnedSlots?.find(p => Date('2000-01-01T' + slot?.split("-")[0]) === Date('2000-01-01T' + pinnedSlots[0]?.book_details?.start_time?.slice(0, 5)) && Date('2000-01-01T' + slot?.split("-")[1]) === Date('2000-01-01T' + pinnedSlots[0]?.book_details?.end_time?.slice(0, 5)) && Date(date) === Date(p?.book_details?.date))

  const booked = bookedSlots?.find(b => b?.start_time?.slice(0, 5) === first_slot?.slice(0, 5) && b?.end_time?.slice(0, 5) === sec_slot?.slice(0, 5) && b?.date === date)
  const b = (pinnedSlots[0]?.book_details?.start_time?.slice(0, 5) === first_slot && pinnedSlots[0]?.book_details?.end_time?.slice(0, 5) === secSlot) || (pinned?.book_details?.end_time?.slice(0, 5) === sec_slot && pinned?.book_details?.start_time?.slice(0, 5) === first_slot) || (booked)

  return (
    firstSlot > currentTime &&
    <div
      onClick={() => {
        if (isSecSlotClosed && isFirstSlotClosed) {
          warning("هذه الفترة مغلقة")
        } else {
          if (b) {
            error("هذه الفترة محجوزة")
          } else {
            setStartTime(first_slot)
            setEndTime(sec_slot)
            setVisible(true)
          }
        }
      }}
      className={` 
        p-3 flex flex-col transition-all duration-300 cursor-pointer items-center gap-1 w-full md:min-w-[150px] md:w-fit text-center rounded-md 
        ${isSecSlotClosed && isFirstSlotClosed ? "bg-yellow-200 hover:bg-yellow-100" : b ? "bg-red-300 hover:bg-red-200" : "bg-white hover:bg-indigo-100"}
      `}>
      <div className='flex gap-1'>
        <p className='my-auto text-zinc-700'>من: </p>
        <p className='my-auto'>{convertToAMPM(first_slot)}</p>
      </div>
      <div className='flex gap-1'>
        <p className='my-auto text-zinc-700'>حتي: </p>
        <p className='my-auto'>{convertToAMPM(sec_slot)}</p>
      </div>
    </div>
  )
}

export default Slot
