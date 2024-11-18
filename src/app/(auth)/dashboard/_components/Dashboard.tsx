"use client";

import { useRouter } from "next/navigation";
import TutorDashboard from "./TutorDashboard";
import ParentDashboard from "./ParentDashboard";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const router = useRouter();
  if (!user) {
    router.push("/login");
  }

  if (user.role === "PARENT") {
    return <ParentDashboard />;
  } else if (user.role === "TUTOR") {
    return <TutorDashboard />;
  } else {
    return <div>ahh trying to manipulate me ahhh!!</div>;
  }
};

export default Dashboard;
