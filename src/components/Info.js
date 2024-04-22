import React, { useContext, useEffect, useState } from 'react'
import { Input } from 'antd';
import { InputNumber } from 'antd';
import { Select } from "antd";
import { ApiContextProvider } from '../contexts/ApiContext';

const Info = ({
  court,
  name, setName,
  address, setAddress,
  locationUrl, setLocationUrl,
  pricePerHour, setPricePerHour,
  openFrom, setOpenFrom,
  openTo, setOpenTo,
  closeFrom, setCloseFrom,
  closeTo, setCloseTo,
  ball, setBall, country, setCountry, city, setCity, state, setState
}) => {


  const apiContext = useContext(ApiContextProvider)


  const [countries, setCountries] = useState([])
  const getCountries = async () => {
    const res = await apiContext?.getCountries()
    setCountries(res.data)
  }
  useEffect(() => {
    getCountries()
  }, [])

  const [cities, setCities] = useState([])
  const getCities = async () => {
    const res = await apiContext?.getCities(country)
    setCities(res.data)
  }
  useEffect(() => {
    country && getCities()
  }, [country])

  const [states, setStates] = useState([])
  const getStates = async () => {
    const res = await apiContext?.getStates(city)
    setStates(res.data)
  }
  useEffect(() => {
    city && getStates()
  }, [city])



  useEffect(() => {
    if (court !== null) {
      setName(court?.name)
      setAddress(court?.address)
      setLocationUrl(court?.location_url)
      setPricePerHour(court?.price_per_hour)
      setOpenFrom(court?.open_from)
      setOpenTo(court?.open_to)
      setCloseFrom(court?.close_from)
      setCloseTo(court?.close_to)
      setBall(court?.has_ball)
      setCountry(court?.country)
      setCity(court?.city)
      setState(court?.state)
    }
  }, [court?.id])

  return (
    <div className='my-3 flex flex-col gap-2 bg-zinc-200 rounded-md p-2 w-full'>
      <div className='flex flex-col gap-1'>
        <p>الاسم *</p>
        <Input className='p-4' value={name} onChange={(e) => setName(e.target.value)} placeholder="اسم الملعب" required />
      </div>

      <div className='flex flex-col gap-1'>
        <p>العنوان *</p>
        <Input className='p-4' value={address} onChange={(e) => setAddress(e.target.value)} required placeholder="عنوان الملعب" />
      </div>

      <div className='flex flex-col gap-1'>
        <p>رابط خرائظ جوجل</p>
        <Input className='p-4' value={locationUrl} onChange={(e) => setLocationUrl(e.target.value)} placeholder="رابط خرائظ جوجل" />
      </div>


      <div className='flex flex-col gap-1'>
        <p>الدولة *</p>
        <Select value={country} onChange={(e) => {
          if (e === '') {
            setCities([])
            setStates([])
            setCity('')
            setState('')
            setCountry('')
          } else {
            setCountry(e)
          }
        }}>
          <Select.Option value="">أختر الدولة</Select.Option>
          {
            countries?.map(country => <Select.Option key={country?.id} value={country?.id}>{country?.name}</Select.Option>)
          }
        </Select>
      </div>

      <div className='flex flex-col gap-1'>
        <p>المدينة *</p>
        <Select value={city} onChange={(e) => {
          if (e === '') {
            setState('')
            setStates([])
            setCity('')
          } else {
            setCity(e)
          }
        }}>
          <Select.Option value="">أختر المدينة</Select.Option>
          {
            cities?.map(city => <Select.Option key={city?.id} value={city?.id}>{city?.name}</Select.Option>)
          }
        </Select>
      </div>

      <div className='flex flex-col gap-1'>
        <p>المنطقة *</p>
        <Select value={state} onChange={(e) => setState(e)}>
          <Select.Option value="">أختر المنطقة</Select.Option>
          {
            states?.map(state => <Select.Option key={state?.id} value={state?.id}>{state?.name}</Select.Option>)
          }
        </Select>
      </div>


      <div className='flex flex-col gap-1'>
        <p>سعر الحجز بالساعة *</p>
        <InputNumber size='large' value={pricePerHour} onChange={(e) => setPricePerHour(e)} required addonAfter="EGP" />
      </div>

      <div className='flex flex-col gap-1'>
        <p>يفتح من *</p>
        <div className="relative">

          <input value={openFrom?.slice(0, 5)} onChange={(e) => setOpenFrom(e.target.value)} type="time" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg outline-none transition-all focus:border-blue-500 block w-full p-2.5" required />
        </div>
      </div>

      <div className='flex flex-col gap-1'>
        <p>يفتح حتي *</p>
        <div className="relative">
          <input value={openTo?.slice(0, 5)} onChange={(e) => setOpenTo(e.target.value)} type="time" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg outline-none transition-all focus:border-blue-500 block w-full p-2.5" required />
        </div>
      </div>

      <div className='flex flex-col gap-1'>
        <p>يغلق من </p>
        <div className="relative">
          <input value={closeFrom?.slice(0, 5)} onChange={(e) => setCloseFrom(e.target.value)} type="time" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg outline-none transition-all focus:border-blue-500 block w-full p-2.5" required />
        </div>
      </div>

      <div className='flex flex-col gap-1'>
        <p>يغلق حتي </p>
        <div className="relative">
          <input value={closeTo?.slice(0, 5)} onChange={(e) => setCloseTo(e.target.value)} type="time" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg outline-none transition-all focus:border-blue-500 block w-full p-2.5" required />
        </div>
      </div>

      <div className='flex flex-col gap-1'>
        <p>هل الكرة متاحة *</p>
        <Select size='large' value={ball} onChange={(e) => setBall(e)}>
          <Select.Option value={true}>نعم</Select.Option>
          <Select.Option value={false}>لا</Select.Option>
        </Select>
      </div>

    </div>
  )
}

export default Info
