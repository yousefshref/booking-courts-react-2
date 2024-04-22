import Button from '@mui/material/Button';
import React from 'react';

import { message, Modal } from "antd";

import { useContext, useEffect, useState } from 'react';
import { ApiContextProvider } from '../contexts/ApiContext';
import { convertToAMPM, convertToK } from '../utlits/Functions';
import Loading from './Loading';

import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { Popconfirm } from "antd";
import { useNavigate } from 'react-router-dom';
import { server } from '../utlits/Variables';
import DisplayInvoicesModal from './DisplayInvoicesModal';
import FeaturesAndTools from './FeaturesAndTools';
import ImagesAndVideos from './ImagesAndVideos';
import Info from './Info';
import Offers from './Offers';

const CourtCard = ({ court, deleteCourt }) => {

  const apiContext = useContext(ApiContextProvider)


  const navigate = useNavigate()

  const [courtDetail, setCourt] = useState([])
  const [loadingCourt, setLoadingCourt] = useState(true)

  const getCourtDetail = async () => {
    setLoadingCourt(true)
    try {
      const res = await apiContext?.getCourtDetail(court.id, true)
      setCourt(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoadingCourt(false)
    }
  }

  useEffect(() => {
    court.id && getCourtDetail()
  }, [court.id])



  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  const getCourtImages = async () => {
    setLoading(true)
    try {
      const res = await apiContext?.getCourtImages(courtDetail?.id)
      setImages(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const [videos, setVideos] = useState([])
  const [loadingVideo, setLoadingVideos] = useState(true)

  const getCourtVideo = async () => {
    setLoadingVideos(true)
    try {
      const res = await apiContext?.getCourtVideo(courtDetail?.id)
      setVideos(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoadingVideos(false)
    }
  }


  const [tools, setTools] = useState([])
  const [loadingTools, setLoadingTools] = useState(true)

  const getCourtTools = async () => {
    setLoadingTools(true)
    try {
      const res = await apiContext?.getCourtTools(courtDetail?.id)
      setTools(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoadingTools(false)
    }
  }

  const [features, setFeatures] = useState([])
  const [loadingFeatures, setLoadingFeatures] = useState(true)

  const getCourtFeatures = async () => {
    setLoadingFeatures(true)
    try {
      const res = await apiContext?.getCourtFeatures(courtDetail?.id)
      setFeatures(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoadingFeatures(false)
    }
  }

  useEffect(() => {
    courtDetail?.id && getCourtImages()
    courtDetail?.id && getCourtVideo()
    courtDetail?.id && getCourtTools()
    courtDetail?.id && getCourtFeatures()
  }, [courtDetail?.id])



  const [isVisible, setIsVisible] = useState(false);


  const [selected, setSelected] = useState('info')


  const [messageApi, contextHolder] = message.useMessage();

  const error = () => {
    messageApi.error('يرجي التحقق من صحة الخانات المدخلة');
  };

  const success = () => {
    messageApi.success('تم تعديل الملعب بنجاح');
  };


  const [name, setName] = useState(court?.name)
  const [address, setAddress] = useState(court?.address)
  const [locationUrl, setLocationUrl] = useState(court?.location_url)
  const [country, setCountry] = useState(null)
  const [city, setCity] = useState(null)
  const [state, setState] = useState(null)
  const [pricePerHour, setPricePerHour] = useState(court?.price_per_hour)
  const [openFrom, setOpenFrom] = useState(court?.open_from)
  const [openTo, setOpenTo] = useState(court?.open_to)
  const [closeFrom, setCloseFrom] = useState(court?.close_from)
  const [closeTo, setCloseTo] = useState(court?.close_to)
  const [ball, setBall] = useState(court?.has_ball)

  const [offerPrice, setOfferPrice] = useState(court?.offer_price)
  const [offerFrom, setOfferFrom] = useState(court?.offer_time_from)
  const [offerTo, setOfferTo] = useState(court?.offer_time_to)

  const [eventPrice, setEventPrice] = useState(court?.event_price)
  const [eventFrom, setEventFrom] = useState(court?.event_time_from)
  const [eventTo, setEventTo] = useState(court?.event_time_to)

  const [selectedImages, setSelectedImages] = useState([])

  const [selectedVideos, setSelectedVideos] = useState([])

  const [selectedTools, setSelectedTools] = useState([])

  const [selectedFeatures, setSelectedFeatures] = useState([])

  const updateCourt = async () => {
    try {

      const createImages = selectedImages?.filter(img => !img.id)
      const createVideos = selectedVideos?.filter(vid => !vid.id)
      const updateTools = selectedTools?.filter(tool => tool.id)
      const createTools = selectedTools?.filter(tool => !tool.id)
      const updateFeatures = selectedFeatures?.filter(feature => feature.id)
      const createFeatures = selectedFeatures?.filter(feature => !feature.id)


      const emptyFeatures = selectedFeatures?.find(f => f.is_free === null || f.is_free === undefined || f.name === '')
      const emptyTools = selectedTools?.find(t => t.name === '' || t.price === null || t.price === undefined || t.price === 0 || t.price === '')

      const courtRes = await apiContext?.updateCourt(courtDetail?.id, name, address, locationUrl, pricePerHour, openFrom, openTo, closeFrom, closeTo, false, ball, offerPrice, offerFrom, offerTo, eventPrice, eventFrom, eventTo, country, city, state)
      if (courtRes?.data?.id) {
        const createImagesRes = await apiContext?.createCourtImage(courtRes?.data.id, createImages)
        const createCourtVideoRes = await apiContext?.createCourtVideo(courtRes?.data.id, createVideos)
        const updateCourtTool = await apiContext?.updateCourtTool(updateTools)
        const createCourtTool = await apiContext?.createCourtTool(courtRes?.data.id, createTools)
        const updateCourtFeature = await apiContext?.updateCourtFeature(updateFeatures)
        const createCourtFeature = await apiContext?.createCourtFeature(courtRes?.data.id, createFeatures)

        getCourtDetail()
        getCourtFeatures()
        getCourtImages()
        getCourtTools()
        getCourtVideo()

        setIsVisible(false)
        success()
      }

    } catch (err) {
      error()
      console.log(err);
    }

  }




  const [displayInvoices, setDisplayInvoices] = useState(false)



  return (
    <div className='courtCard h-fit p-3 bg-white w-full sm:max-w-[430px] flex flex-col gap-4'>

      {contextHolder}



      {/* update */}
      <Modal
        centered
        open={isVisible}
        onCancel={() => setIsVisible(false)}
        className='font'
        okText='تعديل'
        cancelText='الغاء'
        width={1000}
        onOk={updateCourt}
      >
        <div className='z-50 mx-auto p-3 flex flex-col gap-2'>
          <div id='switchs' className='switchs flex flex-row gap-3 max-w-full w-fit p-1 overflow-x-scroll'>
            <p className={`min-w-fit cursor-pointer ${selected === 'info' ? 'border-b-2 border-indigo-500' : ""} max-w-fit`} onClick={() => setSelected('info')}>المعلومات الاساسية</p>
            <p className={`min-w-fit cursor-pointer ${selected === 'offers' ? 'border-b-2 border-indigo-500' : ""} max-w-fit`} onClick={() => setSelected('offers')}>المناسبات والعروض</p>
            <p className={`min-w-fit cursor-pointer ${selected === 'images' ? 'border-b-2 border-indigo-500' : ""} max-w-fit`} onClick={() => setSelected('images')}>الصورة والفديوهات</p>
            <p className={`min-w-fit cursor-pointer ${selected === 'features' ? 'border-b-2 border-indigo-500' : ""} max-w-fit`} onClick={() => setSelected('features')}>الميزات والادوات</p>
          </div>
          {
            window.innerWidth <= 617 &&
            <div className='flex w-full p-1 justify-between'>
              <span className='p-1 cursor-pointer' onClick={() => {
                document.getElementById('switchs')?.scrollBy({
                  top: 0,
                  left: 50,
                  behavior: 'smooth'
                })
              }}>
                <ArrowRight />
              </span>
              <span className='p-1 cursor-pointer' onClick={() => {
                document.getElementById('switchs')?.scrollBy({
                  top: 0,
                  left: -50,
                  behavior: 'smooth'
                })
              }}>
                <ArrowLeft />
              </span>
            </div>
          }
          <hr />
          <div className='text-sm'>
            <p>يرجي ملئ كل خانة لديها هذه العلامة (*)</p>
          </div>
          <hr />
          <form className='min-h-fit max-h-[400px] overflow-y-scroll'>

            {
              selected === 'info' && <Info
                name={name}
                setName={setName}
                address={address}
                setAddress={setAddress}
                locationUrl={locationUrl}
                setLocationUrl={setLocationUrl}
                pricePerHour={pricePerHour}
                setPricePerHour={setPricePerHour}
                openFrom={openFrom}
                setOpenFrom={setOpenFrom}
                openTo={openTo}
                setOpenTo={setOpenTo}
                closeFrom={closeFrom}
                setCloseFrom={setCloseFrom}
                closeTo={closeTo}
                setCloseTo={setCloseTo}
                ball={ball}
                setBall={setBall}
                country={country}
                setCountry={setCountry}
                city={city}
                setCity={setCity}
                state={state}
                setState={setState}
                court={courtDetail}
              />

            }
            {
              selected === 'offers' && <Offers
                court={courtDetail}
                offerPrice={offerPrice}
                setOfferPrice={setOfferPrice}
                offerFrom={offerFrom}
                setOfferFrom={setOfferFrom}
                offerTo={offerTo}
                setOfferTo={setOfferTo}
                eventPrice={eventPrice}
                setEventPrice={setEventPrice}
                eventFrom={eventFrom}
                setEventFrom={setEventFrom}
                eventTo={eventTo}
                setEventTo={setEventTo}
              />

            }
            {
              selected === 'images' && <ImagesAndVideos
                images={images}
                videos={videos}
                court={courtDetail}
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
                selectedVideos={selectedVideos}
                setSelectedVideos={setSelectedVideos}
                getCourtImages={getCourtImages}
                getCourtVideo={getCourtVideo}
              />
            }
            {
              selected === 'features' && (
                <FeaturesAndTools
                  features={features}
                  tools={tools}
                  court={courtDetail}
                  selectedFeatures={selectedFeatures}
                  setSelectedFeatures={setSelectedFeatures}
                  selectedTools={selectedTools}
                  setSelectedTools={setSelectedTools}
                  getCourtTools={getCourtTools}
                  getCourtFeatures={getCourtFeatures}
                />
              )
            }

          </form>
        </div>
      </Modal>


      <div className='flex justify-between gap-3'>
        {
          loading ? <Loading /> :
            <img
              src={images[0]?.id ? server + images[0]?.image : 'https://en.reformsports.com/oxegrebi/2020/09/mini-futbol-sahasi-ozellikleri-ve-olculeri.jpg'}
              width={100} height={100} alt="a"
              className='rounded-md'
            />
        }
        <div className='flex flex-col my-auto'>
          <p>من: {convertToAMPM(court.open_to)} حتي: {convertToAMPM(court.open_from)}</p>
          {
            court.close_from && court.close_to ? (
              <p className='text-xs text-zinc-700'>
                يغلق بين: {convertToAMPM(court.close_from)} و {convertToAMPM(court.close_to)}
              </p>
            ) : null
          }
        </div>
      </div>
      <hr />
      <div className='flex justify-between gap-3 px-2'>
        <div className='flex flex-col text-center gap-1'>
          <p className='text-2xl'>{convertToK(String(courtDetail?.total_books)) ?? 0} <span className='text-sm'>مرة</span></p>
          <p className='text-xs text-zinc-700'>تم الحجز</p>
        </div>
        <div className='flex flex-col text-center gap-1'>
          <p className='text-2xl'>{convertToK(String(courtDetail?.total_money)) ?? 0} <span className='text-sm'>جنية</span></p>
          <p className='text-xs text-zinc-700'>ايرادات الملعب</p>
        </div>
      </div>
      <hr />
      <div className='flex justify-between gap-3'>
        <div className='flex gap-1'>
          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            width={50} height={50} alt="a"
            className='rounded-full'
          />
          <div className='flex flex-col my-auto'>
            <small onClick={() => navigate(`/court/${court?.name?.replace(' ', '-')}/${court?.id}`)} className='text-xs cursor-pointer text-blue-600 underline underline-offset-4'>{court?.name}</small>
          </div>
        </div>
        <div className='text-indigo-700 my-auto'>
          <p className='my-auto font-bold'>{court.price_per_hour} جنية</p>
        </div>
      </div>
      <hr />
      <div className='flex flex-col gap-4'>
        <div className='actions flex gap-3'>
          <Button style={{
            padding: "13px",
            borderRadius: "100px"
          }} onClick={() => setIsVisible(!isVisible)} className='w-full max-w-[200px]' variant="contained"><p className='font'>تعديل</p></Button>
          {/* delete */}
          <Popconfirm
            title={<p className='font'>هل تريد حذف هذا الملعب؟</p>}
            onConfirm={() => deleteCourt(court?.id)}
            onCancel={null}
            okText="حذف"
            cancelText="الغاء"
            okButtonProps={{ style: { backgroundColor: "red" } }}
          >
            <Button style={{
              padding: "13px",
              borderRadius: "100px"
            }} color='error' className='w-full max-w-[200px]' variant="outlined"><p className='font'>حذف</p></Button>
          </Popconfirm>
        </div>
        <Button style={{
          padding: "13px",
          borderRadius: "100px"
        }} onClick={() => setDisplayInvoices(true)} className='w-full' color='secondary' variant="contained"><p className='font'>فواتير الملعب</p></Button>

        {/* invoices display */}
        <DisplayInvoicesModal open={displayInvoices} setOpen={setDisplayInvoices} court={court} />

      </div>


      {
        !court?.is_active &&
        (
          <>
            <hr />
            <p>مازال قيد المراجعة حتي يتم نشرة</p>
          </>
        )
      }


    </div>
  )
}

export default CourtCard