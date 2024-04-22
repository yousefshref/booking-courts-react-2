import React, { useContext, useEffect, useState } from 'react'
import { server } from '../utlits/Variables';
import { Delete } from '@mui/icons-material';
import { Input, Button } from 'antd';
import { ApiContextProvider } from '../contexts/ApiContext';

const ImagesAndVideos = ({ court, images, videos, setSelectedImages, setSelectedVideos, selectedImages, selectedVideos, getCourtImages, getCourtVideo }) => {

  const apiContext = useContext(ApiContextProvider)



  useEffect(() => {
    if (images !== null && videos !== null && court !== null) {
      setSelectedImages(images);
      setSelectedVideos(videos)
    }
  }, [images, court, videos])



  const deleteImage = async (id) => {
    const res = await apiContext?.deleteCourtImage(id)
    if ((res.status === 204)) {
      getCourtImages()
    }
  }

  const deleteVideo = async (id) => {
    const res = await apiContext?.deleteCourtVideo(id)
    if ((res.status === 204)) {
      getCourtVideo()
    }
  }

  const handleimageChange = (e) => {
    setSelectedImages(prev => [...prev, e.target.files[0]]);
  }


  return (
    <div className='my-3 flex flex-col gap-2 bg-zinc-200 rounded-md p-2 w-full'>
      <div className='flex flex-col gap-1'>
        <div className='flex flex-wrap gap-1'>
          <p>الصور</p>
          <small className='my-auto text-red-700'>يستحسن ان تكون 250px X 250px</small>
        </div>
        <div className='flex flex-wrap gap-2'>
          <label htmlFor="upload-btn" className="upload mt-auto cursor-pointer bg-indigo-500 transition-all hover:bg-indigo-600 text-white font-bold h-[200px] flex flex-col justify-center w-[200px] py-2 px-4 rounded-lg shadow-md">
            <span className='mx-auto'>أختر صورة</span>
            <input
              id="upload-btn"
              type="file"
              className="hidden"
              onChange={handleimageChange}
            />
          </label>
          {
            selectedImages.map((image, index) => {
              const url = image?.id ? server + image?.image : URL.createObjectURL(image);
              return (
                <div key={index}>
                  <span onClick={() => {
                    const exist = selectedImages.find(v => v.index === index || v.id === image?.id);
                    if (exist) {
                      if (image?.id) {
                        deleteImage(image?.id);
                      } else {
                        setSelectedImages(prev => prev.filter(v => v.index !== index));
                      }
                    }
                  }} className="text-red-600 my-auto hover:text-red-800 transition-colors cursor-pointer">
                    <Delete className="h-6 w-6" />
                  </span>
                  <img src={url} alt="" className="w-[200px] h-[200px] object-cover" />
                </div>

              );
            })
          }
        </div>
      </div>


      <div className='flex flex-col gap-1'>
        <div className='flex flex-wrap gap-1'>
          <p>الفديوهات</p>
        </div>
        {
          selectedVideos.map((video, index) => {
            return (
              <div key={index} className='flex bg-white p-3 rounded-md flex-col gap-1'>
                <div className='flex gap-3 justify-between'>
                  <Input onChange={(e) => {
                    const exist = selectedVideos.find(v => v.index === index || v.id === video?.id);
                    if (exist) {
                      exist.name = e.target.value;
                      setSelectedVideos(prev => [...prev]);
                    }
                  }} defaultValue={video?.name} className='p-4' placeholder='اكتب رابط الفديو' />
                  <span onClick={() => {
                    const exist = selectedVideos.find(v => v.index === index || v.id === video?.id);
                    if (exist) {
                      if (video?.id) {
                        deleteVideo(video?.id);
                      } else {
                        setSelectedVideos(prev => prev.filter(v => v.index !== index));
                      }
                    }
                  }} className="text-red-600 my-auto hover:text-red-800 transition-colors cursor-pointer">
                    <Delete className="h-6 w-6" />
                  </span>
                </div>
                <Input onChange={(e) => {
                  const exist = selectedVideos.find(v => v.index === index || v.id === video?.id);
                  if (exist) {
                    exist.url = e.target.value;
                    setSelectedVideos(prev => [...prev]);
                  }
                }} defaultValue={video?.url} className='p-4' placeholder='اكتب رابط الفديو' />
              </div>
            )
          })
        }

        <Button onClick={() => {
          setSelectedVideos(prev => [...prev, { index: selectedVideos?.length, name: 'فديو', url: 'https://example.com/your-video' }])
        }} className='w-fit mt-2' type='primary'>اضف رابط جديد</Button>
      </div>
    </div>
  )
}

export default ImagesAndVideos