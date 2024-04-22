import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'

import { Modal, Input, Alert } from "antd";

import { Button, Popconfirm, message } from 'antd'
import { ApiContextProvider } from '../contexts/ApiContext'

import { useNavigate } from 'react-router-dom'
import { Backdrop, CircularProgress } from '@mui/material';

const ManagerStaffs = () => {

  const apiContext = useContext(ApiContextProvider)

  const navigate = useNavigate()

  const [staffs, setStaffs] = useState([])
  const getStaffs = async () => {
    const res = await apiContext?.getStaffs()
    setStaffs(res.data)
  }
  useEffect(() => {
    getStaffs()
  }, [])


  const [userProfile, setUserProfile] = useState({})
  const checkProfile = async () => {
    try {
      const res = await apiContext?.checkProfile(localStorage.getItem('token'))
      setUserProfile(res?.data?.manager)
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    checkProfile()
  }, [])



  const [createStaffOpen, setCourtStaffOpen] = useState(false)

  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [verificationField, setVerificationField] = useState(false)
  const [verification, setVerification] = useState('')


  const [messageApi, contextHolder] = message.useMessage();

  const error = (message) => {
    messageApi.error(message);
  };

  const success = () => {
    messageApi.success('تمت العملية بنجاح');
  }

  const createStaffVerification = async () => {
    const signUpVerRes = await apiContext?.signUpSendVerification(username, phone, email, password)
    if (signUpVerRes?.data?.success) {
      setVerificationField(true)
    } else {
      if (signUpVerRes.data.username) {
        error(`username: ${signUpVerRes.data.username}`)
      }
      if (signUpVerRes.data.phone) {
        error(`phone: ${signUpVerRes.data.phone}`)
      }
      if (signUpVerRes.data.email) {
        error(`email: ${signUpVerRes.data.email}`)
      }
      if (signUpVerRes.data.password) {
        error(`password: ${signUpVerRes.data.password}`)
      }
    }
  }


  const signUp = async () => {
    const res = await apiContext?.signUp(username, phone, email, password, verification)
    console.log(res);
    if (res.data.token) {
      await apiContext?.createStaffProfile(res.data.user.id, userProfile?.id)
      success()
    } else {
      error('حدث خطأ ما, او الكود غير صحيح')
    }
  }




  // staff
  const [openStaff, setOpenStaff] = useState(false)

  const [staff, setStaff] = useState({})
  const getStaff = async (staff_id) => {
    const res = await apiContext?.getStaff(staff_id)
    setStaff(res.data)
  }
  useEffect(() => {
    openStaff && getStaff(openStaff)
  }, [openStaff])

  const [staffUsername, setStaffUsername] = useState('')
  const [staffEmail, setStaffEmail] = useState('')
  const [staffPhone, setStaffPhone] = useState('')

  useEffect(() => {
    staff?.id && setStaffUsername(staff?.user_details?.username)
    staff?.id && setStaffEmail(staff?.user_details?.email)
    staff?.id && setStaffPhone(staff?.user_details?.phone)
  }, [staff?.id])

  const [loading, setLoading] = useState(false)
  const serndVerification = async (phone) => {
    setLoading(true)
    try {
      if (phone) {
        const res = await apiContext?.serndVerification(phone)
        if (res.data.success) {
          setVerificationField(true)
        }
      } else {
        alert(' يجب عليك ادخال البيانات ')
      }
    } finally {
      setLoading(false)
    }
  }

  const updateStaffUser = async (staff_id, username, phone, email, password, code) => {
    const res = await apiContext?.updateStaffUser(staff_id, username, phone, email, password, code)
    if (res.data.error) {
      error(res.data.error)
    } else {
      success()
      setVerification(null)
      setOpenStaff(false)
      getStaffs()
    }
  }


  const deleteStaff = async (staff_id) => {
    const res = await apiContext?.deleteStaff(staff_id)
    success()
    getStaffs()
  }

  return (
    <div className='flex flex-col gap-6'>
      {contextHolder}

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Header />

      {/* create staff */}
      <Modal
        title="اضافة موظف"
        width={700}
        centered
        okText='تسجيل'
        open={createStaffOpen}
        onOk={() => { verificationField ? signUp() : createStaffVerification() }}
        onCancel={() => setCourtStaffOpen(false)}
        className='font'
      >

        <div className='text-center flex flex-col gap-4'>
          {
            alert === 'error' && (
              <Alert type='error' message='البيانات خاطئة' />
            )
          }
          <h3 className='font-bold text-3xl'>تسجيل الدخول بحسابك الموجود بالفعل</h3>
          <hr />
          <form onSubmit={(e) => {
            e.preventDefault()
            createStaffVerification()
          }} className='flex flex-col gap-3'>
            <div className='flex flex-col gap-1 text-start'>
              <label>الاسم</label>
              {
                verificationField ?
                  <Input disabled value={username} onChange={(e) => setUsername(e.target.value)} style={{ direction: "rtl" }} variant='outlined' />
                  :
                  <Input value={username} onChange={(e) => setUsername(e.target.value)} style={{ direction: "rtl" }} variant='outlined' />
              }
            </div>
            <div className='flex flex-col gap-1 text-start'>
              <label>بريدك الالكتروني</label>
              {
                verificationField ?
                  <Input disabled value={email} onChange={(e) => setEmail(e.target.value)} style={{ direction: "rtl" }} variant='outlined' />
                  :
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} style={{ direction: "rtl" }} variant='outlined' />
              }
            </div>
            <div className='flex flex-col gap-1 text-start'>
              <label>رقم الهاتف الخاص بك</label>
              {
                verificationField ?
                  <Input disabled value={phone} onChange={(e) => setPhone(e.target.value)} style={{ direction: "rtl" }} variant='outlined' />
                  :
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} style={{ direction: "rtl" }} variant='outlined' />
              }
            </div>
            <div className='flex flex-col gap-1 text-start'>
              <label>كلمة المرور</label>
              {
                verificationField ?
                  <Input disabled value={password} onChange={(e) => setPassword(e.target.value)} style={{ direction: "rtl" }} variant='outlined' />
                  :
                  <Input value={password} onChange={(e) => setPassword(e.target.value)} style={{ direction: "rtl" }} variant='outlined' />
              }
            </div>
            <div className={`${verificationField ? "h-fit" : "h-0"} overflow-hidden transition-all flex flex-col gap-1 text-start`}>
              <label>كود التحقق المرسل الي البريد الالكتروني</label>
              <Input value={verification} onChange={(e) => setVerification(e.target.value)} style={{ direction: "rtl" }} variant='outlined' />
            </div>
            <hr />
            <div className='text-start flex justify-between'>
              <p onClick={() => navigate('/auth/login')} className='text-blue-500 cursor-pointer transition-all hover:text-blue-600'>لديك حساب بالفعل؟</p>
            </div>
          </form>
        </div>

      </Modal>


      {/* see staff */}
      <Modal
        title="الموظف الفولان الفولاني"
        width={700}
        centered
        okText='حفظ'
        open={openStaff}
        onOk={() => {
          verificationField ? updateStaffUser(staff?.user_details?.id, staffUsername, staffPhone, staffEmail, verification) : serndVerification(staffPhone)
        }}
        onCancel={() => setOpenStaff(false)}
        className='font'
      >

        <div className='text-center flex flex-col gap-4'>
          {
            alert === 'error' && (
              <Alert type='error' message='البيانات خاطئة' />
            )
          }
          <h3 className='font-bold text-3xl'>تسجيل الدخول بحسابك الموجود بالفعل</h3>
          <hr />
          <div className='flex flex-col gap-3'>
            <div className='flex flex-col gap-1 text-start'>
              <label>الاسم</label>
              {
                verificationField ?
                  <Input disabled value={staffUsername} onChange={(e) => setStaffUsername(e.target.value)} style={{ direction: "rtl" }} variant='outlined' />
                  :
                  <Input value={staffUsername} onChange={(e) => setStaffUsername(e.target.value)} style={{ direction: "rtl" }} variant='outlined' />
              }
            </div>
            <div className='flex flex-col gap-1 text-start'>
              <label>بريدك الالكتروني</label>
              {
                verificationField ?
                  <Input disabled value={staffEmail} onChange={(e) => setStaffEmail(e.target.value)} style={{ direction: "rtl" }} variant='outlined' />
                  :
                  <Input value={staffEmail} onChange={(e) => setStaffEmail(e.target.value)} style={{ direction: "rtl" }} variant='outlined' />
              }
            </div>
            <div className='flex flex-col gap-1 text-start'>
              <label>رقم الهاتف الخاص بك</label>
              {
                verificationField ?
                  <Input disabled value={staffPhone} onChange={(e) => setStaffPhone(e.target.value)} style={{ direction: "rtl" }} variant='outlined' />
                  :
                  <Input value={staffPhone} onChange={(e) => setStaffPhone(e.target.value)} style={{ direction: "rtl" }} variant='outlined' />
              }
            </div>

            <div className={`${verificationField ? "h-fit" : "h-0"} overflow-hidden transition-all flex flex-col gap-1 text-start`}>
              <label>كود التحقق المرسل الي البريد الالكتروني</label>
              <Input value={verification} onChange={(e) => setVerification(e.target.value)} style={{ direction: "rtl" }} variant='outlined' />
            </div>
            <hr />
            <div className='text-start flex justify-between'>
              <p onClick={() => navigate('/auth/login')} className='text-blue-500 cursor-pointer transition-all hover:text-blue-600'>لديك حساب بالفعل؟</p>
            </div>
          </div>
        </div>

      </Modal>

      <div className='flex flex-col gap-4 p-5'>
        {/* actions */}
        <div className='flex gap-3'>
          <Button onClick={() => setCourtStaffOpen(true)} className='bg-green-500' type='primary'>اضافة موظف</Button>
        </div>


        {/* staffs */}
        <div className='flex flex-wrap gap-7'>
          {
            staffs?.map((staff) => (
              <div key={staff?.id} className='p-3 shadow-md w-full sm:max-w-[300px] bg-white rounded-md flex flex-col gap-3'>
                <span className='avatar mx-auto'>
                  <img width={170} height={170} src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" />
                </span>
                <div className='text-center'>
                  <h3>{staff?.user_details?.username}</h3>
                  <p>{staff?.user_details?.phone}</p>
                </div>

                <div className='actions flex gap-3 flex-col sm:flex-row'>
                  <Button onClick={() => setOpenStaff(staff?.id)} type='primary' className='w-full mx-auto rounded-full sm:max-w-[200px]' variant="contained"><p className='font'>تعديل</p></Button>
                  <Popconfirm
                    title={<p className='font'>هل تريد حذف هذا الملعب؟</p>}
                    onCancel={null}
                    onConfirm={() => deleteStaff(staff?.id)}
                    okText="حذف"
                    cancelText="الغاء"
                    okButtonProps={{ style: { backgroundColor: "red" } }}
                  >
                    <Button type='default' className='w-full rounded-full sm:max-w-[200px] mx-auto' variant="outlined"><p className='font'>حذف</p></Button>
                  </Popconfirm>
                </div>
              </div>
            ))
          }
        </div>

      </div>

    </div>
  )
}

export default ManagerStaffs
