"use client";
import React, { Suspense, lazy } from "react";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "./head";
import Nav from "@/components/Navigation";
import FinanceContextProvider from "@/lib/store/finance-context";
import AuthContextProvider from "@/lib/store/auth-context";
import Loading from "./loading";

const ProtectedRoute = lazy(() => import("@/components/ProtectedRoute"));

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head />
      <body suppressHydrationWarning={true}>
        <AuthContextProvider>
          <FinanceContextProvider>
            <ToastContainer />
            <Nav />
            <Suspense fallback={<Loading />}>
              <ProtectedRoute>{children}</ProtectedRoute>
            </Suspense>
          </FinanceContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
