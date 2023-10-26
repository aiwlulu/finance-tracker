import { useContext, useEffect, useState } from "react";
import { authContext } from "@/lib/store/auth-context";
import { ImStatsBars } from "react-icons/im";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function Nav() {
  const { user, loading, logout } = useContext(authContext);
  const [displayName, setDisplayName] = useState(null);

  const logoutAndRedirect = () => {
    logout();
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchDisplayName = async () => {
      if (user) {
        if (user.displayName) {
          setDisplayName(user.displayName);
        } else {
          const q = query(
            collection(db, "users"),
            where("uid", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setDisplayName(doc.data().name);
          });
        }
      }
    };

    fetchDisplayName();
  }, [user]);

  return (
    <header className="container max-w-2xl px-6 py-6 mx-auto">
      <div className="flex items-center justify-between">
        {/* User information */}
        {user && !loading && (
          <div className="flex items-center gap-2">
            <small>Hi, {displayName}!</small>
          </div>
        )}

        {user && !loading && (
          <nav className="flex items-center gap-4">
            <div>
              <a href="#stats">
                <ImStatsBars className="text-2xl" />
              </a>
            </div>
            <div>
              <button onClick={logoutAndRedirect} className="btn btn-danger">
                Sign out
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Nav;
