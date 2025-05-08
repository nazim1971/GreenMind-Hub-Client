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
        className={`${roboto.className} antialiased transition-colors duration-300 max-w-[1200px] mx-auto `}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
           <Provider>
           <div className="pt-20">{children}</div>
           </Provider>
           <Toaster />
          </ThemeProvider>
          
      </body>
    </html>
  );
}