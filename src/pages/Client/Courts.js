import React, { useContext, useEffect } from 'react'
import Header from '../../components/Header'
import { ApiContextProvider } from '../../contexts/ApiContext'
import { useState } from 'react'
import Loading from '../../components/Loading'
import Court from '../../components/Court'
import { Backdrop, CircularProgress } from '@mui/material'
import { Alert, Button, Input, Select } from 'antd'

const Courts = () => {
  const apiContext = useContext(ApiContextProvider)

  const [courts, setCourts] = useState([])
  const [load, setLoad] = useState(true)
  const getCourts = async (name, country, city, state) => {
    setLoad(true)
    try {
      const res = await apiContext?.getCourts(name, country, city, state)
      setCourts(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoad(false)
    }
  }
  useEffect(() => {
    getCourts()
  }, [])



  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')





  const [countries, setCountries] = useState([])
  const [loadingCountries, setLoadingCountries] = useState(true)
  const getCountries = async () => {
    setLoadingCountries(true)
    try {
      const res = await apiContext?.getCountries()
      setCountries(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoadingCountries(false)
    }
  }
  useEffect(() => {
    getCountries()
  }, [])


  const [cities, setCities] = useState([])
  const [loadingCities, setLoadingCities] = useState(true)
  const getCities = async () => {
    setLoadingCities(true)
    try {
      const res = await apiContext?.getCities(country)
      setCities(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoadingCities(false)
    }
  }
  useEffect(() => {
    country && getCities()
  }, [country])



  const [states, setStates] = useState([])
  const [loadingStates, setLoadingStates] = useState(true)
  const getStates = async () => {
    setLoadingStates(true)
    try {
      const res = await apiContext?.getStates(city)
      setStates(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoadingStates(false)
    }
  }
  useEffect(() => {
    city && getStates()
  }, [city])




  return (
    <div className='flex flex-col gap-5'>
      <Header />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={load}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className='flex flex-col gap-3 p-5 w-full max-w-6xl mx-auto'>
        {/* serch */}
        <div className='search flex flex-col rounded-md shadow-md gap-2 bg-white p-3'>
          <div className=' flex gap-4 flex-wrap justify-between'>
            <div className='flex flex-col w-full max-w-[200px]'>
              <p>اسم الملعب</p>
              <Input onChange={(e) => setName(e.target.value)} value={name} placeholder='الاسم' />
            </div>
            <div className='flex flex-col w-full max-w-[200px]'>
              <p>البلد</p>
              <Select onChange={(e) => {
                if (e === '') {
                  setCity('')
                  setState('')
                  setCities([])
                  setStates([])
                  setCountry('')
                } else {
                  setCountry(e)
                }
              }} value={country} defaultValue={''}>
                <Select.Option value="">أختر</Select.Option>
                {
                  countries?.map((country, index) => <Select.Option key={index} value={country.id}>{country.name}</Select.Option>)
                }
              </Select>
            </div>
            <div className='flex flex-col w-full max-w-[200px]'>
              <p>المدينة</p>
              <Select onChange={(e) => {
                if (e === '') {
                  setCity('')
                  setState('')
                  setStates([])
                } else {
                  setCity(e)
                }
              }} value={city} defaultValue={''}>
                <Select.Option value="">أختر</Select.Option>
                {
                  cities?.map((city, index) => <Select.Option key={index} value={city.id}>{city.name}</Select.Option>)
                }
              </Select>
            </div>
            <div className='flex flex-col w-full max-w-[200px]'>
              <p>المنطقة</p>
              <Select onChange={(e) => {
                if (e === '') {
                  setState('')
                } else {
                  setState(e)
                }
              }} value={state} defaultValue={''}>
                <Select.Option value="">أختر</Select.Option>
                {
                  states?.map((state, index) => <Select.Option key={index} value={state.id}>{state.name}</Select.Option>)
                }
              </Select>
            </div>
          </div>
          <Button onClick={() => getCourts(name, country, city, state)} type='primary' className='w-fit'>بحث</Button>
        </div>

        {/* courts */}
        <div className='courts flex flex-wrap gap-5 justify-around'>
          {
            courts?.length === 0 && !load && <Alert message="لا يوجد ملاعب" type="warning" />
          }
          {
            courts?.length > 0 && courts?.map((court, index) => <Court key={index} court={court} />)
          }
        </div>
      </div>
    </div>
  )
}

export default Courts