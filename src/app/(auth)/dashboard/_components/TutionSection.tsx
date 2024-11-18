"use client";

import { getPastTuitions, TPastTuitions } from "@/actions/student";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const TutionSection = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const router = useRouter();
  const [tutions, setTutions] = useState<TPastTuitions>({
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
      const data = await getPastTuitions(Number(user.id));
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
  }, [user.id, router]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h1 className="text-3xl font-bold text-center">Tutions Previously</h1>
      {tutions.data && tutions.data.length > 0 ? (
        tutions.data.map((tution) => (
          <Link
            href={`dashboard/tution/${tution.id}-${user.id}`}
            key={tution.id}
            className="block p-4 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow duration-200"
          >
            <h3 className="text-2xl font-semibold">{tution.subject}</h3>
            <p className="text-gray-700">Grade: {tution.grade}</p>
            <p className="text-gray-700">Amount: {tution.amount}</p>
            <p className="text-gray-700">Duration: {tution.duration}</p>
            <p className="text-gray-700">
              Start Date: {tution.startDate.toISOString()}
            </p>
            {tution.proposals.length > 0 && (
              <Link
                href={`tutors/${tution.proposals[0].tutor.id}`}
                className="text-blue-600 hover:underline"
              >
                {tution.proposals[0].tutor.name}
              </Link>
            )}
            <p className="text-gray-700">
              Total Proposals: {tution._count?.proposals}
            </p>
          </Link>
        ))
      ) : (
        <p className="text-center text-gray-500">No tutions found.</p>
      )}
    </div>
  );
};

export default TutionSection;
