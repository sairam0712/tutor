import React from "react";
import AuthCheck from "./_components/AuthCheck";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <AuthCheck>{children}</AuthCheck>;
};

export default layout;
