
import PaymentAfter from '@/components/Payment';
import { validatePayment } from '@/services/Payment';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const ValidationPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { tran_id } = await searchParams;
  const res = await validatePayment(tran_id as string);

  return (
    <>
      <PaymentAfter
        response={res}
        icon={'ShieldCheck'}
        pageName="Payment Successful"
        description="Your payment is validated successfully. Take a ScreenShot before refreshing or leaving this page for further queries."
        href="/"
        buttonText="Go to Home"
      />
    </>
  );
};

export default ValidationPage;