import React from "react";
import Navbar from "../(entry)/auth/_components/Navbar";
import AuthCheck from "./_components/AuthCheck";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthCheck>
      <Navbar />
      {children}
    </AuthCheck>
  );
};

export default layout;
