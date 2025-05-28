import { getMemberPayments } from '@/services/Payment'
import React from 'react'
import { TransactionDataTable } from './transactionTable';


const PaymentModule =async () => {
    const {data:payments} = await getMemberPayments();
  
    return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">
        All Payments ({payments.length})
      </h1>

      <div className="overflow-x-auto">
        <TransactionDataTable data={payments} />
      </div>
    </div>
  )
}

export default PaymentModule
