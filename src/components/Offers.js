import React, { useEffect } from 'react'
import { InputNumber } from 'antd';

const Offers = ({ court, setOfferPrice, setOfferFrom, setOfferTo, setEventPrice, setEventFrom, setEventTo, offerPrice, offerFrom, offerTo, eventPrice, eventFrom, eventTo }) => {


  useEffect(() => {
    if (court !== null) {
      setOfferPrice(court?.offer_price ?? 0)
      setOfferFrom(court?.offer_time_from)
      setOfferTo(court?.offer_time_to)
      setEventPrice(court?.event_price ?? 0)
      setEventFrom(court?.event_time_from)
      setEventTo(court?.event_time_to)
    }
  }, [court?.id])

  return (
    <div className='my-3 flex flex-col gap-2 bg-zinc-200 rounded-md p-2 w-full'>

      <div className='flex flex-col gap-1'>
        <div className='flex flex-wrap gap-1'>
          <p>سعر العرض</p>
          <small className='text-red-800 my-auto'>لو تركته فارغه لن يكون هناك عرض</small>
        </div>
        <InputNumber size='large' value={offerPrice} onChange={(e) => setOfferPrice(e)} required addonAfter="EGP" />
      </div>

      <div className='flex flex-col gap-1'>
        <p>وقت العرض يبدأ من</p>
        <div className="relative">
          <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd" />
            </svg>
          </div>
          <input value={offerFrom?.slice(0, 5)} onChange={(e) => setOfferFrom(e.target.value)} type="time" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg outline-none transition-all focus:border-blue-500 block w-full p-2.5" required />
        </div>
      </div>

      <div className='flex flex-col gap-1'>
        <p>وقت العرض ينتهي في</p>
        <div className="relative">
          <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd" />
            </svg>
          </div>
          <input value={offerTo?.slice(0, 5)} onChange={(e) => setOfferTo(e.target.value)} type="time" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg outline-none transition-all focus:border-blue-500 block w-full p-2.5" required />
        </div>
      </div>

      {/* --------------------------------------Events------------------------ */}

      <div className='flex flex-col gap-1'>
        <div className='flex flex-wrap gap-1'>
          <p>سعر المناسبات</p>
          <small className='text-red-800 my-auto'>لو تركته فارغه لن يكون هناك مناسبات</small>
        </div>
        <InputNumber size='large' value={eventPrice} onChange={(e) => setEventPrice(e)} required addonAfter="EGP" />
      </div>

      <div className='flex flex-col gap-1'>
        <p>وقت المناسبات يبدأ من</p>
        <div className="relative">
          <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd" />
            </svg>
          </div>
          <input value={eventFrom?.slice(0, 5)} onChange={(e) => setEventFrom(e.target.value)} type="time" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg outline-none transition-all focus:border-blue-500 block w-full p-2.5" required />
        </div>
      </div>

      <div className='flex flex-col gap-1'>
        <p>وقت المناسبات ينتهي في</p>
        <div className="relative">
          <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd" />
            </svg>
          </div>
          <input value={eventTo?.slice(0, 5)} onChange={(e) => setEventTo(e.target.value)} type="time" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg outline-none transition-all focus:border-blue-500 block w-full p-2.5" required />
        </div>
      </div>

    </div>
  )
}

export default Offers
