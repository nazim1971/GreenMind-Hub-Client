
import { validatePayment } from '@/services/Payment';
import ClientValidation from './_component/ClientValidation';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const ValidationPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { tran_id } = await searchParams;
  const res = await validatePayment(tran_id as string);

  return <ClientValidation res={res} />;
};

export default ValidationPage;
