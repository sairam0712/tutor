"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const router = useRouter();
  const currentPath = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link href="/">Tutions</Link>
        </div>
        <div className="space-x-4">
          <Link
            href="/dashboard"
            className={`text-white hover:underline ${
              currentPath === "/dashboard" ? "underline" : ""
            }`}
          >
            Dashboard
          </Link>
          {user.role === "TUTOR" ? (
            <>
              <Link
                href="/requirements"
                className={`text-white hover:underline ${
                  currentPath === "/requirements" ? "underline" : ""
                }`}
              >
                Requirements
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/requirements-form"
                className={`text-white hover:underline ${
                  currentPath === "/requirements-form" ? "underline" : ""
                }`}
              >
                Requirements Form
              </Link>
            </>
          )}
          <Link
            href="/tutors"
            className={`text-white hover:underline ${
              currentPath === "/tutors" ? "underline" : ""
            }`}
          >
            Tutors
          </Link>
          {/* <Link
            href="/profile"
            className={`text-white hover:underline ${
              currentPath === "/profile" ? "underline" : ""
            }`}
          >
            Profile
          </Link> */}
          <button onClick={handleLogout} className="text-white hover:underline">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
