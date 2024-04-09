import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { ApiContextProvider } from '../contexts/ApiContext'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

const ManagerCourts = () => {
  const apiContext = useContext(ApiContextProvider)

  const [courts, setCourts] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(false)

  const getCourts = async () => {
    setLoading(true)
    try {
      const res = await apiContext?.getCourts()
      setCourts(res.data);
    } catch (err) {
      setErr(true)
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    localStorage.getItem('token') && getCourts()
  }, [])


  return (
    <div className='flex flex-col gap-3'>
      <Header />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className='w-full max-w-6xl mx-auto p-3'>
        <div className='search rounded-md p-3 bg-white flex flex-col gap-3'>
          <div className='flex md:flex-row flex-col gap-3 justify-between'>
            <div className='flex w-full max-w-1/3 flex-col gap-1 my-auto'>
              <p>اسم الملعب</p>
              <TextField style={{ direction: "rtl" }} variant="standard" />
            </div>
            <div className='flex w-full max-w-1/3 flex-col gap-1 my-auto'>
              <p>من انشئ الملعب</p>
              <Autocomplete
                disablePortal
                options={['top100Films', 'Harry Potter', 'Star Wars']}
                className='w-[100%]'
                renderInput={(params) => <TextField {...params} label="Movie" />}
              />
            </div>
            <div className='flex flex-col gap-1 w-full max-w-1/3'>
              <p>تاريخ الانشاء</p>
              <MobileDatePicker
                orientation="portrait"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: "normal",
                  },
                }}
              />
            </div>
          </div>
          <Button className='w-full max-w-[200px]' variant="contained"><p className='font'>ابحث</p></Button>
        </div>
      </div>
    </div>
  )
}

export default ManagerCourts