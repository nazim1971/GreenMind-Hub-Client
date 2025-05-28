import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { Provider } from "@/Providers/Provider";
import { CartProvider } from "./(publicRoute)/cart/_compoenets/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Provider>
            <CartProvider>
              <Toaster
            richColors
            //   position="top-center"
            toastOptions={{
              style: {
                // background: "#2ecc71",
                border: "none",
              },
            }}
          />
            <div className=" pt-20 ">
              {children}
            </div>
            </CartProvider>
          </Provider>
          
        </ThemeProvider>
      </body>
    </html>
  );
}
