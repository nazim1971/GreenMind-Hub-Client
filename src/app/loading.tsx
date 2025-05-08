import Image from 'next/image';
import giffy from '../assets/loader.gif';

const loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Image src={giffy} width={200} height={200} alt="giffy" />
    </div>
  );
};

export default loading;