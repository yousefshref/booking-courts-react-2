import { Facebook, Instagram, YouTube } from '@mui/icons-material'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import React, { useContext, useEffect, useState } from 'react'
import { ApiContextProvider } from '../contexts/ApiContext';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const apiContext = useContext(ApiContextProvider)

  const navigate = useNavigate()

  const [phone, setphone] = useState("")
  const [password, setPassword] = useState("")

  const [alert, setAlert] = useState(false)

  const loginFunction = async (phone, password) => {
    try {
      const res = await apiContext?.loginFunction(phone, password)
      if (res?.data?.token) {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('username', res.data.user.username)
        localStorage.setItem('email', res.data.user.email)
        if (res?.data?.user) window.location.reload()
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 404) {
        setAlert("error")
      }
    }
  }

  useEffect(() => {
    if (alert) {
      const timeout = setTimeout(() => {
        setAlert(false)
      }, 3000)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [alert])
  return (
    <div className='flex w-screen h-screen bg-indigo-200'>
      <div className='form bg-white justify-center p-4 rounded-e-2xl w-full sm:w-[60%] shadow-2xl flex flex-col'>
        <div className='text-center flex flex-col gap-4'>
          {
            alert === 'error' && (
              <Alert severity={"error"}>
                <p className='font'>البيانات خاطئة</p>
              </Alert>
            )
          }
          <h3 className='font-bold text-3xl'>تسجيل الدخول بحسابك الموجود بالفعل</h3>
          <hr />
          <form onSubmit={(e) => {
            e.preventDefault()
            loginFunction(phone, password)
          }} className='flex flex-col gap-3'>
            <div className='flex flex-col gap-1 text-start'>
              <label>رقم الهاتف الخاص بك</label>
              <TextField value={phone} onChange={(e) => setphone(e.target.value)} style={{ direction: "rtl" }} variant='outlined' />
            </div>
            <div className='flex flex-col gap-1 text-start'>
              <label>كلمة المرور</label>
              <TextField value={password} onChange={(e) => setPassword(e.target.value)} style={{ direction: "rtl" }} variant='outlined' />
            </div>
            <Button type='submit' style={{
              padding: "16px"
            }} variant="contained">
              <p className='font'>تسجيل</p>
            </Button>
            <hr />
            <div className='text-start flex justify-between'>
              <p onClick={() => navigate('/auth/signup')} className='text-blue-500 cursor-pointer transition-all hover:text-blue-600'>ليس لديك حساب؟</p>
              <p className='text-blue-500 cursor-pointer transition-all hover:text-blue-600'>نسيت كلمة المرور</p>
            </div>
          </form>
        </div>
      </div>
      <div className='linkawyx hidden sm:flex flex-col justify-center gap-4 p-2 w-[40%]'>
        <div className='w-fit mx-auto'>
          <img className='' src='/images/logo.png' width={300} height={300} alt='linkawyx' />
          <div className='flex flex-col gap-3 text-center'>
            <h3 className='font-medium text-2xl'>كل ما تحلم به, ابحث عنه هنا</h3>
            <p>يمكنك متابعتنا علي </p>
            <div className='flex gap-3 mx-auto'>
              <span><Facebook /></span>
              <span><Instagram /></span>
              <span><YouTube /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
