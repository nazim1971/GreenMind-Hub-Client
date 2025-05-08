import { getMemberPayments } from '@/services/Payment'
import React from 'react'
import { TransactionDataTable } from './transactionTable';


const PaymentModule =async () => {
    const {data:payments} = await getMemberPayments();
  
    return (
    <div>
      <TransactionDataTable data={payments} />
    </div>
  )
}

export default PaymentModule
