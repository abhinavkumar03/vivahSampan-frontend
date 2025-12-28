import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VivahSampan - Wedding Planning Platform",
  description: "Your complete wedding planning solution",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-assets-path="/assets/" data-base-url="/">
      <head>
        {/* Admin Template CSS */}
        <link rel="stylesheet" href="/assets/vendor/scss/core.css" />
        <link rel="stylesheet" href="/assets/vendor/scss/theme-default.css" />
        <link rel="stylesheet" href="/assets/css/demo.css" />
        
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/assets/img/favicon/favicon.ico" />
        
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
        
        {/* Icons */}
        <link rel="stylesheet" href="/assets/vendor/fonts/boxicons.css" />
        <link rel="stylesheet" href="/assets/vendor/fonts/fontawesome.css" />
        <link rel="stylesheet" href="/assets/vendor/fonts/flag-icons.css" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
