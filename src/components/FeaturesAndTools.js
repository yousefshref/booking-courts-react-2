import React, { useContext, useEffect } from 'react'
import { Input, Button, Select } from 'antd';
import { Delete } from '@mui/icons-material';
import { ApiContextProvider } from '../contexts/ApiContext';
import { Alert } from "antd";
const FeaturesAndTools = ({ tools, court, features, setSelectedTools, setSelectedFeatures, selectedTools, selectedFeatures, getCourtTools, getCourtFeatures }) => {

  const apiContext = useContext(ApiContextProvider)

  const deleteTool = async (id) => {
    const res = await apiContext?.deleteCourtTool(id)
    getCourtTools()
  }

  const deleteFeature = async (id) => {
    const res = await apiContext?.deleteCourtFeature(id)
    getCourtFeatures()
  }

  useEffect(() => {
    if (court !== null) {
      setSelectedTools(tools)
      setSelectedFeatures(features)
    }
  }, [tools, features, court?.id])


  return (
    <div className='my-3 flex flex-col gap-2 bg-zinc-200 rounded-md p-2 w-full'>
      <div className='flex flex-col gap-1'>
        <p>الادوات</p>
        <div className='tools flex flex-col gap-2'>
          {
            selectedTools?.length === 0 || !selectedTools ? <Alert message="لايوجد ادوات" type="warning" /> :
              selectedTools?.map((tool, index) => (
                <div className='flex gap-2 bg-white flex-col p-3 rounded-md w-full' key={index}>
                  <div className='flex gap-2 justify-between sm:flex-row flex-col items-center w-full'>
                    <Input onChange={e => {
                      const updatedTools = selectedTools.map((t, i) => {
                        if (index === i) {
                          // Update the 'is_free' field of the object at index 'i'
                          return { ...t, name: e.target.value };
                        }
                        return t; // Return unchanged objects for other indices
                      });
                      setSelectedTools(updatedTools);
                    }} type='text' defaultValue={tool?.name} placeholder='اسم الاداة' className='sm:w-full' />
                    <Input onChange={(e) => {
                      const updatedTools = selectedTools.map((t, i) => {
                        if (index === i) {
                          // Update the 'is_free' field of the object at index 'i'
                          return { ...t, price: e.target.value };
                        }
                        return t; // Return unchanged objects for other indices
                      });
                      setSelectedTools(updatedTools);
                    }} defaultValue={tool?.price} type='number' placeholder='السعر' className='sm:w-1/2' />
                  </div>
                  <div className='actions flex gap-5'>
                    <span onClick={() => {
                      const exist = selectedTools.find(v => v.index === index || v.id === tool?.id);
                      if (exist) {
                        if (tool?.id) {
                          deleteTool(tool?.id);
                        } else {
                          setSelectedTools(prev => prev.filter(v => v.index !== index));
                        }
                      }
                    }} className="flex items-center justify-center h-5 w-5 text-red-500 cursor-pointer">
                      <Delete />
                    </span>
                  </div>
                </div>
              ))}
        </div>
        <Button type='primary' className='w-fit' onClick={() => {
          setSelectedTools([...selectedTools, { index: selectedTools?.length, name: 'ادة في الملعب', price: '200.00' }])
        }}>أضف اداة جديدة</Button>
      </div>


      <div className='flex flex-col gap-1'>
        <p>ميزات الملعب</p>
        <div className='tools flex flex-col gap-2'>
          {
            selectedFeatures?.length === 0 || !selectedFeatures ? <Alert message="لا يوجد ميزات" type="warning" /> :
              selectedFeatures?.map((feature, i) => (
                <div className='flex gap-2 bg-white flex-col p-3 rounded-md w-full' key={i}>
                  <div className='flex gap-2 justify-between sm:flex-row flex-col items-center w-full'>
                    <div className='flex flex-col sm:w-full w-full'>
                      <p>اسم الميزة</p>
                      {/* <Input onChange={e => setSelectedFeatures([...selectedFeatures.slice(0, i), { ...selectedFeatures[i], name: e.target.value }, ...selectedFeatures.slice(i + 1)])} type='text' defaultValue={feature?.name} placeholder='الميزة' /> */}
                      <Input onChange={e => {
                        const updatedFeatures = selectedFeatures.map((feature, index) => {
                          if (index === i) {
                            // Update the 'is_free' field of the object at index 'i'
                            return { ...feature, name: e.target.value };
                          }
                          return feature; // Return unchanged objects for other indices
                        });
                        setSelectedFeatures(updatedFeatures);
                      }} type='text' defaultValue={feature?.name} placeholder='الميزة' />
                    </div>
                    <div className='flex flex-col sm:w-full w-full'>
                      <p>هل مجانية</p>
                      <Select
                        // onChange={e => setSelectedFeatures([...selectedFeatures.slice(0, i), { ...selectedFeatures[i], is_free: e.value }, ...selectedFeatures.slice(i + 1)])}
                        onChange={e => {
                          const updatedFeatures = selectedFeatures.map((feature, index) => {
                            if (index === i) {
                              // Update the 'is_free' field of the object at index 'i'
                              return { ...feature, is_free: e };
                            }
                            return feature; // Return unchanged objects for other indices
                          });
                          setSelectedFeatures(updatedFeatures);
                        }}
                        defaultValue={feature?.is_free}
                        className='w-full'
                        options={[
                          { value: false, label: 'لا' },
                          { value: true, label: 'نعم' },
                        ]}
                      />
                    </div>
                  </div>
                  <div className='actions flex gap-5'>
                    <span onClick={() => {
                      const exist = selectedFeatures.find(v => v.index === i || v.id === feature?.id);
                      if (exist) {
                        if (feature?.id) {
                          deleteFeature(feature?.id);
                        } else {
                          setSelectedFeatures(prev => prev.filter(v => v.index !== i));
                        }
                      }
                    }} className="flex items-center justify-center h-5 w-5 text-red-500 cursor-pointer">
                      <Delete />
                    </span>
                  </div>
                </div>
              ))}
        </div>
        <Button type='primary' className='w-fit' onClick={() => {
          setSelectedFeatures([...selectedFeatures, { index: selectedFeatures?.length, name: 'مشاريب', is_free: true }])
        }}>أضف ميزة جديدة</Button>
      </div>

    </div>
  )
}

export default FeaturesAndTools
