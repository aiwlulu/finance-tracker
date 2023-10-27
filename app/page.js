"use client";
import { useContext, useEffect } from "react";
import { authContext } from "@/lib/store/auth-context";
import Authentication from "@/components/Authentication";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useContext(authContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/accounting");
    }
  }, [user]);

  if (!user) {
    return <Authentication />;
  }
}
