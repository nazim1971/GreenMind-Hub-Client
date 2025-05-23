import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ReactNode } from "react";
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
        className={`${roboto.className} antialiased transition-colors duration-300 overflow-x-hidden`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
           <Provider>
           <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 w-full">{children}</div>
           </Provider>
           <Toaster />
          </ThemeProvider>
          
      </body>
    </html>
  );
}