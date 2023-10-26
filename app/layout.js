"use client";
import React, { useState, useEffect, Suspense } from "react";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "./head";
import Nav from "@/components/Navigation";
import FinanceContextProvider from "@/lib/store/finance-context";
import AuthContextProvider from "@/lib/store/auth-context";
import ProtectedRoute from "@/components/ProtectedRoute";
import Loading from "./loading";

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
