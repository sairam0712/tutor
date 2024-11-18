"use client";

import { getAllPendingProposals, TPendingProposals } from "@/actions/tutor";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Proposals = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const router = useRouter();
  const [proposals, setProposals] = useState<TPendingProposals>({
    data: [],
    error: null,
  });

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const getProposals = async () => {
      toast.loading("Loading proposals", {
        id: "loading-proposals",
      });
      const data = await getAllPendingProposals(Number(user.id));
      if (data.error) {
        console.log(data.error);
        toast.error(data.error, {
          id: "loading-proposals",
        });
        return;
      }
      setProposals(data);
      toast.success("Proposals loaded", {
        id: "loading-proposals",
      });
    };
    getProposals();
  }, [user.id, router]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h1 className="text-3xl font-bold text-center">Proposals</h1>
      {proposals.data && proposals.data.length > 0 ? (
        proposals.data.map((proposal) => (
          <div
            key={proposal.id}
            className={`p-4 border rounded-lg transition-shadow duration-200 ${
              proposal.status === "PENDING"
                ? "border-yellow-500 bg-yellow-100"
                : proposal.status === "REJECTED"
                ? "border-red-500 bg-red-100"
                : "border-gray-300 bg-white"
            } hover:shadow-lg`}
          >
            <p className="font-semibold">Status: {proposal.status}</p>
            <p className="text-lg">{proposal.requirement.subject}</p>
            <p className="text-gray-700">Grade: {proposal.requirement.grade}</p>
            <p className="text-gray-700">
              Start Date: {proposal.requirement.startDate.toDateString()}
            </p>
            <p className="text-gray-700">
              Duration: {proposal.requirement.duration}
            </p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No proposals found.</p>
      )}
    </div>
  );
};

export default Proposals;
