import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
// import Navbar from "@/components/shared/Navbar";



const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      {/* <Navbar/> */}
      <main className="min-h-[calc(100vh-463px)] my-14 container mx-auto px-5 lg:px-10">{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;