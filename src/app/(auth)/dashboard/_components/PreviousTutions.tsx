"use client";

import { getPastTutions, TPastTutions } from "@/actions/tutor";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const PreviousTutions = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const router = useRouter();
  const [tutions, setTutions] = useState<TPastTutions>({
    data: [],
    error: null,
  });

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const getTutions = async () => {
      toast.loading("Loading tutions", {
        id: "loading-tutions",
      });
      const data = await getPastTutions(Number(user.id));
      if (data.error) {
        console.log(data.error);
        toast.error(data.error, {
          id: "loading-tutions",
        });
        return;
      }
      setTutions(data);
      toast.success("Tutions loaded", {
        id: "loading-tutions",
      });
    };
    getTutions();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Past Tutions
      </h1>
      {tutions.data && tutions.data.length > 0 ? (
        tutions.data.map((tution) => (
          <Link
            href={`/dashboard/details/${tution.requirementId}`}
            key={tution.id}
          >
            <div className="p-4 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow duration-200">
              <h2 className="text-2xl font-semibold">
                {tution.requirement.subject}
              </h2>
              <p className="text-gray-700">
                <strong>Grade:</strong> {tution.requirement.grade}
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> {tution.requirement.phone}
              </p>
              <p className="text-gray-700">
                <strong>Duration:</strong> {tution.requirement.duration}
              </p>
              <p className="text-gray-700">
                <strong>Amount:</strong> ${tution.requirement.amount}
              </p>
              <p>
                <strong>Address:</strong> {tution.requirement.address}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-center text-gray-500">No past tutions found.</p>
      )}
    </div>
  );
};

export default PreviousTutions;
