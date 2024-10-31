// src/app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Plataforma para gerenciamento de tarefas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 min-h-screen flex flex-col`}
      >
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl font-bold">Task Manager</h1>
        </header>
        <main className="flex-grow p-8">
          <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-md">
            {children}
          </div>
        </main>
        <footer className="bg-gray-200 text-center p-4">
          <p className="text-gray-600">Task Manager App © 2024</p>
        </footer>
      </body>
    </html>
  );
}
