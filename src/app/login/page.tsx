
import WithSuspense from "@/Providers/LoadingProviders";
import LoginForm from "./_components/LoginForm";


type SearchParams = Promise<{ [key: string]: string | undefined }>;

const LoginPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { redirectPath } = await searchParams;

  return (
    <WithSuspense>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <LoginForm redirectPath={redirectPath} />
       
      </div>
    </WithSuspense>
  );
};

export default LoginPage;