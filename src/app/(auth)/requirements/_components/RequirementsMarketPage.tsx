"use client";

import { getRequirements, TRequirements } from "@/actions/tutor";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const RequirementsMarketPage = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (user.role === "PARENT") {
      router.push("/dashboard");
      return;
    }

    const getReqs = async () => {
      toast.loading("Loading requirements", {
        id: "loading-requirements",
      });
      const data = await getRequirements(Number(user.id));
      if (data.error) {
        console.log(data.error);
        toast.error(data.error, {
          id: "loading-requirements",
        });
        return;
      }
      setRequirements(data);
      toast.success("Requirements loaded", {
        id: "loading-requirements",
      });
    };
    getReqs();
  }, []);

  const [requirements, setRequirements] = useState<TRequirements>({
    data: [],
    error: null,
  });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h1 className="text-3xl font-bold text-center">Requirements</h1>
      {requirements.data && requirements.data.length > 0 ? (
        requirements.data.map((requirement) => (
          <Link
            href={`/requirements/${requirement.id}`}
            key={requirement.id}
            className="block p-4 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow duration-200"
          >
            <h3 className="text-2xl font-semibold">{requirement.subject}</h3>
            <p className="text-gray-700">Grade: {requirement.grade}</p>
            <p className="text-gray-700">
              {requirement._count?.proposals}{" "}
              {requirement._count?.proposals === 1 ? "proposal" : "proposals"}
            </p>
            <p className="text-gray-700">
              Start Date: {requirement.startDate.toDateString()}
            </p>
            <p className="text-gray-700">Duration: {requirement.duration}</p>
            <p className="text-gray-700">Amount: {requirement.amount}</p>
          </Link>
        ))
      ) : (
        <p className="text-center text-gray-500">No requirements found.</p>
      )}
    </div>
  );
};

export default RequirementsMarketPage;
