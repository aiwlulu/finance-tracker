"use client";
import React, { useState, useEffect } from "react";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "./head";
import Nav from "@/components/Navigation";
import FinanceContextProvider from "@/lib/store/finance-context";
import AuthContextProvider from "@/lib/store/auth-context";
import ProtectedRoute from "@/components/ProtectedRoute";
import Loading from "./Loading";

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <html lang="en">
      <Head />
      <body suppressHydrationWarning={true}>
        <AuthContextProvider>
          <FinanceContextProvider>
            <ToastContainer />
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <Nav />
                <ProtectedRoute>{children}</ProtectedRoute>
              </>
            )}
          </FinanceContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
