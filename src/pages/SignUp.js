import React, { useContext, useState } from 'react'
import { ApiContextProvider } from '../contexts/ApiContext'

import { message, Alert, Modal } from 'antd'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Facebook, Instagram, YouTube } from '@mui/icons-material'

import { useNavigate } from 'react-router-dom'
import { Backdrop, CircularProgress } from '@mui/material'

const SignUp = () => {
  const apiContext = useContext(ApiContextProvider)

  const navigate = useNavigate()

  const [messageApi, contextHolder] = message.useMessage();

  const error = (message) => {
    messageApi.error(message);
  };

  const [verificationopen, setVerificationOpen] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const [verification, setVerification] = useState('')

  const [loading, setLoading] = useState(false)
  const signUpSendVerification = async () => {
    setLoading(true)
    try {
      const res = await apiContext?.signUpSendVerification(username, phone, email, password)
      if (res.data.success) {
        setVerificationOpen(true)
      } else {
        if (res.data.username) {
          error(`username: ${res.data.username}`)
        }
        if (res.data.phone) {
          error(`phone: ${res.data.phone}`)
        }
        if (res.data.email) {
          error(`email: ${res.data.email}`)
        }
        if (res.data.password) {
          error(`password: ${res.data.password}`)
        }
      }
    } catch (err) {
      alert('error')
      console.log(err);
    } finally {
      setLoading(false)
    }
  }


  const signUp = async () => {
    const res = await apiContext?.signUp(username, phone, email, password, verification)
    if (res.data.token) {
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("username", res.data.user.username)
      localStorage.setItem("email", res.data.user.email)
      window.location.reload()
    } else {
      error('حدث خطأ ما, او الكود غير صحيح')
    }
  }

  return (
    <div>
      {contextHolder}


      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* verification */}
      <Modal
        centered
        open={verificationopen}
        onCancel={() => setVerificationOpen(false)}
        onOk={signUp}
      >
        <div className='flex flex-col gap-1 text-start'>
          <label>ادخل كود التحقق المرسل لرقم هاتفك علي واتس اب</label>
          <TextField value={verification} onChange={(e) => setVerification(e.target.value)} style={{ direction: "rtl" }} variant='outlined' />
        </div>
      </Modal>

      <div className='flex w-screen h-screen bg-indigo-200'>
        <div className='form bg-white justify-center p-4 rounded-e-2xl w-full sm:w-[60%] shadow-2xl flex flex-col'>
          <div className='text-center flex flex-col gap-4'>
            {
              alert === 'error' && (
                <Alert type='error' message='البيانات خاطئة' />
              )
            }
            <h3 className='font-bold text-3xl'>تسجيل حساب جديد</h3>
            <hr />
            <div className='flex flex-col gap-3'>
              <div className='flex flex-col gap-1 text-start'>
                <label>الاسم *</label>
                <TextField value={username} onChange={(e) => setUsername(e.target.value)} style={{ direction: "rtl" }} variant='outlined' />
              </div>
              <div className='flex flex-col gap-1 text-start'>
                <label>بريدك الالكتروني </label>
                <TextField value={email} onChange={(e) => setEmail(e.target.value)} style={{ direction: "rtl" }} variant='outlined' />
              </div>
              <div className='flex flex-col gap-1 text-start'>
                <label>رقم الهاتف الخاص بك *</label>
                <TextField value={phone} onChange={(e) => setPhone(e.target.value)} style={{ direction: "rtl" }} variant='outlined' />
              </div>
              <div className='flex flex-col gap-1 text-start'>
                <label>كلمة المرور *</label>
                <TextField value={password} onChange={(e) => setPassword(e.target.value)} style={{ direction: "rtl" }} variant='outlined' />
              </div>
              <Button type='submit' style={{
                padding: "16px"
              }} variant="contained" onClick={() => { signUpSendVerification() }}>
                <p className='font'>تسجيل</p>
              </Button>


              <hr />
              <div className='text-start flex justify-between'>
                <p onClick={() => navigate('/auth/login')} className='text-blue-500 cursor-pointer transition-all hover:text-blue-600'>لديك حساب بالفعل؟</p>
              </div>
            </div>
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
    </div>
  )
}

export default SignUp
