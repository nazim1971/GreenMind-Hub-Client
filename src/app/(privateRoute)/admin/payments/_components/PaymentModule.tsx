import { getAllPayments} from '@/services/Payment'
import { TransactionDataTable } from './TransactionTable';

const PaymentModule =async () => {
    const {data:payments} = await getAllPayments();
  
    return (
    <div className='mt-5'>
      <TransactionDataTable data={payments} />
    </div>
  )
}

export default PaymentModule
