import React, { useRef, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import UpdateOrCreateInvoice from './UpdateOrCreateInvoice'

const InvoiceComponent = ({ invoice, getInvoices }) => {
  const [editOpen, updateOpen] = useState(false)

  const invoiceRef = useRef(null);

  const handlePrint = () => {
    const invoiceElement = invoiceRef.current;
    if (invoiceElement) {
      const printWindow = window.open('', '', 'height=400,width=800');
      printWindow.document.write(`
      <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
          <title>Invoice</title>
          <style>
            .invoice_row span{
              display: none;
            }
            .invoice_row{
              padding: 10px;
              border-radius: 10px;
              border: 1px solid #ccc;
              margin-bottom: 10px;
              width:'100%';
              display:flex;
              flex-direction: column;
              justify-content: space-between;
              direction:rtl;
              height:fit-content;
            }
          </style>
          <script>
            function onTailwindLoad() {
              window.print();
              window.close();
            }
          </script>
        </head>
      <body onload="onTailwindLoad()">
      `);
      printWindow.document.write(invoiceElement.outerHTML);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
    }
  }
  return (
    <div ref={invoiceRef} id={`invoice_${invoice?.id}`} className={`invoice_row relative p-4 rounded-lg bg-white border ${invoice?.amount > 0 ? 'border-green-400' : 'border-red-400'}`}>

      <span onClick={() => updateOpen(true)} className='absolute top-2 print:hidden cursor-pointer text-blue-600 left-2'>
        <BiEdit />
      </span>

      <span onClick={handlePrint} className='absolute bottom-2 print:hidden cursor-pointer text-blue-600 left-2'>
        طباعة
      </span>
      <UpdateOrCreateInvoice create={false} invoice={invoice} getInvoices={getInvoices} open={editOpen} setOpen={updateOpen} />

      {
        invoice?.amount &&
        <div>
          <p>المبلغ: {invoice?.amount}</p>
        </div>
      }

      <div>
        <div>
          {
            invoice?.start_date &&
            <small>تاريخ بداية الفاتورة: {invoice?.start_date}</small>
          }
        </div>

        <div>
          {
            invoice?.end_date &&
            <small>تاريخ نهاية الفاتورة: {invoice?.end_date}</small>
          }
        </div>
      </div>


      {
        invoice?.name &&
        <div>
          <b>
            {invoice?.name}
          </b>
        </div>
      }

      {
        invoice?.phone &&
        <div>
          <b>
            {invoice?.phone}
          </b>
        </div>
      }

      {
        invoice?.description &&
        <div>
          <b>
            {invoice?.description}
          </b>
        </div>
      }

      <div className='flex flex-col mt-2'>
        {
          invoice?.created_at &&
          <small>تاريخ إنشاء الفاتورة: {new Date(invoice?.created_at).toLocaleString('ar-EG', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</small>
        }

        {
          invoice?.updated_at &&
          <small>تاريخ التعديل الفاتورة: {new Date(invoice?.updated_at).toLocaleString('ar-EG', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</small>
        }
      </div>

    </div>
  )
}

export default InvoiceComponent