import React, { useContext } from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi'
import { server } from '../utlits/Variables'
import { Modal } from 'antd'
import UpdateWhiteList from './UpdateWhiteList'
import { ApiContextProvider } from '../contexts/ApiContext'

const WhiteListComponent = ({ whitelist, getWhtieLists }) => {

  const apiContext = useContext(ApiContextProvider)

  const [open, setOpen] = React.useState(false)

  const [image, setImage] = React.useState(null)
  return (
    <div className='flex bg-white justify-between w-full p-2 rounded-lg border'>
      <div className='flex flex-col gap-2 w-1/4'>
        {
          whitelist?.image &&
          <img onClick={() => setImage(whitelist?.image)} className='w-1/3 rounded-lg cursor-pointer' alt='test image' src={server + whitelist?.image} />
        }
        {
          whitelist?.image2 &&
          <img onClick={() => setImage(whitelist?.image2)} className='w-1/3 rounded-lg cursor-pointer' alt='test image' src={server + whitelist?.image2} />
        }

        <Modal
          centered
          visible={image}
          onOk={() => setImage(null)}
          onCancel={() => setImage(null)}
          width={650}
          closeIcon={false}
        >
          <img className='w-full rounded-lg' alt='test image' src={server + image} />
        </Modal>

      </div>
      <p className='w-1/4 text-center my-auto'>{whitelist?.user_detail?.username}</p>
      <p className='w-1/4 text-center my-auto'>{whitelist?.phone}</p>
      <div className='w-1/6 flex p-1 gap-2 text-center justify-between'>
        <span onClick={() => setOpen(true)} className='text-blue-500 cursor-pointer my-auto text-2xl'>
          <BiEdit />
        </span>
        <span onClick={() => {
          apiContext?.deleteWhtieList(whitelist?.id)
          getWhtieLists()
        }} className='text-red-500 cursor-pointer my-auto text-2xl'>
          <BiTrash />
        </span>
      </div>

      {/* update */}
      <UpdateWhiteList open={open} setOpen={setOpen} whitelistData={whitelist} getWhiteLists={getWhtieLists} />
    </div>
  )
}

export default WhiteListComponent