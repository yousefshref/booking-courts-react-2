import React from 'react'
import {Button} from 'antd'

const Home = () => {
  return (
    <div className='flex flex-col justify-center gap-2 bg-[url("https://images.pexels.com/photos/61135/pexels-photo-61135.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")] p-3 h-screen bg-cover bg-bottom w-screen'>
      <div className='absolute w-screen h-screen top-0 right-0 from-black to-transparent bg-gradient-to-t'></div>
      <div className='absolute w-screen h-screen top-0 right-0 blur-2xl'></div>
      <div className='flex gap-6 md:flex-row flex-col justify-around w-full mx-auto md:max-w-7xl text-white z-50'>
        <div className='text text-center md:text-start flex md:w-1/2 flex-col gap-5'>
          <h1 className='text-5xl font-bold flex gap-4 tracking-wide'>احجز اي ملعب, في رياضة, في اي وقت.</h1>
          {/* <hr className='my-5' /> */}
          <div className='flex flex-col text-white'>
            <p>احجز ملعبك في اي رياضة انت بتحبها.</p>
            <p>شوف النوادي والكادريميات واشترك فيها</p>
            <p>مدربيين لكل رياضة.</p>
          </div>
        </div>
        <div className='actions md:my-auto md:w-1/2 flex text-3xl flex-col gap-3'>
          <Button href='/auth/login' type="primary" size="large">تسجيل الدخول</Button>
          <Button size="large" >فديو تعريفي</Button>
        </div>
      </div>
    </div>
  )
}

export default Home
