import { Modal } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { ApiContextProvider } from '../contexts/ApiContext'
import InvoiceComponent from './InvoiceComponent'
import UpdateOrCreateInvoice from './UpdateOrCreateInvoice'

const DisplayInvoicesModal = ({ open, setOpen, court, academy, book }) => {

  const apiContext = useContext(ApiContextProvider)


  const [invoices, setInvoices] = useState([])

  const getInvoices = async () => {
    const res = await apiContext?.getInvoices('', '', '', '', '', '', '', book?.id, academy?.id, court?.id, '', '')
    setInvoices(res.data)
  }

  useEffect(() => {
    getInvoices()
  }, [court?.id, academy?.id])



  const [createInvoiceOpen, setCreateInvoiceOpen] = useState(false)

  return (
    <Modal
      open={open}
      onOk={() => setCreateInvoiceOpen(true)}
      onCancel={() => setOpen(false)}
      okText='انشاء فاتورة'
      cancelText='الغاء'
      width={650}
      centered
      closeIcon={false}
    >

      <div className='flex bg-zinc-200 max-h-[500px] min-h-fit overflow-scroll flex-col gap-3 p-4 rounded-lg'>

        {
          invoices?.length > 0 ? (
            invoices?.map((invoice, index) => (
              <InvoiceComponent getInvoices={getInvoices} key={index} invoice={invoice} />
            ))
          ) : (
            <p className='text-center text-red-600'>لا يوجد فواتير</p>
          )
        }

      </div>

      <UpdateOrCreateInvoice book={book} academy={academy} getInvoices={getInvoices} court={court} create={true} open={createInvoiceOpen} setOpen={setCreateInvoiceOpen} />

    </Modal>
  )
}

export default DisplayInvoicesModal