
import RegisterForm from '@/components/Auth/RegisterForm';
import WithSuspense from '@/Providers/LoadingProviders';

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