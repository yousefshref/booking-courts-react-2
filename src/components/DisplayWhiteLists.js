import { Modal } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { ApiContextProvider } from '../contexts/ApiContext'
import WhiteListComponent from './WhiteListComponent'

const DisplayWhiteLists = ({ open, setOpen }) => {

  const apiContext = useContext(ApiContextProvider)

  const [whitelists, setWhitelists] = useState([])

  const getWhtieLists = async () => {
    const res = await apiContext?.getWhtieLists()
    setWhitelists(res?.data)
  }

  useEffect(() => {
    open && getWhtieLists()
  }, [open])



  return (
    <Modal
      visible={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      centered
      width={650}
      closeIcon={false}
    >

      <div className='min-h-fit max-h-[500px] p-2 bg-zinc-200 overflow-scroll rounded-lg'>

        {
          whitelists?.map(whitelist => (
            <WhiteListComponent getWhtieLists={getWhtieLists} key={whitelist?.id} whitelist={whitelist} />
          ))
        }

      </div>

    </Modal>
  )
}

export default DisplayWhiteLists