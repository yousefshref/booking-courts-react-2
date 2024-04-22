import React, { useContext, useEffect, useState } from 'react'
import { ApiContextProvider } from '../../contexts/ApiContext'
import Header from '../../components/Header';
import { Alert, Button, Carousel } from 'antd';
import { server } from '../../utlits/Variables';
import Loading from '../../components/Loading';
import { ArrowLeft, ArrowRight, Event } from '@mui/icons-material';
import { Backdrop, CircularProgress } from '@mui/material';
import { SiGooglemaps } from 'react-icons/si';
import { FaClock } from 'react-icons/fa';
import { convertToAMPM } from '../../utlits/Functions';
import { BiSolidOffer } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const CourtDetail = () => {
  const apiContext = useContext(ApiContextProvider)

  const id = window.location.pathname.split('/').pop()



  const [loadingCourt, setLoadingCourt] = useState(true)
  const [court, setCourt] = useState(null)

  const getCourtDetail = async () => {
    setLoadingCourt(true)
    try {
      const res = await apiContext.getCourtDetail(id)
      setCourt(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoadingCourt(false)
    }
  }

  useEffect(() => {
    getCourtDetail()
  }, [id])



  const [loadingImages, setLoadingImages] = useState(true)
  const [images, setImages] = useState([])

  const getCourtImages = async () => {
    setLoadingImages(true)
    try {
      const res = await apiContext.getCourtImages(id)
      setImages(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoadingImages(false)
    }
  }

  useEffect(() => {
    id && getCourtImages()
  }, [id, court?.id])


  const [mainImage, setMainImage] = useState(server + images[0]?.image);

  useEffect(() => {
    if (images.length > 0) {
      setMainImage(server + images[0]?.image);
    }
  }, [images])

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };



  const [loadingTools, setLoadingTools] = useState(true);
  const [tools, setTools] = useState([]);

  const getCourtTools = async () => {
    setLoadingTools(true);
    try {
      const res = await apiContext.getCourtTools(court?.id);
      setTools(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingTools(false);
    }
  };

  useEffect(() => {
    court?.id && getCourtTools();
  }, [court?.id]);



  const [loadingFeatures, setLoadingFeatures] = useState(true);
  const [features, setFeatures] = useState([]);

  const getCourtFeatures = async () => {
    setLoadingFeatures(true);
    try {
      const res = await apiContext.getCourtFeatures(court?.id);
      setFeatures(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingFeatures(false);
    }
  };

  useEffect(() => {
    court?.id && getCourtFeatures();
  }, [court?.id]);


  const navigate = useNavigate()


  return (
    <div className='flex flex-col gap-3'>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingCourt}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Header />

      <div className='p-5 w-full max-w-6xl mx-auto'>
        <Button onClick={() => navigate(`/court/${court?.name?.replace(' ', '-')}/${court?.id}/book/`)} type='primary' className='font'>أحجز الملعب</Button>
      </div>

      <div className='flex flex-col gap-3 p-5 w-full max-w-6xl mx-auto'>
        <div className='top flex md:flex-row flex-col gap-3 bg-white p-3 rounded-md shadow-md'>
          <div className="flex flex-col items-center">
            <div className="main-image">
              <img src={mainImage} alt="Main Image" className="w-full md:max-w-[240px] h-auto rounded-md" />
            </div>
            <div className='flex gap-1 p-2 w-full max-w-[260px]'>
              <div onClick={() => {
                const imagesDiv = document.getElementById('imagesSmall')
                imagesDiv.scrollBy({
                  top: 0,
                  left: -100,
                  behavior: 'smooth'
                })
              }} className="prev-arrow flex flex-col justify-center cursor-pointer p-1 bg-indigo-200 transition-all hover:bg-indigo-300 rounded-full">
                <ArrowRight />
              </div>
              <div id='imagesSmall' className="relative whitespace-nowrap bg-zinc-200 rounded-md thumbnail-images flex overflow-scroll gap-3 justify-start ">
                {
                  loadingImages ? <Loading /> : (
                    images.map((image, index) => (
                      <img
                        key={index}
                        className="thumbnail inline-block rounded-md w-16 h-auto cursor-pointer"
                        src={server + image.image}
                        alt={court?.name}
                        onClick={() => handleThumbnailClick(server + image?.image)}
                      />
                    ))
                  )
                }
              </div>
              <div onClick={() => {
                const imagesDiv = document.getElementById('imagesSmall')
                imagesDiv.scrollBy({
                  top: 0,
                  left: 100,
                  behavior: 'smooth'
                })
              }} className="prev-arrow flex flex-col justify-center cursor-pointer p-1 bg-indigo-200 transition-all hover:bg-indigo-300 rounded-full">
                <ArrowLeft />
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2 my-auto'>
            <h1 className='text-3xl'>{court?.name}</h1>
            <p>{court?.address}</p>
            <p>{court?.state_details?.name}</p>
            <p>{court?.price_per_hour?.split('.')[0]} EGP</p>
          </div>
        </div>
      </div>

      <div className='flex bg-white rounded-md shadow-md mt-5 flex-col gap-3 p-5 w-full max-w-6xl mx-auto'>
        <div className='flex md:flex-row flex-col gap-6 justify-around'>
          {
            court?.location_url &&
            <a href={court?.location_url} target='_blank' className='flex gap-1 cursor-pointer my-auto'>
              <span className='my-auto'>
                <SiGooglemaps />
              </span>
              <p className='my-auto'>رابط المكان</p>
            </a>
          }
          <div className='flex flex-col my-auto'>
            <div className='open_from_to flex gap-3'>
              <div className='flex gap-1 text-green-600'>
                <span className='my-auto'>
                  <FaClock />
                </span>
                <p>{court && convertToAMPM(court?.open_from?.slice(0, 5))}</p>
              </div>
              <div className='flex gap-1 text-red-600'>
                <span className='my-auto'>
                  <FaClock />
                </span>
                <p>{court && convertToAMPM(court?.open_to?.slice(0, 5))}</p>
              </div>
            </div>
            <small className='md:mx-auto'>مواعيد العمل</small>
          </div>
          {
            court?.close_from && court?.close_to ?
              <div className='flex flex-col my-auto'>
                <div className='close_from_to flex gap-3'>
                  <div className='flex gap-1 text-red-600'>
                    <span className='my-auto'>
                      <FaClock />
                    </span>
                    <p>{convertToAMPM(court?.close_from?.slice(0, 5))}</p>
                  </div>
                  <div className='flex gap-1 text-red-600'>
                    <span className='my-auto'>
                      <FaClock />
                    </span>
                    <p>{convertToAMPM(court?.close_to?.slice(0, 5))}</p>
                  </div>
                </div>
                <small className='md:mx-auto'>يغلق في</small>
              </div>
              : null
          }
        </div>

        {
          (court?.offer_price && court?.offer_time_from && court?.offer_time_to) ||
            (court?.event_price && court?.event_time_from && court?.event_time_to) ?
            <hr />
            : null
        }

        <div className='flex md:flex-row flex-col gap-6 justify-around'>
          {
            court?.offer_price && court?.offer_time_from && court?.offer_time_to ?
              <div className='flex flex-col my-auto'>
                <div className='open_from_to flex gap-3'>
                  <div className='flex gap-1 text-green-600'>
                    <span className='my-auto'>
                      <FaClock />
                    </span>
                    {/* <p>{court && convertToAMPM(court?.offer_time_from?.slice(0, 5))}</p> */}
                  </div>
                  <div className='flex gap-1 text-green-600'>
                    <span className='my-auto'>
                      <FaClock />
                    </span>
                    {/* <p>{court && convertToAMPM(court?.offer_time_to?.slice(0, 5))}</p> */}
                  </div>
                </div>
                <div className='md:mx-auto flex gap-1 text-green-700'>
                  <small className='my-auto'>{court?.offer_price?.split('.')[0]} EGP</small>
                </div>
                <div className='md:mx-auto flex gap-1 text-indigo-700'>
                  <BiSolidOffer className='text-lg my-auto' />
                  <small className='my-auto'>عرض محدود</small>
                </div>
                <hr className='my-3 block md:hidden' />
              </div>
              : null
          }


          {
            court?.event_price && court?.event_time_from && court?.event_time_to ?
              <div className='flex flex-col my-auto'>
                <div className='open_from_to flex gap-3'>
                  <div className='flex gap-1 text-green-600'>
                    <span className='my-auto'>
                      <FaClock />
                    </span>
                    <p>{court && convertToAMPM(court?.event_time_from?.slice(0, 5))}</p>
                  </div>
                  <div className='flex gap-1 text-green-600'>
                    <span className='my-auto'>
                      <FaClock />
                    </span>
                    <p>{court && convertToAMPM(court?.event_time_to?.slice(0, 5))}</p>
                  </div>
                </div>
                <div className='md:mx-auto flex gap-1 text-green-700'>
                  <small className='my-auto'>{court?.event_price?.split('.')[0]} EGP</small>
                </div>
                <div className='md:mx-auto flex gap-1 text-indigo-700'>
                  <Event fontSize='small' />
                  <small className='my-auto'>عرض محدود</small>
                </div>
              </div>
              : null
          }

        </div>

      </div>


      {
        features?.length > 0 &&
        <div className='flex bg-white rounded-md shadow-md mt-5 flex-col gap-3 p-5 w-full max-w-6xl mx-auto'>
          <p className='text-lg font-bold'>المميزات</p>
          <div className='flex flex-col gap-3'>
            {
              features?.map((feature, index) => (
                <div key={index} className='flex justify-between p-3 bg-indigo-100 rounded-md w-full'>
                  <strong className='text-sm text-zinc-600'>{feature?.name}</strong>
                  <span className={`text-sm ${feature?.is_free ? "text-green-700" : "text-red-700"}`}>{feature?.is_free ? 'مجاني' : 'رسوم'}</span>
                </div>
              ))
            }
          </div>
        </div>
      }
      {
        loadingFeatures &&
        <div className='flex bg-white rounded-md shadow-md mt-5 flex-col gap-3 p-5 w-full max-w-6xl mx-auto'>
          <Loading />
        </div>
      }



      {
        (tools?.length > 0 || loadingTools) &&
        <div className='flex bg-white rounded-md shadow-md mt-5 flex-col gap-3 p-5 w-full max-w-6xl mx-auto'>
          <p className='text-lg font-bold'>الأدوات</p>
          {
            loadingTools &&
            <Loading />
          }
          {
            tools?.length > 0 &&
            <div className='flex flex-col gap-3'>
              {
                tools?.map((tool, index) => (
                  <div key={index} className='flex justify-between p-3 bg-indigo-100 rounded-md w-full'>
                    <strong className='text-sm text-zinc-600'>{tool?.name}</strong>
                    <span className='text-sm text-green-600'>{tool?.price?.split('.')[0]} EGP</span>
                  </div>
                ))
              }
            </div>
          }
        </div>
      }


    </div>
  )
}

export default CourtDetail
