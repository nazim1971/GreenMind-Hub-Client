import WithSuspense from '@/Providers/LoadingProviders';
import RegisterForm from './_components/RegisterForm';

const RegisterPage = () => {
  return (
    <WithSuspense>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <RegisterForm />
      </div>
    </WithSuspense>
  );
};

export default RegisterPage;