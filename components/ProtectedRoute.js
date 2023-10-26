import { useContext, useEffect } from "react";
import { authContext } from "@/lib/store/auth-context";
import SignIn from "@/components/SignIn";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(authContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  if (!user) {
    return <SignIn />;
  }

  return children;
}
