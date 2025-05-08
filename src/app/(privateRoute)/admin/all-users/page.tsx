import { LoaderCircle } from "lucide-react";
import { Suspense } from "react";
import AllUsersModule from "./_components/AllUserModule";

const AdminAllUsersPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex size-full min-h-dvh items-center justify-center">
          <LoaderCircle className="animate-spin transition-all duration-300 ease-in-out" />
        </div>
      }
    >
      <AllUsersModule />
    </Suspense>
  );
};

export default AdminAllUsersPage;