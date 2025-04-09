"use client";
import React from "react";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "./head";
import Nav from "@/components/Navigation";
import FinanceContextProvider from "@/lib/store/finance-context";
import AuthContextProvider from "@/lib/store/auth-context";
// import Loading from "./accounting/loading";
import Loading from "./loading";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head />
      <body suppressHydrationWarning={true}>
        <AuthContextProvider>
          <FinanceContextProvider>
            <ToastContainer />
            <Nav />
            <ProtectedRoute>{children}</ProtectedRoute>
          </FinanceContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
