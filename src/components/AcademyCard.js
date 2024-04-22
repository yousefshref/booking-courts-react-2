import React, { useEffect } from 'react'
import { ApiContextProvider } from '../contexts/ApiContext'
import { Button } from 'antd'
import { BiEdit } from 'react-icons/bi'
import TimeComponent from './TimeComponent'
import EditOrCreateTimeModal from './EditOrCreateTimeModal'
import SubscribePlanComponent from './SubscribePlanComponent'
import EditOrCreatePlanModal from './EditOrCreatePlanModal'
import UpdateAcademy from './UpdateAcademy'
import DisplayInvoicesModal from './DisplayInvoicesModal'
import { server } from '../utlits/Variables'

const AcademyCard = ({ academy, getAcademies }) => {

  const apiContext = React.useContext(ApiContextProvider)

  const [academyData, setAcademyData] = React.useState({})
  const getAcademy = async () => {
    const res = await apiContext?.getAcademy(academy?.id)
    setAcademyData(res?.data)
  }
  useEffect(() => {
    getAcademy()
  }, [academy])



  const [timesData, setTimesData] = React.useState([])
  const getAcademyTimes = async () => {
    const res = await apiContext?.getAcademyTimes(academyData?.id)
    setTimesData(res?.data)
  }
  useEffect(() => {
    academyData?.id && getAcademyTimes()
  }, [academyData?.id])



  const [createTime, setCreateTime] = React.useState(false)




  const [subscribePlans, setSubscribePlans] = React.useState([])

  const getSubscribePlans = async () => {
    const res = await apiContext?.getSubscribePlans(academyData?.id)
    setSubscribePlans(res?.data)
  }
  useEffect(() => {
    academyData?.id && getSubscribePlans()
  }, [academyData?.id, academyData])


  const [createPlan, setCreatePlan] = React.useState(false)



  const [updateAcademy, setUpdateAcademy] = React.useState(false)


  const [displayInvoices, setDisplayInvoices] = React.useState(false)

  return (
    <div className='relative p-4 rounded-lg h-fit bg-white w-full max-w-xs flex flex-col gap-3'>

      {
        academyData?.image && (
          <>
            <div className='flex rounded-lg'>
              <img src={server + academyData?.image} className='rounded-lg' />
            </div>

            <hr />
          </>
        )
      }

      <div className='flex gap-1 justify-between'>
        <b>{academyData?.name}</b>

        <span onClick={() => setUpdateAcademy(true)} className='edit text-blue-600 text-sm cursor-pointer'>
          <BiEdit />
        </span>

        <UpdateAcademy academy={academyData} getAcademies={getAcademies} open={updateAcademy} setOpen={setUpdateAcademy} />
      </div>

      <hr />
      <div className='times flex flex-col gap-1 text-xs'>
        {
          timesData?.length > 0 ?
            timesData?.map((time) => (
              <TimeComponent getAcademyTimes={getAcademyTimes} key={time?.id} time={time} />
            ))
            : <p className='text-red-600'>لا يوجد مواعيد</p>
        }
        <Button type='primary' onClick={() => {
          setCreateTime(true)
        }} className='w-full bg-green-500 font'>أضف موعد</Button>

        <EditOrCreateTimeModal setOpen={setCreateTime} open={createTime} getAcademyTimes={getAcademyTimes} academy={academy} create={true} />

      </div>
      <hr />
      <div className='times flex flex-col gap-1 text-xs'>
        {
          subscribePlans?.length > 0 ?
            subscribePlans?.map((plan) => (
              // <TimeComponent getAcademyTimes={getAcademyTimes} key={time?.id} time={time} />
              <SubscribePlanComponent key={plan?.id} plan={plan} getSubscribePlans={getSubscribePlans} />
            ))
            : <p className='text-red-600'>لا يوجد خطط اشتراكات</p>
        }
        <Button type='primary' onClick={() => {
          setCreatePlan(true)
        }} className='w-full bg-green-500 font'>أضف خطة جديدة</Button>

        <EditOrCreatePlanModal academy={academy} getSubscribePlans={getSubscribePlans} create={true} setOpen={setCreatePlan} open={createPlan} />
      </div>

      <hr />

      <Button type='primary' onClick={() => setDisplayInvoices(true)} className='w-full'><p className='font'>فواتير الاكاديمية</p></Button>

      <DisplayInvoicesModal open={displayInvoices} setOpen={setDisplayInvoices} academy={academy} />


    </div>
  )
}

export default AcademyCard
