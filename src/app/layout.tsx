import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ReactNode } from "react";
import Footer from "@/components/shared/Footer";
import { Toaster } from "@/components/ui/sonner";
import { Provider } from "@/Providers/Provider";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GreenMind Hub",
  description: "Welcome to Nexa Portfolio",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
 

  return (
    <html
      suppressHydrationWarning
      lang="en"
      className="dark"
      style={{ colorScheme: "dark" }}
    >
      <body
        className={`${roboto.className} antialiased transition-colors duration-300 max-w-[1200px] mx-auto `}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
           <Provider>
           <Navbar  />
            <div className="pt-20">{children}</div>
            <Footer />
           </Provider>
           <Toaster />
          </ThemeProvider>
          
      </body>
    </html>
  );
}