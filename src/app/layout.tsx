import type {Metadata} from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';

export const metadata: Metadata = {
  title: 'The Pocket Chef',
  description: 'Your adorable kitchen helper for yummy ideas!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;500;700&display=swap" rel="stylesheet" />

      </head>
      <body 
        className="font-body antialiased"
        style={{
          // @ts-ignore
          "--font-nunito": "var(--font-fredoka-one)", // Using Fredoka One as primary heading as it's more distinctively "kawaii"
          "--font-quicksand": "var(--font-mplus-rounded-1c)", // Using M PLUS Rounded 1c for body
          "--font-fredoka-one": "'Fredoka One', cursive",
          "--font-mplus-rounded-1c": "'M PLUS Rounded 1c', sans-serif",
        }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

    